// Utilities
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    styleObjects: [],
    styleObject: null,
  }),

  actions: {
    setStyleObject(styleObject) {
      this.styleObject = styleObject;
    },
    addStyleObject(styleObject) {
      this.styleObjects.push(styleObject);
    },
    isStyleObjectLoaded() {
      return this.styleObjects.length > 0 ? true : false;
    },
  },
});
