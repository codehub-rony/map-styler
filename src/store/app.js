// Utilities
import { defineStore } from "pinia";
import _ from "lodash";

export const useAppStore = defineStore("app", {
  state: () => ({
    styleObjects: [],
    styleObject: null,
    currentProject: null,
    originalState: [],
  }),

  actions: {
    setCurrentProject(project) {
      this.currentProject = project;
    },
    setOriginalState() {
      this.originalState = [];

      if (this.styleObjects) {
        this.styleObjects.forEach((styleobject) => {
          this.originalState.push(_.cloneDeep(styleobject));
        });
      }
    },
    hasUnsavedChanges() {
      return this.originalState.some((original_styleObject) => {
        let styleObject = this.styleObjects.find(
          (x) => x.id === original_styleObject.id
        );

        return !_.isEqual(original_styleObject, styleObject);
      });
    },
    async clearProject() {
      this.currentProject = null;
      this.styleObjects = [];
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
