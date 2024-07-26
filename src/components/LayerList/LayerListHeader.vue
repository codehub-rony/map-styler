<template>
  <div class="pb-3 pa-2">
    <div
      class="d-flex flex-row justify-space-between"
      @mouseover="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <div class="text-h6 font-weight-light">
        {{ styleObject.style_name }}
      </div>

      <div class="d-flex flex-row">
        <v-btn
          variant="text"
          icon="mdi-pencil-outline"
          color="grey"
          size="x-small"
          v-if="isHovered"
        ></v-btn>

        <v-btn
          variant="text"
          icon="mdi-plus"
          color="grey"
          size="x-small"
          v-bind="props"
        >
        </v-btn>
        <v-btn
          variant="text"
          icon="mdi-download"
          color="grey"
          size="x-small"
          v-bind="props"
        >
        </v-btn>

        <v-btn
          variant="text"
          icon="mdi-delete-outline"
          color="grey"
          size="x-small"
          v-if="isHovered"
          @click="deleteDataSet"
        ></v-btn>
        <v-btn
          variant="text"
          :icon="isCollapsed ? 'mdi-chevron-right' : 'mdi-chevron-down'"
          color="grey"
          size="x-small"
          v-if="isHovered"
          @click="handleCollapse"
        ></v-btn>

        <v-btn
          variant="text"
          icon="mdi-dots-horizontal"
          color="grey"
          size="x-small"
          v-if="!isHovered"
        ></v-btn>
      </div>
    </div>
  </div>
</template>

<script>
//store
import { useAppStore } from "@/store/app.js";
import { mapActions } from "pinia";
export default {
  emist: ["collapse"],
  props: {
    styleObject: Object,
  },
  data() {
    return {
      isHovered: false,
      isCollapsed: false,
    };
  },
  methods: {
    ...mapActions(useAppStore, ["deleteStyleObject"]),
    deleteDataSet: function () {
      this.deleteStyleObject(this.styleObject.source_id);
    },
    handleCollapse: function () {
      this.isCollapsed = this.isCollapsed ? false : true;
      this.$emit("collapse");
    },
  },
};
</script>
