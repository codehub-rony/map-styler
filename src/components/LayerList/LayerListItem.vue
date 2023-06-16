<template>
  <v-list-item
    :value="layer"
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
          v-bind:style="{ backgroundColor: layer.paint[colorAttribute] }"
        ></div>
      </div>
    </template>

    <v-list-item-title v-text="layer.type"></v-list-item-title
  ></v-list-item>
</template>
<script>
export default {
  props: {
    selected: String,
    layer: { Object },
  },
  computed: {
    isSelected() {
      return this.selected == this.layer.id ? true : false;
    },
    colorAttribute() {
      return this.layer.type == "fill" ? "fill-color" : "line-color";
    },
  },
  methods: {
    handleClick: function () {
      this.$emit("clicked", this.layer);
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
