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
    updatePaintAttribute(update) {
      this.selectedLayer.paint[update.attribute] = update.value;
    },
  },
});
