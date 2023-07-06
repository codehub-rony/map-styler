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
      console.log("ihahah");
      let test = StyleJSON.createStyleObject(geojson, "geojson");
      console.log(test.getStyleAsJSON());

      this.styleObject = StyleJSON.createStyleObject(geojson, "geojson");
    },
  },
});
