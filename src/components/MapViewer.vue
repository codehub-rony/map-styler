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
import { Point, LineString, Polygon } from "ol/geom.js";

import { applyStyle } from "ol-mapbox-style";

// style
import "../../node_modules/ol/ol.css";

export default {
  props: {
    styles: { Array },
  },
  data() {
    return {
      map: null,
      featureLayer: [],
      newLayer: null,
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

    let dragAndDropInteraction = new DragAndDrop({
      formatConstructors: [GeoJSON],
    });

    dragAndDropInteraction.on("addfeatures", (event) => {
      console.log(
        // event.features[0].getGeometry().getProperties(),
        // event.features[0].getGeometryName()
        Object.keys(event.features[0].getProperties())
      );

      let geometry_type;
      let feature_geom = event.features[0].getGeometry();

      if (feature_geom instanceof Point) {
        geometry_type = "Point";
      } else if (feature_geom instanceof LineString) {
        geometry_type = "Line";
      } else if (feature_geom instanceof Polygon) {
        geometry_type = "Polygon";
      }

      this.featureLayer = {
        name: event.file.name.split(".")[0],
        geometry_type: geometry_type,
        source: event.file.name.split(".")[1],
        feature_attributes: Object.keys(event.features[0].getProperties()),
        features: event.features,
      };

      this.$emit("update-featureLayer", this.featureLayer);
      const vectorSource = new VectorSource({
        features: event.features,
      });

      this.newLayer = new VectorLayer({
        source: vectorSource,
      });
      this.map.addLayer(this.newLayer);

      // applyStyle(this.newLayer, "../../demo_data/buildings.json");
      // applyStyle(this.newLayer, "../../demo_data/states.json");
      this.map.getView().fit(vectorSource.getExtent());
    });

    this.map.addInteraction(dragAndDropInteraction);

    this.map.on("click", function (evt) {
      console.log(evt.coordinate, evt.map.getView().getZoom());
    });
  },
  watch: {
    styles: {
      handler(newVal) {
        applyStyle(this.newLayer, newVal);
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
