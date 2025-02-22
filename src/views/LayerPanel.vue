<template>
  <v-sheet>
    <div class="d-flex flex-row justify-space-between mb-2">
      <h2 class="text-h5 font-weight-light">Datasets</h2>
      <v-btn
        size="x-small"
        variant="text"
        @click="openDialogForNewSource"
        class="mt-2"
        v-if="isLoggedIn"
        >add new</v-btn
      >
    </div>
    <v-scroll-y-transition>
      <div>
        <LayerList
          v-for="layer in styleObjects"
          :key="layer.source_id"
          :styleObject="layer"
        />
      </div>
    </v-scroll-y-transition>
    <div class="d-flex flex-column">
      <v-btn
        block
        color="primary"
        rounded="0"
        elevation="0"
        class="mt-2"
        v-if="isLoggedIn"
        >save</v-btn
      >
      <v-btn
        :color="isLoggedIn ? 'black' : 'primary'"
        rounded="0"
        elevation="0"
        class="mt-2"
        :variant="isLoggedIn ? 'text' : 'flat'"
        @click="handleClickDownload"
        >download</v-btn
      >
      <!-- <DownloadBtn :styleObjects="styleObjects" /> -->
    </div>
    <NewTileJSONDialog v-if="isLoggedIn" ref="newdatasource" />
  </v-sheet>
</template>

<script>
import DownloadBtn from "@/components/DownloadBtn.vue";
import LayerList from "@/components/LayerList/LayerList.vue";

import utils from "@/utils/common.js";

//tmp
import NewTileJSONDialog from "@/components//DataImport/NewTileJSONDialog.vue";

// store
import { useAppStore } from "@/store/app.js";
import { useAuthStore } from "@/store/auth.js";
import { mapState, mapActions } from "pinia";

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
  mounted() {
    console.log(this.isLoggedIn());
  },
  methods: {
    ...mapActions(useAuthStore, ["isLoggedIn"]),
    openDialogForNewSource: function () {
      this.$refs.newdatasource.openDialog();
    },
    handleClickDownload: function () {
      this.styleObjects.forEach((styleObject) => {
        utils.download_stylejson(styleObject);
      });
    },
  },
};
</script>

<style></style>
