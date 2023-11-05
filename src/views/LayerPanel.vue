<template>
  <v-scroll-y-transition>
    <v-sheet rounded="0" elevation="2">
    <LayerList v-if="styleObject" />
    <AddFilterBtn v-if="styleObject" :styleObject="styleObject" class="mt-4" />
  </v-sheet>
  </v-scroll-y-transition>
  <v-scroll-y-transition>

  </v-scroll-y-transition>
  <v-scroll-y-transition>
    <DownloadBtn v-if="styleObject" :styleObject="styleObject" class="mt-4" />
  </v-scroll-y-transition>
</template>

<script>
import AddFilterBtn from "@/components/Filters/AddFilterBtn.vue"
import DownloadBtn from "@/components/DownloadBtn.vue";
import LayerList from "@/components/LayerList/LayerList.vue";

// store
import { useAppStore } from "@/store/app.js";
import { mapState } from "pinia";

export default {
  emits: ["geojson-data"],
  components: {
    AddFilterBtn,
    DownloadBtn,
    LayerList,
  },
  computed: {
    ...mapState(useAppStore, ["styleObject", "selectedLayer", "addDataSource"]),
    expand() {
      return this.selectedLayer ? true : false;
    },
  },
};
</script>

<style></style>
