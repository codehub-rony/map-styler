<template>
  <v-btn
    variant="text"
    :icon="icon"
    color="grey"
    size="x-small"
    @click="handleClick"
  ></v-btn>
</template>
<script>
export default {
  props: {
    layer: Object,
  },
  data() {
    return {
      isHidden: true,
    };
  },
  computed: {
    icon() {
      return this.isHidden ? "mdi-eye-outline" : "mdi-eye-off-outline";
    },
  },
  methods: {
    handleClick: function () {
      this.isHidden = this.isHidden ? false : true;
      this.layer.setVisibility(this.isHidden);
    },
  },
  watch: {
    layer: {
      handler() {
        this.isHidden = this.layer.getVisibility();
      },
      deep: true,
    },
  },
};
</script>
