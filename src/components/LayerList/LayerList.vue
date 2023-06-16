<template>
  <!-- <v-list v-for="layer in styleLayer.layers" :key="item.id" rounded="0" class="pa-0">
    <v-list-subheader v-if="item.type == 'subheader'">
      {{ item.title }}</v-list-subheader
    >
    <LayerListItem :item="item" :selected="selected" @clicked="handleClick" />
    <v-divider v-if="item.type == 'divider'"></v-divider>
  </v-list> -->
  <v-list rounded="0" class="pa-0" v-if="styleLayer">
    <v-list-subheader> {{ styleLayer.name }}</v-list-subheader>
    <LayerListItem
      v-for="layer in styleLayer.layers"
      :key="layer.id"
      :layer="layer"
      :selected="selected"
      @clicked="handleClick"
    />

    <!-- <v-divider v-if="item.type == 'divider'"></v-divider> -->
  </v-list>
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

<style></style>
