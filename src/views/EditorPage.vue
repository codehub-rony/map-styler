<template>
  <v-container>
    <v-row dense
      ><v-col cols="0" xl="1"></v-col>
      <v-col cols="12" xl="2" lg="3" md="3" sm="3">
        <LayerPanel />
      </v-col>

      <v-col cols="12" lg="8" md="9" sm="9">
        <MapViewer ref="map" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// components
import LayerPanel from "@/views/LayerPanel.vue";
import MapViewer from "@/components/MapViewer.vue";

// store
import { useAppStore } from "@/store/app";
import { mapActions } from "pinia";

export default {
  components: {
    LayerPanel,
    MapViewer,
  },
  methods: {
    ...mapActions(useAppStore, ["clearProject"]),
  },

  beforeRouteLeave(to, from, next) {
    this.clearProject();
    next();
  },
};
</script>
<style></style>
