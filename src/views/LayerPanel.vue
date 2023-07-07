<template>
  <v-scroll-y-transition>
    <LayerList v-if="styleObject" />
  </v-scroll-y-transition>
  <v-scroll-y-transition>
    <DownloadBtn v-if="styleObject" :styleObject="styleObject" class="mt-4" />
  </v-scroll-y-transition>
</template>

<script>
import DownloadBtn from "@/components/DownloadBtn.vue";
import LayerList from "@/components/LayerList/LayerList.vue";

// store
import { useAppStore } from "@/store/app.js";
import { mapState } from "pinia";

export default {
  emits: ["geojson-data"],
  components: {
    DownloadBtn,
    LayerList,
  },
  computed: {
    ...mapState(useAppStore, ["styleObject", "selectedLayer", "addDataSource"]),
    expand() {
      return this.selectedLayer ? true : false;
    },
  },

  methods: {
    handleUpdate: function (update) {
      this.styleObject.updatePaint(
        this.selectedLayer.id,
        update.attribute,
        update.value
      );
    },
  },
};
</script>

<style></style>
