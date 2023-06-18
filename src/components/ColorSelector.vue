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
export default {
  props: {
    rgba: Object,
  },
  data() {
    return {
      color: { r: 2, g: 3, b: 2, a: 0 },
      swatches: [
        ["#a6611a", "#f5f5f5", "#c2a5cf"],
        ["#fdae61", "#d7191c", "#dfc27d"],
        ["#2c7bb6", "#abd9e9", "#bababa"],
        ["#1a9641", "#a6d96a", "#ffffbf"],
      ],
    };
  },
  mounted() {
    this.color = this.rgba;
  },
  methods: {
    handleColorSelection: function (e) {
      if (!this.color.a) {
        // selecting swatch sets a to undefined
        this.color.a = 1;
      }
      this.$emit("update-colors", this.color);
    },
  },
  watch: {
    rgba(newValue) {
      this.color = newValue;
    },
  },
};
</script>

<style>
.color-picker {
  width: 100% !important;
}
</style>
