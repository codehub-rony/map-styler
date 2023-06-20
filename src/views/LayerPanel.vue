<template>
  <DataLoadDialog v-if="!styleLayer" @datasource-added="addSource" />
  <v-scroll-y-transition>
    <LayerList v-if="styleLayer" />
  </v-scroll-y-transition>
  <v-scroll-y-transition>
    <DownloadBtn v-if="styleLayer" class="mt-4" />
  </v-scroll-y-transition>

  <v-scroll-y-transition>
    <ColorSelector
      class="mt-5"
      v-show="expand"
      :rgba="this.selectedLayer.paint.color"
      @update-colors="handleUpdate"
      v-if="selectedLayer"
    />
  </v-scroll-y-transition>
</template>

<script>
import DownloadBtn from "@/components/DownloadBtn.vue";
import LayerList from "@/components/LayerList/LayerList.vue";
import DataLoadDialog from "@/components/DataLoadDialog.vue";
import ColorSelector from "@/components/ColorSelector.vue";

// store
import { useAppStore } from "@/store/app.js";
import { mapState } from "pinia";

export default {
  components: {
    ColorSelector,
    DataLoadDialog,
    DownloadBtn,
    LayerList,
  },
  computed: {
    ...mapState(useAppStore, [
      "styleLayer",
      "selectedLayer",
      "updateDataSource",
      "updatePaintAttribute",
    ]),
    expand() {
      return this.selectedLayer ? true : false;
    },
  },
  data() {
    return {
      rgba: null,
    };
  },

  methods: {
    addSource: function (data) {
      this.updateDataSource(data);
    },
    handleUpdate: function (updated_color) {
      this.updatePaintAttribute({
        attribute: "color",
        value: updated_color,
      });
    },
  },
  watch: {
    selectedLayer: {
      handler(layer) {
        if (layer) {
          this.rgba = layer.paint.color;
        }
      },
      deep: true,
    },
  },
};
</script>

<style></style>
