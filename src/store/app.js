// Utilities
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    selectedLayer: null,
    styleLayer: null,
  }),

  actions: {
    selectLayer(layer) {
      this.selectedLayer = layer;
    },
    deselectLayer() {
      this.selectedLayer = null;
    },
    addStyle(style) {
      this.styleLayer = style;
    },
    updatelayer(updated_layer) {
      this.styleLayer.layers.forEach((layer) => {
        if (layer.id == updated_layer.layer_id) {
          layer.paint = updated_layer.paint;
        }
      });
    },
  },
});
