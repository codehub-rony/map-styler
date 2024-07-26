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
//utils
import utils from "@/utils/common.js";
export default {
  props: {
    styleObjects: Array,
  },
  methods: {
    handleClick: function () {
      this.styleObjects.forEach((styleObject) => {
        utils.download_stylejson(styleObject);
      });
    },
  },
};
</script>
