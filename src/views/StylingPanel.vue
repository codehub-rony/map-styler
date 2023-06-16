<template>
  <v-sheet height="80vh">
    <ColorSelector
      :colorAttributes="colorAttributes"
      @update-colors="handleUpdate"
      v-if="selectedLayer"
    />
  </v-sheet>
</template>

<script>
import ColorSelector from "@/components/ColorSelector.vue";
import { useAppStore } from "@/store/app.js";
import { mapState } from "pinia";

//utils
import mbjson from "../utils/mbjson.js";
export default {
  components: {
    ColorSelector,
  },
  computed: {
    ...mapState(useAppStore, ["selectedLayer", "updatelayer"]),
  },
  data() {
    return {
      colorAttributes: null,
    };
  },
  mounted() {
    this.parseColorAttr();
  },
  methods: {
    handleUpdate: function (layer) {
      this.updatelayer(layer);
    },
    parseColorAttr: function () {
      let obj = { layer_id: this.selectedLayer.id };
      if (this.selectedLayer.paint.hasOwnProperty("fill-color")) {
        obj["key"] = "fill-color";
        obj["value"] = mbjson.rgbToObject(
          this.selectedLayer.paint["fill-color"],
          this.selectedLayer.paint["opacity"]
        );
      }
      if (this.selectedLayer.paint.hasOwnProperty("line-color")) {
        obj["key"] = "line-color";
        obj["value"] = mbjson.rgbToObject(
          this.selectedLayer.paint["line-color"],
          this.selectedLayer.paint["opacity"]
        );
      }
      this.colorAttributes = obj;
    },
  },
  watch: {
    selectedLayer: {
      handler(layer) {
        if (layer) {
          this.parseColorAttr();
        }
      },
      deep: true,
    },
  },
};
</script>

<style></style>
