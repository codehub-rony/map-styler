// Utilities
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    styleObject: null,
  }),

  actions: {
    setStyleObject(styleObject) {
      this.styleObject = styleObject;
    },
  },
});
