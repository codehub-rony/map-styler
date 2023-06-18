<template>
  <v-sheet height="80vh">
    <ColorSelector
      :rgba="this.selectedLayer.paint.color"
      @update-colors="handleUpdate"
      v-if="selectedLayer"
    />
  </v-sheet>
</template>

<script>
import ColorSelector from "@/components/ColorSelector.vue";
import { useAppStore } from "@/store/app.js";
import { mapState } from "pinia";

export default {
  components: {
    ColorSelector,
  },
  computed: {
    ...mapState(useAppStore, ["selectedLayer", "updatePaintAttribute"]),
  },
  data() {
    return {
      rgba: null,
    };
  },
  mounted() {
    this.rgba = this.selectedLayer.paint.color;
  },
  methods: {
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
