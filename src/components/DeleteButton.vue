<template>
  <v-btn
    variant="text"
    icon="mdi-window-close"
    color="grey"
    size="x-small"
    @click="handleClick"
  ></v-btn>
</template>
<script>
export default {
  props: {
    callback: Function,
    item: Object,
  },
  methods: {
    handleClick: function () {
      if (this.callback) {
        this.callback(this.item);
      } else {
        this.$emit("click");
      }
    },
  },
};
</script>
