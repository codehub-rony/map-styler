<template>
  <v-container>
    <v-row dense>
      <v-col cols="12" sm="2" xs="4">
        <LayerPanel />
      </v-col>

      <v-col cols="12" sm="10">
        <MapViewer :geodata="geodata" ref="map" />
      </v-col>
    </v-row>
  </v-container>
  <LandingDialog @load-datasource="loadData" />
</template>
<script>
// components
import LandingDialog from "@/components/LandingDialog.vue";
import LayerPanel from "@/views/LayerPanel.vue";
import MapViewer from "@/components/MapViewer.vue";

// store
import { useAppStore } from "@/store/app.js";
import { mapState } from "pinia";

export default {
  components: {
    LandingDialog,
    LayerPanel,
    MapViewer,
  },
  computed: {
    ...mapState(useAppStore, ["styleObject", "addDataSource"]),
  },
  data() {
    return {
      customData: false,
      geodata: { type: null, json: null },
    };
  },

  methods: {
    loadData: function (geojson) {
      this.geodata = { type: "geojson", json: JSON.stringify(geojson) };
      this.addDataSource(geojson);
    },
  },
};
</script>
