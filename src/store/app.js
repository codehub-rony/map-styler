// Utilities
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    selectedStyleAttribute: null,
  }),

  actions: {
    selectAttribute(attribute) {
      this.selectedStyleAttribute = attribute;
    },
    deselectAttribute() {
      this.selectedStyleAttribute = null;
    },
  },
});
