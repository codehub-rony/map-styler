<template>
  <v-sheet rounded="0">
    <h3 class="pa-3">Layers</h3>

    <v-list rounded="0" class="pa-0" v-if="styleLayer">
      <v-list-subheader style="height: 20px">
        {{ styleLayer.name }}</v-list-subheader
      >
      <LayerListItem
        v-for="layer in styleLayer.layers"
        :key="layer.id"
        :layer="layer"
        :selected="selected"
        @clicked="handleClick"
      /> </v-list
  ></v-sheet>
</template>

<script>
import LayerListItem from "@/components/LayerList/LayerListItem.vue";
import { useAppStore } from "@/store/app.js";
import { mapState } from "pinia";
export default {
  components: {
    LayerListItem,
  },
  computed: {
    ...mapState(useAppStore, [
      "selectedLayer",
      "selectLayer",
      "deselectLayer",
      "styleLayer",
    ]),
  },
  data: () => ({
    selected: null,
    item: null,
  }),
  methods: {
    handleClick: function (layer) {
      if (this.selected != layer.id) {
        this.selected = layer.id;
        this.selectLayer(layer);
      } else {
        this.selected = null;
        this.deselectLayer(null);
      }
    },
  },
};
</script>

<style>
.testy {
  height: 20px;
}
</style>
