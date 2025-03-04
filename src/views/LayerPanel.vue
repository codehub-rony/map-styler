<template>
  <v-sheet>
    <div class="d-flex flex-row justify-space-between mb-2">
      <h2 class="text-h5 font-weight-light">Datasets</h2>
      <v-btn
        size="x-small"
        variant="text"
        @click="openDialogForNewSource"
        class="mt-2"
        v-if="isAuthenticated && styleObjects.length > 0"
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
    <div class="d-flex flex-column" v-if="styleObjects.length > 0">
      <v-btn
        block
        color="primary"
        rounded="0"
        elevation="0"
        class="mt-2"
        v-if="isAuthenticated"
        @click="saveProject"
        >save</v-btn
      >
      <v-btn
        :color="isAuthenticated ? 'black' : 'primary'"
        rounded="0"
        elevation="0"
        class="mt-2"
        :variant="isAuthenticated ? 'text' : 'flat'"
        @click="handleClickDownload"
        >download</v-btn
      >
      <!-- <DownloadBtn :styleObjects="styleObjects" /> -->
    </div>

    <div v-else class="d-flex flex-column justify-center mt-5">
      <span class="font-italic text-body-2 text-center mb-5"
        >Welcome to the editor <br />
        Currently it looks a bit empty. Let's fix that! <br />Add a VectorTile
        layer to begin exploring.</span
      >
      <v-btn
        size="small"
        variant="outlined"
        rounded="0"
        color="black"
        class="mt-4"
        @click="openDialogForNewSource"
        >Add VectorTile layer</v-btn
      >
    </div>
    <NewTileJSONDialog v-if="isAuthenticated" ref="newdatasource" />
  </v-sheet>
</template>

<script>
import DownloadBtn from "@/components/DownloadBtn.vue";
import LayerList from "@/components/LayerList/LayerList.vue";

import utils from "@/utils/common.js";

import api from "@/services/apiService";
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
    ...mapState(useAppStore, ["styleObjects", "currentProject"]),
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    ...mapActions(useAuthStore, ["isAuthenticated"]),
    openDialogForNewSource: function () {
      this.$refs.newdatasource.openDialog();
    },
    handleClickDownload: function () {
      this.styleObjects.forEach((styleObject) => {
        utils.download_stylejson(styleObject);
      });
    },
    saveProject: function () {
      this.styleObjects.forEach((item) => {
        let payload = {
          name: item.style_name,
          description: "",
          geometry_type: item.geometry_type,
          source_id: item.source_id,
          stylejson: JSON.parse(item.getStyleAsJSON()),
        };

        if (item.id) {
          api.Project.saveStyleJSON(this.currentProject.id, item.id, payload);
        } else {
          let res = api.Project.createStyleJSON(
            this.currentProject.id,
            payload
          ).then((res) => {
            item.id = res.id;
          });
        }
      });
    },
  },
};
</script>

<style></style>
