// Utilities
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    styleObjects: [],
    styleObject: null,
    currentPage: null,
  }),

  actions: {
    setCurrentPage(page) {
      this.currentPage = page;
    },
    setStyleObject(styleObject) {
      this.styleObject = styleObject;
    },
    addStyleObject(styleObject) {
      this.styleObjects.push(styleObject);
    },
    deleteStyleObject(source_id) {
      this.styleObjects = this.styleObjects.filter(
        (style) => style.source_id !== source_id
      );
    },
    isStyleObjectLoaded() {
      return this.styleObjects.length > 0 ? true : false;
    },
  },
});
