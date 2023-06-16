<template>
  <v-color-picker
    class="color-picker"
    v-model="color"
    :swatches="swatches"
    show-swatches
    hide-inputs
    rounded="0"
    elevation="0"
    @update:modelValue="handleColorSelection"
  ></v-color-picker>
</template>

<script>
import mbjson from "@/utils/mbjson";
export default {
  props: {
    colorAttributes: Object,
  },
  data() {
    return {
      swatches: [
        ["#a6611a", "#f5f5f5", "#c2a5cf "],
        ["#fdae61", "#d7191c", "#dfc27d"],
        ["#2c7bb6", "#abd9e9", "#bababa"],
        ["#1a9641", "#a6d96a", "#ffffbf"],
      ],
      color: { r: 2, g: 3, b: 2, a: 0 },
    };
  },
  methods: {
    handleColorSelection: function (e) {
      let update = { layer_id: this.colorAttributes.layer_id, paint: {} };
      update["paint"][this.colorAttributes["key"]] = mbjson.rgbaToRgbText(
        this.color
      );
      update["paint"]["fill-opacity"] = this.color.a;

      this.$emit("update-colors", update);
    },
  },
  watch: {
    colorAttributes(newVal) {
      this.color = newVal.value;
    },
  },
};
</script>

<style>
.color-picker {
  width: 100% !important;
}
</style>
