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
    layer: Object,
  },
  methods: {
    handleClick: function () {
      if (this.callback) {
        this.callback(this.layer);
      } else {
        this.$emit("click");
      }
    },
  },
};
</script>
