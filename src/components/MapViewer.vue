<template>
  <v-sheet id="map_container" height="90vh"> </v-sheet>
</template>

<script>
import Map from "ol/Map.js";
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";
import "../../node_modules/ol/ol.css";

export default {
  data() {
    return {
      map: null,
    };
  },
  mounted() {
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
    this.map.on("click", function (evt) {
      console.log(evt.coordinate, evt.map.getView().getZoom());
    });
  },
};
</script>
<style>
#map_container {
  height: 100%;
}
</style>
