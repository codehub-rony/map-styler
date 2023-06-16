<template>
  <v-sheet rounded="0" max-height="90vh"
    ><h3 class="pa-3">Layers</h3>
    <LayerList
  /></v-sheet>
</template>

<script>
import LayerList from "@/components/LayerList/LayerList.vue";
export default {
  components: {
    LayerList,
  },
  data() {
    return {};
  },
};
</script>

<style></style>
