// Utilities
import { defineStore } from "pinia";
import StyleJSON from "../utils/StyleJSON.js";

export const useAppStore = defineStore("app", {
  state: () => ({
    dataSource: null,
    styleObject: null,
  }),

  actions: {
    addDataSource(geojson) {
      this.styleObject = StyleJSON.createStyleObject(geojson, "geojson");
    },
  },
});
