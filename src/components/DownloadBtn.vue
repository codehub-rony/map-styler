<template>
  <v-btn
    block
    color="primary"
    rounded="0"
    elevation="0"
    class="mt-2"
    @click="handleClick"
    >download</v-btn
  >
</template>

<script>
export default {
  props: {
    styleObjects: Array,
  },
  methods: {
    handleClick: function () {
      this.styleObjects.forEach((styleObject) => {
        let json = styleObject.getStyleAsJSON();
        const a = document.createElement("a");
        const file = new Blob([json], { type: "application/json" });
        a.href = URL.createObjectURL(file);
        a.download = `${styleObject.style_name}.mbs`;
        a.click();
      });
    },
  },
};
</script>
