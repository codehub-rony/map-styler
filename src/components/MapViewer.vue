<template>
  <div>
    <v-sheet :height="height" id="map_container"> </v-sheet>
    <MapPopup
      :map="map"
      :vectorLayer="vectorLayer"
      :styleObject="styleObject"
      v-if="map && styleObject"
    />
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
          new TileLayer({
            source: new OSM(),
          }),
        ],
        target: "map_container",
        view: this.view,
        controls: [],
      });
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
          }
        });
      }
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
