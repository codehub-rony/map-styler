<template>
  <div>
    <v-sheet :height="height" id="map_container"> </v-sheet>
  </div>
</template>

<script>
import Map from "ol/Map.js";
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";
import { GeoJSON } from "ol/format.js";
import { Vector as VectorLayer } from "ol/layer.js";
import { Vector as VectorSource } from "ol/source.js";
import { applyStyle } from "ol-mapbox-style";
import * as olExtent from "ol/extent";

// style
import "../../node_modules/ol/ol.css";

// store
import { useAppStore } from "@/store/app.js";
import { mapState } from "pinia";

export default {
  props: {
    geodata: Object,
  },
  computed: {
    ...mapState(useAppStore, ["styleObject"]),
  },
  data() {
    return {
      map: null,
      view: null,
      vectorLayer: null,
      dragAndDropInteraction: null,
      height: null,
    };
  },
  mounted() {
    this.setHeight();
    console.log();

    this.initMap();
    this.vectorLayer = new VectorLayer({
      source: new VectorSource(),
    });
    this.map.addLayer(this.vectorLayer);

    this.map.on("click", function (evt) {
      console.log(evt.coordinate, evt.map.getView().getZoom());
    });
  },
  methods: {
    initMap: function () {
      (this.view = new View({
        center: [595074, 6829276],
        zoom: 7,
      })),
        (this.map = new Map({
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
          ],
          target: "map_container",
          view: this.view,
          controls: [],
        }));
    },
    animateZoom: function (extent) {
      let resolution = this.view.getResolutionForExtent(extent);
      let zoom = this.view.getZoomForResolution(resolution) - 1;
      let center = olExtent.getCenter(extent);
      this.view.animate({ zoom: zoom, center: center, duration: 1000 });
    },
    loadData: function (geojson) {
      let features = new GeoJSON().readFeatures(geojson, {
        featureProjection: "EPSG:3857",
      });
      this.addFeaturesToMap(features);
    },
    addFeaturesToMap: function (features) {
      this.vectorLayer.getSource().addFeatures(features);
      this.animateZoom(this.vectorLayer.getSource().getExtent());
    },
    setHeight: function () {
      this.height =
        window.innerHeight < 950 ? window.innerHeight * 0.5 : "85vh";
      console.log(this.height);
    },
  },
  watch: {
    styleObject: {
      handler() {
        applyStyle(this.vectorLayer, this.styleObject.getStyleAsJSON());
      },
      deep: true,
    },
    geodata: {
      handler(data) {
        if (data.type === "geojson") {
          let features = new GeoJSON().readFeatures(data.json, {
            featureProjection: "EPSG:3857",
          });
          this.addFeaturesToMap(features);
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
