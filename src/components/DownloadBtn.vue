<template>
  <v-btn block color="primary" elevation="2" class="mt-2" @click="handleClick"
    >download style json</v-btn
  >
</template>

<script>
export default {
  props: {
    styleObject: Object,
  },
  methods: {
    handleClick: function () {
      let json = this.styleObject.getStyleAsJSON();
      const a = document.createElement("a");
      const file = new Blob([json], { type: "application/json" });
      a.href = URL.createObjectURL(file);
      a.download = `${this.styleObject.name}.json`;
      a.click();
    },
  },
};
</script>
