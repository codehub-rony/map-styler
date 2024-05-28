<template>
  <div>
    <v-sheet :height="height" id="map_container"> </v-sheet>
    <MapPopup
      :map="map"
      :vectorLayer="vectorLayer"
      :styleObject="styleObject"
      v-if="map && styleObject"
    />
    <div class="d-flex flex-row">
      <v-btn @click="autoStyle">autostyle</v-btn>
      <v-select
        label="attribute"
        :items="feature_attributes"
        v-model="selectedAttribute"
      ></v-select>
      <v-select
        label="attribute"
        :items="Object.keys(brewercolors)"
        v-model="colorscheme"
        max-height="34"
      ></v-select>
      <v-slider
        v-model="opacity"
        :max="100"
        :step="1"
        class="ma-4"
        label="Opacity"
        hide-details
      ></v-slider>
      <v-slider
        v-model="classes"
        max="9"
        show-ticks
        :step="1"
        class="ma-4"
        label="aantal klassen"
        hide-details
      ></v-slider>
      <v-checkbox label="Invert colors" v-model="invert"></v-checkbox>
    </div>
  </div>
</template>

<script>
import Map from "ol/Map.js";
import View from "ol/View.js";
import { unByKey } from "ol/Observable.js";
import * as olExtent from "ol/extent";
import { equalIntervalBreaks, ckmeans } from "simple-statistics";

// Components
import MapPopup from "@/components/MapPopup.vue";

// basemap
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import TileJSON from "ol/source/TileJSON";

// Styling
import { stylefunction } from "ol-mapbox-style";

// OGC Tile layer
import VectorTileLayer from "ol/layer/VectorTile.js";
import OGCVectorTile from "ol/source/OGCVectorTile.js";
import { GeoJSON, MVT } from "ol/format.js";

// Goejson
import { Vector as VectorLayer } from "ol/layer.js";
import { Vector as VectorSource } from "ol/source.js";

import "../../node_modules/ol/ol.css";

// store
import { useAppStore } from "@/store/app.js";
import { mapState } from "pinia";

