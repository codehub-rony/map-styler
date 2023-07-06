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
        <div class="layerlist-item-color"></div>
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
    // rgba() {
    //   return `rgba(${this.layer.paint.color.r}, ${this.layer.paint.color.g}, ${this.layer.paint.color.b}, ${this.layer.paint.color.a})`;
    // },
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
