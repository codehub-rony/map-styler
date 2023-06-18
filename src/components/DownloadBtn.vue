<template>
  <v-btn
    v-if="styleLayer"
    block
    color="indigo-darken-1"
    elevation="2"
    class="mt-2"
    @click="handleClick"
    >download style json</v-btn
  >
</template>

<script>
import { useAppStore } from "@/store/app.js";
import { mapState } from "pinia";

//utils
import mbjson from "@/utils/mbjson";

export default {
  computed: {
    ...mapState(useAppStore, ["styleLayer"]),
  },
  methods: {
    handleClick: function () {
      console.log("clicked");
      let json = mbjson.create_styleJSON(this.styleLayer);
      const a = document.createElement("a");
      const file = new Blob([json], { type: "application/json" });
      a.href = URL.createObjectURL(file);
      a.download = `${this.styleLayer.name}.json`;
      a.click();
    },
  },
};
</script>
