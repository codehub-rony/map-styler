<template>
  <span class="text-body-2">{{ attribute.component.label }}</span>
  <div
    v-if="attribute.component.type === 'color_picker'"
    class="layerlist-item-color"
    v-bind:style="{ backgroundColor: rgba }"
    @click="handleClick"
  >
    <div class="color-selector-container">
      <v-scroll-y-transition>
        <v-color-picker
          class="color-selector"
          v-model="this.attribute.value"
          show-swatches
          :modes="['rgba']"
          rounded="0"
          elevation="0"
          width="100%"
          @update:modelValue="handleColorSelection"
          v-if="colorPickerIsOpen"
          v-click-outside="closeColorPicker"
        ></v-color-picker>
      </v-scroll-y-transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    attribute: Object,
  },
  computed: {
    rgba() {
      return `rgba(${this.attribute.value.r}, ${this.attribute.value.g}, ${this.attribute.value.b}, ${this.attribute.value.a})`;
    },
  },
  data() {
    return {
      swatches: [
        ["#a6611a", "#f5f5f5", "#c2a5cf"],
        ["#fdae61", "#d7191c", "#dfc27d"],
        ["#2c7bb6", "#abd9e9", "#bababa"],
        ["#1a9641", "#a6d96a", "#ffffbf"],
      ],
      colorPickerIsOpen: false,
    };
  },

  methods: {
    handleClick: function (e) {
      // Prevent colorpicker from closing when the colorpicker itself is clicked
      if (e.target.classList.contains("layerlist-item-color")) {
        this.colorPickerIsOpen = this.colorPickerIsOpen ? false : true;
      }
    },
    handleColorSelection: function (e) {
      if (!this.attribute.value.a) {
        // selecting swatch sets a to undefined
        this.attribute.value.a = 1;
      }
    },
    closeColorPicker: function () {
      if (this.colorPickerIsOpen) {
        this.colorPickerIsOpen = false;
      }
    },
  },
};
</script>
<style>
.layerlist-item-color {
  cursor: pointer;
  height: 20px;
  width: 35px;
  border: 1px solid rgb(197, 197, 197);
}
.color-selector-container {
  position: relative;
}
.color-selector {
  position: absolute;
  min-width: 250px;
  left: 35px;
  z-index: 20;
}
</style>
