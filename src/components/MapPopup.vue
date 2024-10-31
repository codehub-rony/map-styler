<template>
  <v-sheet
    id="popup"
    class="container-map-popup d-flex flex-column"
    elevation="1"
    rounded="0"
  >
    <div class="d-flex justify-space-between pa-4 pr-2">
      <span class="text-h6 font-weight-light">Feature properties</span>
      <DeleteButton @click="closePopup" class="mb-1" />
    </div>
    <div class="map-popup-content">
      <div
        v-for="(value, key) in properties"
        class="d-flex flex-column pl-4 pr-4 mb-2"
      >
        <span class="text-subtitle-2">{{ key }}: </span
        ><span class="text-body-2">{{ value ? value : "undefined" }}</span>
      </div>
    </div>
  </v-sheet>
</template>

<script>
import DeleteButton from "./DeleteButton.vue";
import Overlay from "ol/Overlay.js";
import { Fill, Stroke, Style } from "ol/style.js";
import { Vector as VectorLayer } from "ol/layer.js";
import VectorTileLayer from "ol/layer/VectorTile.js";

import {
  GeojsonDataSource,
  OGCVectorTileDataSource,
} from "@/utils/datasources/DataSourceTypes";

export default {
  components: {
    DeleteButton,
  },
  props: {
    map: Object,
    vectorLayer: Object,
    styleObject: Object,
  },
  data() {
    return {
      popupOverlay: null,
      selectStyle: new Style({
        fill: new Fill({
          color: "#eeeeee",
        }),
        stroke: new Stroke({
          color: "rgba(218, 22, 22, 0.7)",
          width: 3,
          lineDash: [2, 5],
          lineDashOffset: 3,
        }),
      }),
      selection: {},
      selectionLayer: null,
      properties: [],
    };
  },
  mounted() {
    // const SOURCE_TYPES = {
    //   OGC_VECTOR_TILE: "ogc_vector_tile",
    //   GEOJSON: "geojson",
    // };

    let styleFunction = (feature) => {
      if (feature.getId() in this.selection) {
        return this.selectStyle;
      }
    };

    // if (this.styleObject.source_type === SOURCE_TYPES.OGC_VECTOR_TILE) {
    if (this.styleObject.source_type instanceof OGCVectorTileDataSource) {
      this.selectionLayer = new VectorTileLayer({
        map: this.map,
        source: this.vectorLayer.getSource(),
        style: styleFunction,
      });
      // } else if (this.styleObject.source_type === SOURCE_TYPES.GEOJSON) {
    } else if (this.styleObject.source_type instanceof GeojsonDataSource) {
      this.selectionLayer = new VectorLayer({
        map: this.map,
        source: this.vectorLayer.getSource(),
        style: styleFunction,
      });
    } else {
      throw Error(
        `SelectInteraction does not support ${source_type} data source`
      );
    }

    const container = document.getElementById("popup");
    this.popupOverlay = new Overlay({
      element: container,
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    });

    this.map.addOverlay(this.popupOverlay);

    this.map.on("click", (event) => {
      this.selectFeature(event);
    });

    this.map.on("pointermove", function (event) {
      var hit = this.forEachFeatureAtPixel(
        event.pixel,
        function (feature, layer) {
          return true;
        }
      );
      if (hit) {
        this.getTargetElement().style.cursor = "pointer";
      } else {
        this.getTargetElement().style.cursor = "";
      }
    });
  },
  methods: {
    setProperties: function (properties) {
      const keysToFilter = ["geometry"];
      this.properties = Object.fromEntries(
        Object.entries(properties).filter(
          ([key, value]) => !keysToFilter.includes(key)
        )
      );
    },
    selectFeature: function (event) {
      this.vectorLayer.getFeatures(event.pixel).then((features) => {
        this.selection = {};
        if (!features.length) {
          this.closePopup();

          return;
        }

        const feature = features[0];

        if (!feature) {
          this.closePopup();
          return;
        }
        this.setProperties(feature.getProperties());

        this.popupOverlay.setPosition(event.coordinate);

        const fid = feature.getId();

        this.selection[fid] = feature;
        this.selectionLayer.changed();
      });
    },
    closePopup: function () {
      this.popupOverlay.setPosition(undefined);
      this.selection = {};
      this.selectionLayer.changed();

      return false;
    },
  },
};
</script>

<style>
.container-map-popup {
  position: absolute;
  left: -50px;
  min-width: 280px;
  bottom: 12px;
}
.container-map-popup:after,
.container-map-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.container-map-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.container-map-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.map-popup-content {
  max-height: 300px;
  overflow-y: scroll;
}
</style>
