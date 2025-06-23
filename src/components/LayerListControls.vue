<template>
  <div class="d-flex flex-row justify-space-between">
    <div
      class="text-h6 font-weight-light"
      @click="handleCollapse"
      :style="{ cursor: 'pointer' }"
    >
      {{ styleObject.name }}
    </div>

    <div class="d-flex flex-row">
      <v-btn
        variant="text"
        :icon="isCollapsed ? 'mdi-chevron-right' : 'mdi-chevron-down'"
        color="grey"
        size="x-small"
        v-bind="props"
        @click="handleCollapse"
      >
      </v-btn>

      <v-menu location="end">
        <template v-slot:activator="{ props }">
          <v-btn
            variant="text"
            icon="mdi-dots-horizontal"
            color="grey"
            size="x-small"
            @click="isOpen = isOpen ? false : true"
            v-bind="props"
          ></v-btn>
        </template>

        <v-list elevation="0" rounded="0" class="pa-0">
          <div class="dataset-menu-container">
            <div v-for="(item, index) in items" :key="index">
              <div
                v-if="item.title != 'hide layer'"
                class="pl-2 pr-2 pt-1 pb-1 hover-bg"
                :style="{ cursor: 'pointer' }"
                @click="item.action"
              >
                <v-icon :icon="item.icon" size="x-small" color="grey"></v-icon>
                <span class="text-body-2 pl-2">{{ item.title }}</span>
              </div>
              <div
                v-if="item.title == 'hide layer'"
                class="pl-2 pr-2 pt-1 pb-1 hover-bg"
                :style="{ cursor: 'pointer' }"
                @click="item.isHidden = item.isHidden ? false : true"
              >
                <v-icon
                  :icon="
                    item.isHidden ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                  "
                  size="x-small"
                  color="grey"
                ></v-icon>
                <span v-if="item.isHidden" class="text-body-2 pl-2"
                  >hide on map</span
                >
                <span v-if="!item.isHidden" class="text-body-2 pl-2"
                  >show on map</span
                >
              </div>
            </div>
          </div>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script>
//store
import { useAppStore } from "@/store/app.js";
import { mapActions } from "pinia";

//utils
import utils from "@/utils/common.js";

export default {
  emits: ["collapse"],
  props: {
    styleObject: Object,
  },
  data() {
    return {
      isCollapsed: false,
      isOpen: false,
      items: [
        {
          title: "hide layer",
          icon: "mdi-delete-outline",
          action: this.toggleVisibility,
          isHidden: true,
        },
        {
          title: "Download",
          icon: "mdi-download",
          action: this.downloadStyleJSON,
        },
        // {
        //   title: "Rename",
        //   icon: "mdi-pencil-outline",
        //   action: this.renameDataset,
        // },
        {
          title: "Delete",
          icon: "mdi-delete-outline",
          action: this.deleteDataSet,
        },
      ],
    };
  },
  methods: {
    ...mapActions(useAppStore, ["deleteStyleObject"]),
    deleteDataSet: function () {
      this.deleteStyleObject(this.styleObject.id);
    },
    handleCollapse: function () {
      this.isCollapsed = this.isCollapsed ? false : true;
      this.$emit("collapse");
    },
    renameDataset: function () {
      console.log("clicked rename");
    },
    downloadStyleJSON: function () {
      utils.download_stylejson(this.styleObject);
    },
  },
  watch: {
    items: {
      handler() {
        const item = this.items.find((item) => item.title === "hide layer");
        this.styleObject.stylejson.setVisibilityAllLayers(item.isHidden);
      },
      deep: true,
    },
  },
};
</script>

<style>
.dataset-menu-container {
  border: solid 1px #e0e0e0;
}

.hover-bg {
  background-color: white; /* Default background color */
  transition: background-color 0.3s ease; /* Smooth transition */
}
.hover-bg:hover {
  background-color: #e0e0e0; /* Background color on hover */
}
</style>
