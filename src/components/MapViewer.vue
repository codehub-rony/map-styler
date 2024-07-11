<template>
  <div>
    <v-sheet :height="height" id="map_container"> </v-sheet>
    <!-- <MapPopup
      :map="map"
      :vectorLayer="vectorLayer"
      :styleObject="styleObject"
      v-if="map && styleObject"
    /> -->
  </div>
</template>

<script>
import Map from "ol/Map.js";
import View from "ol/View.js";
import { unByKey } from "ol/Observable.js";
import * as olExtent from "ol/extent";

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
import { mapState, mapActions } from "pinia";

export default {
  components: {
    MapPopup,
  },
  props: {
    geodataSource: Object,
  },
  computed: {
    ...mapState(useAppStore, ["styleObjects"]),
  },
  data() {
    return {
      feature_attributes: [],

      map: null,
      view: null,
      height: null,
      vectorLayer: null,
    };
  },

  mounted() {
    this.setHeight();
    this.initMap();

    // Redirect to landingpage on page reload
    if (this.isStyleObjectLoaded()) {
      this.initVectorLayers();
    } else {
      this.$router.push("/");
    }

    this.map.on("click", (evt) => {
      console.log(evt.coordinate, evt.map.getView().getZoom());
    });
  },
  methods: {
    ...mapActions(useAppStore, ["isStyleObjectLoaded"]),
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
    createVectorLayer: function (styleObject) {
      const source = new OGCVectorTile({
        url: styleObject.tilejson_url,
        format: new MVT(),
      });
      let layer = new VectorTileLayer({
        source: source,
      });

      layer.set("source_id", styleObject.source_id);

      this.map.addLayer(layer);

      this.applyStyle(
        layer,
        styleObject.getStyleAsJSON(),
        styleObject.source_id
      );

      const key = source.on("change", () => {
        if (source.getState() === "ready") {
          const extent = source.getTileGrid().getExtent();
          this.zoomToExtent(extent);
          unByKey(key);

          // setTimeout(() => {
          //   this.feature_attributes = Object.keys(
          //     this.vectorLayer
          //       .getSource()
          //       .getFeaturesInExtent(extent)[0]
          //       .getProperties()
          //   );
          // }, 6000);
        }
      });
    },
    initVectorLayers: function () {
      this.styleObjects.forEach((styleObject) => {
        if (styleObject.source_type === "geojson") {
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

        if (styleObject.source_type === "ogc_vector_tile") {
          this.createVectorLayer(styleObject);
        }
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
      stylefunction(vectorlayer, stylejson, source_id);
    },
  },
  watch: {
    styleObjects: {
      handler() {
        const layers = [...this.map.getLayers().getArray()];
        if (
          this.styleObjects.length >
          this.map.getLayers().getArray().length - 1
        ) {
          let test = layers.map((layer) => layer.get("source_id"));

          let mest = this.styleObjects.filter(
            (x) => !test.includes(x.source_id)
          );
          this.createVectorLayer(mest[0]);
        } else {
          this.styleObjects.forEach((styleObject) => {
            let layer_to_Style = layers.find(
              (layer) => layer.get("source_id") === styleObject.source_id
            );

            this.applyStyle(
              layer_to_Style,
              styleObject.getStyleAsJSON(),
              styleObject.source_id
            );
          });
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
