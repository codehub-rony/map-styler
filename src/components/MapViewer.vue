<template>
  <div>
    <v-sheet id="map_container" height="90vh"> </v-sheet>
  </div>
</template>

<script>
import Map from "ol/Map.js";
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";
import DragAndDrop from "ol/interaction/DragAndDrop.js";
import { GeoJSON } from "ol/format.js";
import { Vector as VectorLayer } from "ol/layer.js";
import { Vector as VectorSource } from "ol/source.js";

import { applyStyle } from "ol-mapbox-style";

// style
import "../../node_modules/ol/ol.css";

// store
import { useAppStore } from "@/store/app.js";
import { mapState } from "pinia";
import mbjson from "@/utils/mbjson";

export default {
  computed: {
    ...mapState(useAppStore, ["styleLayer", "addStyle"]),
  },
  data() {
    return {
      map: null,
      vectorLayer: null,
      dragAndDropInteraction: null,
    };
  },
  mounted() {
    this.initMap();
    this.initDragAndDrop();

    this.dragAndDropInteraction.on("addfeatures", (event) => {
      let style = mbjson.create_style_object(event);

      this.addStyle(style);

      this.vectorLayer.getSource().addFeatures(event.features);

      this.map.getView().fit(this.vectorLayer.getSource().getExtent());
    });

    this.map.on("click", function (evt) {
      console.log(evt.coordinate, evt.map.getView().getZoom());
    });
  },
  methods: {
    initMap: function () {
      this.map = new Map({
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        target: "map_container",
        view: new View({
          center: [595074, 6829276],
          zoom: 7,
        }),
      });
    },
    initDragAndDrop: function () {
      this.vectorLayer = new VectorLayer({
        source: new VectorSource(),
      });
      this.map.addLayer(this.vectorLayer);
      this.dragAndDropInteraction = new DragAndDrop({
        formatConstructors: [GeoJSON],
      });
      this.map.addInteraction(this.dragAndDropInteraction);
    },
  },
  watch: {
    styleLayer: {
      handler(styleObject) {
        applyStyle(this.vectorLayer, mbjson.create_styleJSON(styleObject));
      },
      deep: true,
    },
  },
};
</script>
<style>
#map_container {
  height: 100%;
}
</style>