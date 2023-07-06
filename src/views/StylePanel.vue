<template>
  <div v-for="(attribute, i) in attributes" :key="i">
    <v-scroll-y-transition>
      <ColorSelector
        class="mt-5"
        v-show="expand"
        :property="{
          attribute: 'color',
          value: this.selectedLayer.paint.color,
        }"
        @update-colors="handleUpdate"
        v-if="attribute.type === 'color'"
      />
    </v-scroll-y-transition>

    <v-scroll-y-transition>
      <LineWidthSlider
        v-if="attribute.type === 'integer'"
        :property="{
          attribute: 'line-width',
          value: this.selectedLayer.paint['line-width'],
        }"
        @update-width="handleUpdate"
      />
    </v-scroll-y-transition>
  </div>
</template>
<script>
import ColorSelector from "@/components/ColorSelector.vue";
import LineWidthSlider from "@/components/LineWidthSlider.vue";

export default {
  compontents: {
    ColorSelector,
    LineWidthSlider,
  },
  props: {
    attributes: Array,
  },
};
</script>
