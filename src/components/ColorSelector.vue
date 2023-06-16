<template>
  <v-color-picker
    class="color-picker"
    v-model="color"
    :swatches="swatches"
    show-swatches
    hide-inputs
    rounded="0"
    @update:modelValue="rgbToText"
    elevation="0  "
  ></v-color-picker>
</template>

<script>
import mbjson from "../utils/mbjson.js";
export default {
  data() {
    return {
      swatches: [
        ["#FF0000", "#AA0000", "#550000"],
        ["#FFFF00", "#AAAA00", "#555500"],
        ["#00FF00", "#00AA00", "#005500"],
        ["#00FFFF", "#00AAAA", "#005555"],
      ],
      color: null,
      rgbaText: null,
      select: null,
    };
  },

  methods: {
    rgbToText: function (color) {
      this.rgbaText = mbjson.rgbaToText(color);
    },
  },
};
</script>

<style>
.color-picker {
  width: 100% !important;
}
</style>
