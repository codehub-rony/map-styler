<template>
  <v-list-item
    v-if="item.type == 'item'"
    :value="item"
    density="compact"
    nav
    class="pl-5"
    @click="handleClick"
    rounded="0"
    :active="isSelected"
  >
    <template v-slot:append>
      <div class="textfields d-flex flex-row">
        <div
          class="layerlist-item-color"
          v-bind:style="{ backgroundColor: item.value }"
        ></div>
      </div>
    </template>

    <v-list-item-title v-text="item.title"></v-list-item-title
  ></v-list-item>
</template>
<script>
export default {
  props: {
    selected: Number,
    item: { Object },
  },
  computed: {
    isSelected() {
      return this.selected == this.item.id ? true : false;
    },
  },
  methods: {
    handleClick: function () {
      this.$emit("clicked", this.item);
    },
  },
};
</script>
<style scoped>
.layerlist-item-color {
  height: 15px;
  width: 30px;
  border: 1px solid rgb(197, 197, 197);
}
</style>
