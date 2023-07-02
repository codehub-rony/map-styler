<template>
  <DataLoadDialog v-if="!styleObject" @load-datasource="loadData" />
  <v-scroll-y-transition>
    <LayerList v-if="styleObject" />
  </v-scroll-y-transition>
  <v-scroll-y-transition>
    <DownloadBtn v-if="styleObject" :styleObject="styleObject" class="mt-4" />
  </v-scroll-y-transition>

  <v-scroll-y-transition>
    <ColorSelector
      class="mt-5"
      v-show="expand"
      :property="{ attribute: 'color', value: this.selectedLayer.paint.color }"
      @update-colors="handleUpdate"
      v-if="selectedLayer"
    />
  </v-scroll-y-transition>
  <v-scroll-y-transition>
    <LineWidthSlider
      :property="{
        attribute: 'line-width',
        value: this.selectedLayer.paint['line-width'],
      }"
      @update-width="handleUpdate"
      v-if="selectedLayer && Object.hasOwn(selectedLayer.paint, 'line-width')"
    />
  </v-scroll-y-transition>
</template>

<script>
import DownloadBtn from "@/components/DownloadBtn.vue";
import LayerList from "@/components/LayerList/LayerList.vue";
import DataLoadDialog from "@/components/DataLoadDialog.vue";
import ColorSelector from "@/components/ColorSelector.vue";
import LineWidthSlider from "@/components/LineWidthSlider.vue";

// store
import { useAppStore } from "@/store/app.js";
import { mapState } from "pinia";

export default {
  emits: ["geojson-data"],
  components: {
    ColorSelector,
    DataLoadDialog,
    DownloadBtn,
    LayerList,
    LineWidthSlider,
  },
  computed: {
    ...mapState(useAppStore, ["styleObject", "selectedLayer", "addDataSource"]),
    expand() {
      return this.selectedLayer ? true : false;
    },
  },

  methods: {
    loadData: function (geojson) {
      this.addDataSource(geojson);
      this.$emit("geojson-data", geojson);
    },
    handleUpdate: function (update) {
      this.styleObject.updatePaint(
        this.selectedLayer.id,
        update.attribute,
        update.value
      );
    },
  },
};
</script>

<style></style>
