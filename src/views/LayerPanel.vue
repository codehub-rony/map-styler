<template>
  <v-scroll-y-transition>
    <v-sheet rounded="0" elevation="2">
      <LayerList v-if="styleObject" @open-edit-dialog="editLayer" />
      <BtnCreateLayer
        v-if="styleObject"
        :styleObject="styleObject"
        mode="new"
        class="mt-4"
        ref="filterDialog"
      />
    </v-sheet>
  </v-scroll-y-transition>
  <v-scroll-y-transition> </v-scroll-y-transition>
  <v-scroll-y-transition>
    <DownloadBtn v-if="styleObject" :styleObject="styleObject" class="mt-4" />
  </v-scroll-y-transition>
</template>

<script>
import DownloadBtn from "@/components/DownloadBtn.vue";
import LayerList from "@/components/LayerList/LayerList.vue";
import BtnCreateLayer from "@/components/Filters/BtnCreateLayer.vue";

// store
import { useAppStore } from "@/store/app.js";
import { mapState } from "pinia";

export default {
  components: {
    BtnCreateLayer,
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
    editLayer: function (layer) {
      this.$refs.filterDialog.openDialog(layer);
    },
  },
};
</script>

<style></style>
