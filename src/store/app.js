// Utilities
import { defineStore } from "pinia";
import StyleJSON from "../utils/StyleJSON.js";

export const useAppStore = defineStore("app", {
  state: () => ({
    selectedLayer: null,
    dataSource: null,
    styleObject: null,
  }),

  actions: {
    selectLayer(layer) {
      this.selectedLayer = layer;
    },
    addDataSource(geojson) {
      this.styleObject = StyleJSON.createStyleObject(geojson, "geojson");
    },
  },
});
