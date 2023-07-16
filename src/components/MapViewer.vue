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

import { applyStyle } from "ol-mapbox-style";
import * as olExtent from "ol/extent";

// style
import "../../node_modules/ol/ol.css";

// store
import { useAppStore } from "@/store/app.js";
import { mapState } from "pinia";

// utils
import mapUtils from "../utils/mapUtils.js";

export default {
  props: {
    geodataSource: Object,
  },
  computed: {
    ...mapState(useAppStore, ["styleObject"]),
  },
  data() {
    return {
      map: null,
      view: null,
      layerObject: null,
      height: null,
    };
  },
  mounted() {
    this.setHeight();

    this.initMap();

    // testSource.on("tileloadend", function (evt) {
    //   console.log(evt.tile.getFeatures()[0].getType());
    // });

    this.map.on("click", (evt) => {
      // console.log(evt.coordinate, evt.map.getView().getZoom());
    });
  },
  methods: {
    initMap: function () {
      this.view = new View({
        center: [595074, 6829276],
        zoom: 10,
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

      let map = new Map({
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        target: "map_container",
        view: new View({
          center: [595074, 6829276],
          zoom: 10,
        }),
        controls: [],
      });
    },
    zoomToFeatures: function (extent) {
      let resolution = this.view.getResolutionForExtent(extent);
      let zoom = this.view.getZoomForResolution(resolution) - 0.3;
      let center = olExtent.getCenter(extent);
      this.view.animate({ zoom: zoom, center: center, duration: 1000 });
    },

    setHeight: function () {
      this.height =
        window.innerHeight < 950 ? window.innerHeight * 0.5 : "85vh";
    },
  },
  watch: {
    styleObject: {
      handler() {
        // applyStyle(this.vectorLayer, this.styleObject.getStyleAsJSON());
      },
      deep: true,
    },

    geodataSource: {
      handler(styleObject) {
        this.layerObject = mapUtils.createVectorLayer(styleObject);
        console.log(this.layerObject.geometry_type);
        styleObject.createDefaultLayers(this.layerObject.geometry_type);

        let extent = this.layerObject.getExtent();

        if (extent) {
          this.zoomToFeatures(extent);
        }

        if (Object.values(styleObject.sources)[0].type === "vector") {
          let layer = this.layerObject.getVectorLayer();

          layer.getSource().on("tileloadend", function (evt) {
            console.log(evt.tile.getFeatures()[0].getType());
          });

          this.map.addLayer(layer);
          console.log(layer.getExtent());
        } else {
          this.map.addLayer(this.layerObject.getVectorLayer());
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
