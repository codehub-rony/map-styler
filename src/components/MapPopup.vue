<template>
  <v-sheet
    id="popup"
    class="container-map-popup d-flex flex-column"
    elevation="1"
    rounded="0"
  >
    <div class="d-flex justify-space-between pa-4 pr-2">
      <span class="text-h6 font-weight-light">Feature properties</span>
      <v-btn
        icon
        @click="closePopup"
        class="mb-1"
        variant="text"
        size="x-small"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
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
import Overlay from "ol/Overlay.js";
import { Fill, Stroke, Style } from "ol/style.js";
import { Vector as VectorLayer } from "ol/layer.js";
import VectorTileLayer from "ol/layer/VectorTile.js";

export default {
  props: {
    map: Object,
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
      properties: [],
      selection: {},
      selectionLayers: {},
    };
  },
  mounted() {
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
    selectFeature(event) {
      let found = false;

      this.selection = {};
      this.setProperties({}); // clear

      this.map.forEachFeatureAtPixel(event.pixel, (feature, layer) => {
        if (!layer || !layer.getSource) return;

        const layerId = layer.ol_uid; // or use a custom `layer.id`
        const fid = feature.getId();

        if (!fid) return;

        if (!this.selection[layerId]) this.selection[layerId] = {};
        this.selection[layerId][fid] = feature;

        // popup info (first match only)
        if (!found) {
          this.setProperties(feature.getProperties());
          this.popupOverlay.setPosition(event.coordinate);
          found = true;
        }

        // setup selection layer if missing
        if (!this.selectionLayers[layerId]) {
          const Constructor =
            layer instanceof VectorTileLayer ? VectorTileLayer : VectorLayer;

          const selectionLayer = new Constructor({
            map: this.map,
            source: layer.getSource(),
            style: (feat) => {
              return this.selection[layerId] &&
                this.selection[layerId][feat.getId()]
                ? this.selectStyle
                : null;
            },
          });

          this.selectionLayers[layerId] = selectionLayer;
        } else {
          this.selectionLayers[layerId].changed();
        }

        return true;
      });

      if (!found) this.closePopup();
    },
    closePopup: function () {
      this.popupOverlay.setPosition(undefined);
      this.selection = {};
      for (const layerId in this.selectionLayers) {
        this.selectionLayers[layerId].changed();
      }
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
