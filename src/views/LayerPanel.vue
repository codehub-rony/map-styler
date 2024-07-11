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
  <v-btn @click="openDialogForNewSource">Add new source</v-btn>
  <v-scroll-y-transition>
    <!-- <DownloadBtn v-if="styleObject" :styleObject="styleObject" class="mt-4" /> -->
    <DownloadBtn
      v-if="isStyleObjectLoaded"
      :styleObjects="styleObjects"
      class="mt-4"
    />
  </v-scroll-y-transition>
  <NewTileJSONDialog ref="newdatasource" />
</template>

<script>
import DownloadBtn from "@/components/DownloadBtn.vue";
import LayerList from "@/components/LayerList/LayerList.vue";
import BtnCreateLayer from "@/components/Filters/BtnCreateLayer.vue";

//tmp
import NewTileJSONDialog from "@/components//DataImport/NewTileJSONDialog.vue";

// store
import { useAppStore } from "@/store/app.js";
import { mapState, mapActions } from "pinia";

export default {
  components: {
    BtnCreateLayer,
    DownloadBtn,
    LayerList,
    NewTileJSONDialog,
  },
  computed: {
    ...mapState(useAppStore, [
      "styleObject",
      "styleObjects",
      "selectedLayer",
      "addDataSource",
    ]),
    expand() {
      return this.selectedLayer ? true : false;
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    ...mapActions(useAppStore, ["isStyleObjectLoaded"]),
    editLayer: function (layer) {
      this.$refs.filterDialog.openDialog(layer);
    },
    openDialogForNewSource: function () {
      this.$refs.newdatasource.openDialog();
    },
  },
};
</script>

<style></style>
