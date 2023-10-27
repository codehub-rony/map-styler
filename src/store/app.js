// Utilities
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    dataSource: null,
    styleObject: null,
  }),

  actions: {
    setStyleObject(styleObject) {
      this.styleObject = styleObject;
    },
  },
});
