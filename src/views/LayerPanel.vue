<template>
  <DataLoadDialog v-if="!styleLayer" @datasource-added="addSource" />

  <LayerList v-if="styleLayer" />

  <DownloadBtn v-if="styleLayer" />
</template>

<script>
import DownloadBtn from "@/components/DownloadBtn.vue";
import LayerList from "@/components/LayerList/LayerList.vue";
import DataLoadDialog from "@/components/DataLoadDialog.vue";

// store
import { useAppStore } from "@/store/app.js";
import { mapState } from "pinia";

export default {
  components: {
    DataLoadDialog,
    DownloadBtn,
    LayerList,
  },
  computed: {
    ...mapState(useAppStore, ["styleLayer", "updateDataSource"]),
  },
  data() {
    return {};
  },
  methods: {
    addSource: function (data) {
      this.updateDataSource(data);
    },
  },
};
</script>

<style></style>
