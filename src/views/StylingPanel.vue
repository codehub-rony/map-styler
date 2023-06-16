<template>
  <ColorSelector class="color-picker" />
</template>

<script>
import ColorSelector from "@/components/ColorSelector.vue";

export default {
  components: {
    ColorSelector,
  },
  props: {
    featureLayer: { Object },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
.color-picker {
  width: 100%;
}
</style>
