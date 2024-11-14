<template>
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
      <div>
        <LayerList
          v-for="layer in styleObjects"
          :key="layer.source_id"
          :styleObject="layer.stylejson"
        />
      </div>
    </v-scroll-y-transition>
    <DownloadBtn :styleObjects="styleObjects" />
    <NewTileJSONDialog ref="newdatasource" />
  </v-sheet>
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
};
</script>

<style></style>
