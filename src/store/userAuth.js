// Utilities
import { defineStore } from "pinia";

export const useAppStore = defineStore("userAuth", {
  state: () => ({
    user_name: null,
    token: null,
  }),

  actions: {
    setUser(user) {
      this.user = user;
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
