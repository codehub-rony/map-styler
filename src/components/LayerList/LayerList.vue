<template>
  <v-list v-for="(item, key) in items" :key="key" rounded="0" class="pa-0">
    <v-list-subheader v-if="item.type == 'subheader'">
      {{ item.title }}</v-list-subheader
    >
    <LayerListItem
      :id="key"
      :item="item"
      :selected="selected"
      @clicked="handleClick"
    />
    <v-divider v-if="item.type == 'divider'"></v-divider>
  </v-list>
</template>

<script>
import LayerListItem from "@/components/LayerList/LayerListItem.vue";

export default {
  components: {
    LayerListItem,
  },

  data: () => ({
    selected: null,
    items: [
      { type: "subheader", title: "Buildings" },
      { type: "item", title: "Fill", value: "rgba(232, 227, 223, 0.7)" },
      { type: "item", title: "Border", value: "rgba(54, 154, 204, 1)" },

      { type: "divider" },
      { type: "subheader", title: "Buidlings older than 1970" },
      { type: "item", title: "Item #4", value: 4 },
      { type: "item", title: "Item #5", value: 5 },
      { type: "item", title: "Item #6", value: 6 },
    ],
  }),
  methods: {
    handleClick: function (item_id) {
      this.selected = item_id;
    },
  },
};
</script>

<style></style>
