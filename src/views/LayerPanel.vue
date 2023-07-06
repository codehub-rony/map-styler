<template>
  <v-scroll-y-transition>
    <LayerList v-if="styleObject" />
  </v-scroll-y-transition>
  <v-scroll-y-transition>
    <DownloadBtn v-if="styleObject" :styleObject="styleObject" class="mt-4" />
  </v-scroll-y-transition>

  <StylePanel v-if="selectedLayer" :attributes="selectedLayer.paint" />

  <!-- <v-scroll-y-transition>
    <ColorSelector
      class="mt-5"
      v-show="expand"
      :property="{
        attribute: 'color',
        value: this.selectedLayer.paint.color,
      }"
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
  </v-scroll-y-transition> -->
</template>

<script>
import DownloadBtn from "@/components/DownloadBtn.vue";
import LayerList from "@/components/LayerList/LayerList.vue";
import ColorSelector from "@/components/ColorSelector.vue";
import LineWidthSlider from "@/components/LineWidthSlider.vue";
import StylePanel from "./StylePanel.vue";

// store
import { useAppStore } from "@/store/app.js";
import { mapState } from "pinia";

export default {
  emits: ["geojson-data"],
  components: {
    ColorSelector,
    DownloadBtn,
    LayerList,
    LineWidthSlider,
    StylePanel,
  },
  computed: {
    ...mapState(useAppStore, ["styleObject", "selectedLayer", "addDataSource"]),
    expand() {
      return this.selectedLayer ? true : false;
    },
  },

  methods: {
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