export default {
  components: {
    MapPopup,
  },
  props: {
    geodataSource: Object,
  },
  computed: {
    ...mapState(useAppStore, ["styleObject", "dataSource"]),
  },
  data() {
    return {
      color: "#ff00ff",
      feature_attributes: [],
      opacity: 70,
      classes: 6,
      selectedAttribute: null,
      invert: null,
      map: null,
      view: null,
      height: null,
      vectorLayer: null,
      colorscheme: "green",
      brewercolors: {
        blue: [
          { r: 255, g: 247, b: 251 },
          { r: 236, g: 231, b: 242 },
          { r: 208, g: 209, b: 230 },
          { r: 166, g: 189, b: 219 },
          { r: 116, g: 169, b: 207 },
          { r: 54, g: 144, b: 192 },
          { r: 5, g: 112, b: 176 },
          { r: 4, g: 90, b: 141 },
          { r: 2, g: 56, b: 88 },
        ],
        green: {
          3: [
            { r: 229, g: 245, b: 224 },
            { r: 161, g: 217, b: 155 },
            { r: 49, g: 163, b: 84 },
          ],
          4: [
            { r: 237, g: 248, b: 233 },
            { r: 186, g: 228, b: 179 },
            { r: 116, g: 196, b: 118 },
            { r: 35, g: 139, b: 69 },
          ],
          5: [
            { r: 237, g: 248, b: 233 },
            { r: 186, g: 228, b: 179 },
            { r: 116, g: 196, b: 118 },
            { r: 49, g: 163, b: 84 },
            { r: 0, g: 109, b: 44 },
          ],
          6: [
            { r: 237, g: 248, b: 233 },
            { r: 199, g: 233, b: 192 },
            { r: 161, g: 217, b: 155 },
            { r: 116, g: 196, b: 118 },
            { r: 49, g: 163, b: 84 },
            { r: 0, g: 109, b: 44 },
          ],
          7: [
            { r: 237, g: 248, b: 233 },
            { r: 199, g: 233, b: 192 },
            { r: 161, g: 217, b: 155 },
            { r: 116, g: 196, b: 118 },
            { r: 65, g: 171, b: 93 },
            { r: 35, g: 139, b: 69 },
            { r: 0, g: 90, b: 50 },
          ],
          8: [
            { r: 247, g: 252, b: 245 },
            { r: 229, g: 245, b: 224 },
            { r: 199, g: 233, b: 192 },
            { r: 161, g: 217, b: 155 },
            { r: 116, g: 196, b: 118 },
            { r: 65, g: 171, b: 93 },
            { r: 35, g: 139, b: 69 },
            { r: 0, g: 90, b: 50 },
          ],
          9: [
            { r: 247, g: 252, b: 245 },
            { r: 229, g: 245, b: 224 },
            { r: 199, g: 233, b: 192 },
            { r: 161, g: 217, b: 155 },
            { r: 116, g: 196, b: 118 },
            { r: 65, g: 171, b: 93 },
            { r: 35, g: 139, b: 69 },
            { r: 0, g: 109, b: 44 },
            { r: 0, g: 68, b: 27 },
          ],
        },

        orange: [
          { r: 255, g: 255, b: 204 },
          { r: 255, g: 237, b: 160 },
          { r: 254, g: 217, b: 118 },
          { r: 254, g: 178, b: 76 },
          { r: 253, g: 141, b: 60 },
          { r: 252, g: 78, b: 42 },
          { r: 227, g: 26, b: 28 },
          { r: 189, g: 0, b: 38 },
          { r: 128, g: 0, b: 38 },
        ],
        diverging: [
          { r: 178, g: 24, b: 43 },
          { r: 214, g: 96, b: 77 },
          { r: 244, g: 165, b: 130 },
          { r: 253, g: 219, b: 199 },
          { r: 247, g: 247, b: 247 },
          { r: 209, g: 229, b: 240 },
          { r: 146, g: 197, b: 222 },
          { r: 67, g: 147, b: 195 },
          { r: 33, g: 102, b: 172 },
        ],
      },
    };
  },

  mounted() {
    this.setHeight();
    this.initMap();

    // Redirect to landingpage on page reload
    if (this.styleObject) {
      this.createVectorLayer();
      this.applyStyle(
        this.vectorLayer,
        this.styleObject.getStyleAsJSON(),
        this.styleObject.source_id
      );
    } else {
      this.$router.push("/");
    }

    this.map.on("click", (evt) => {
      console.log(evt.coordinate, evt.map.getView().getZoom());
    });
  },
  methods: {
    initMap: function () {
      this.view = new View({
        center: [595074, 6829276],

        zoom: 6,
      });
      this.map = new Map({
        layers: [
          // new TileLayer({
          //   source: new OSM(),
          // }),
        ],
        target: "map_container",
        view: this.view,
        controls: [],
      });
      let maptiler_key = import.meta.env.VITE_MAPTILER_KEY;
      let background = new TileLayer({
        source: new TileJSON({
          url: `https://api.maptiler.com/maps/dataviz/tiles.json?key=${maptiler_key}`,
          tileSize: 512,
          crossOrigin: "anonymous",
        }),
      });

      this.map.addLayer(background);
    },
    createVectorLayer: function () {
      if (this.styleObject.source_type === "geojson") {
        this.vectorLayer = new VectorLayer({
          source: new VectorSource(),
        });
        let features = new GeoJSON().readFeatures(this.styleObject.geojson, {
          featureProjection: "EPSG:3857",
        });

        // Setting id for SelectionInteraction
        features.forEach((feature, i) => {
          feature.setId(i);
        });

        this.vectorLayer.getSource().addFeatures(features);
        this.map.addLayer(this.vectorLayer);
        this.zoomToExtent(this.vectorLayer.getSource().getExtent());
      }

      if (this.styleObject.source_type === "ogc_vector_tile") {
        const source = new OGCVectorTile({
          url: this.styleObject.tilejson_url,
          format: new MVT(),
        });
        this.vectorLayer = new VectorTileLayer({
          source: source,
        });

        this.map.addLayer(this.vectorLayer);
        const key = source.on("change", () => {
          if (source.getState() === "ready") {
            const extent = source.getTileGrid().getExtent();
            this.zoomToExtent(extent);
            unByKey(key);

            setTimeout(() => {
              this.feature_attributes = Object.keys(
                this.vectorLayer
                  .getSource()
                  .getFeaturesInExtent(extent)[0]
                  .getProperties()
              );
            }, 6000);
          }
        });
      }
    },
    autoStyle: function () {
      let extent = this.vectorLayer.getSource().getTileGrid().getExtent();
      let attribute = this.selectedAttribute;
      let test = this.vectorLayer
        .getSource()
        .getFeaturesInExtent(extent)
        .map((feature) => feature.get(attribute));

      this.feature_attributes = Object.keys(
        this.vectorLayer
          .getSource()
          .getFeaturesInExtent(extent)[0]
          .getProperties()
      );

      let feature_properties = test.filter((x) => x >= 0);

      this.styleObject.layers = [];

      let nr_bins = this.classes;
      let bins = ckmeans(feature_properties, nr_bins);

      let breaks = [];
      bins.forEach((bin, i) => {
        breaks.push(Math.max(...bin));
      });

      let colors;

      fetch(
        `https://www.thecolorapi.com/scheme?hex=${this.color.replace(
          "#",
          ""
        )}&mode=monochrome&count=${nr_bins + 1}`
      )
        .then((res) => res.json())
        .then((data) => {
          colors = data.colors.reverse().map((c) => c.rgb);
          breaks.forEach((value, i) => {
            let layername;
            if (i === 0) {
              layername = `${attribute} 0 - ${value}`;
            } else {
              layername = `${attribute} ${breaks[i - 1]} - ${value}`;
            }

            let layer = this.styleObject.createLayer(layername);

            let filter = layer.createFilter();
            filter.deleteCondition(0);

            if (i === 0) {
              filter.createCondition(">=", attribute, 0);
            } else {
              filter.createCondition(
                ">=",
                attribute,
                Math.round(breaks[i - 1])
              );
            }
            filter.createCondition("<", attribute, Math.round(value));
            // console.log(filter);
            layer.setFilter(filter);
            // console.log("yayaya", colors[i], i);
            // layer.attributes[0].value.r = colors[i].r;
            // layer.attributes[0].value.g = colors[i].g;
            // layer.attributes[0].value.b = colors[i].b;

            let selected_colors = this.invert
              ? this.brewercolors[this.colorscheme][this.classes].reverse()
              : this.brewercolors[this.colorscheme][this.classes];
            layer.attributes[0].value.r = selected_colors[i].r;
            layer.attributes[0].value.g = selected_colors[i].g;
            layer.attributes[0].value.b = selected_colors[i].b;
            layer.attributes[0].value.a = this.opacity / 100;

            // console.log(layer.attributes);
            this.styleObject.addLayer(layer);
          });
        });
    },
    zoomToExtent: function (extent) {
      let resolution = this.view.getResolutionForExtent(extent);
      let zoom = this.view.getZoomForResolution(resolution) - 0.3;
      let center = olExtent.getCenter(extent);
      this.view.animate({ zoom: zoom, center: center, duration: 1000 });
    },

    setHeight: function () {
      this.height =
        window.innerHeight < 950 ? window.innerHeight * 0.8 : "85vh";
    },
    applyStyle: function (vectorlayer, stylejson, source_id) {
      stylefunction(
        this.vectorLayer,
        this.styleObject.getStyleAsJSON(),
        this.styleObject.source_id
      );
    },
  },
  watch: {
    styleObject: {
      handler() {
        if (this.vectorLayer) {
          this.applyStyle(
            this.vectorLayer,
            this.styleObject.getStyleAsJSON(),
            this.styleObject.source_id
          );
        }
      },
      deep: true,
    },
  },
};
</script>
<style>
#map_container {
  height: 85vh;
}
</style>
