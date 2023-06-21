<template>
  <div>
    <v-sheet id="map_container" height="85vh"> </v-sheet>
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
import * as olExtent from "ol/extent";

// style
import "../../node_modules/ol/ol.css";

// store
import { useAppStore } from "@/store/app.js";
import { mapState } from "pinia";
import mbjson from "@/utils/mbjson";

export default {
  computed: {
    ...mapState(useAppStore, ["styleLayer", "addStyle", "dataSource"]),
  },
  data() {
    return {
      map: null,
      view: null,
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
        }));
    },
    animateZoom: function (extent) {
      console.log(extent);
      let resolution = this.view.getResolutionForExtent(extent);
      let zoom = this.view.getZoomForResolution(resolution) - 1;
      let center = olExtent.getCenter(extent);
      this.view.animate({ zoom: zoom, center: center, duration: 1000 });
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
    dataSource(data) {
      let features = new GeoJSON().readFeatures(data, {
        featureProjection: "EPSG:3857",
      });

      let layer = { file: { name: "buildings.geojson" }, features: features };
      let style = mbjson.create_style_object(layer);

      this.addStyle(style);

      this.vectorLayer.getSource().addFeatures(features);

      this.animateZoom(this.vectorLayer.getSource().getExtent());
    },
  },
};
</script>
<style>
#map_container {
  height: 100%;
}
</style>
