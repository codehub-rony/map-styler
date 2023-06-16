<template>
  <v-list v-for="item in items" :key="item.id" rounded="0" class="pa-0">
    <v-list-subheader v-if="item.type == 'subheader'">
      {{ item.title }}</v-list-subheader
    >
    <LayerListItem :item="item" :selected="selected" @clicked="handleClick" />
    <v-divider v-if="item.type == 'divider'"></v-divider>
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
    ...mapState(useAppStore, ["selectedStyleAttribute", "selectAttribute"]),
  },
  data: () => ({
    selected: null,
    items: [
      { id: 1, type: "subheader", title: "Buildings" },
      { id: 2, type: "item", title: "Fill", value: "rgba(232, 227, 223, 0.7)" },
      { id: 3, type: "item", title: "Border", value: "rgba(54, 154, 204, 1)" },

      // { type: "divider" },
      // { type: "subheader", title: "Buidlings older than 1970" },
      // { type: "item", title: "Item #4", value: "rgba(54, 154, 204, 1)" },
      // { type: "item", title: "Item #5", value: "rgba(54, 154, 204, 1)" },
      // { type: "item", title: "Item #6", value: "rgba(54, 154, 204, 1)" },
    ],
  }),

  methods: {
    handleClick: function (item) {
      if (this.selected != item.id) {
        this.selected = item.id;
        this.selectAttribute(item);
      } else {
        this.selected = null;
        this.selectAttribute(null);
      }
    },
  },
};
</script>

<style></style>
