<template>
  <div class="layer-panel-container">
    <v-sheet>
      <div class="d-flex flex-row justify-space-between mb-2">
        <h2 class="text-h5 font-weight-light">Datasets</h2>
        <v-btn
          size="x-small"
          variant="text"
          @click="openDialogForNewSource"
          class="mt-2"
          >add new</v-btn
        >
      </div>
      <v-scroll-y-transition>
        <div class="layer-list-container">
          <LayerList
            v-for="layer in styleObjects"
            :key="layer.source_id"
            :styleObject="layer"
            class="mb-5"
          />
        </div>
      </v-scroll-y-transition>
      <DownloadBtn />
      <NewTileJSONDialog ref="newdatasource" />
    </v-sheet>
  </div>
</template>

<script>
import DownloadBtn from "@/components/DownloadBtn.vue";
import LayerList from "@/components/LayerList/LayerList.vue";

//tmp
import NewTileJSONDialog from "@/components//DataImport/NewTileJSONDialog.vue";

// store
import { useAppStore } from "@/store/app.js";
import { mapState } from "pinia";

export default {
  components: {
    DownloadBtn,
    LayerList,
    NewTileJSONDialog,
  },
  computed: {
    ...mapState(useAppStore, ["styleObjects"]),
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    openDialogForNewSource: function () {
      this.$refs.newdatasource.openDialog();
    },
  },
  watch: {
    styleObjects: {
      handler() {
        console.log(this.styleObjects);
      },
      deep: true,
    },
  },
};
</script>

<style>
.layer-panel-container {
}
.layer-list-container {
  max-height: 76vh;
  overflow: auto;
}
</style>
