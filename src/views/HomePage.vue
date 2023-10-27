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
    ...mapState(useAppStore, ["styleObject", "setStyleObject"]),
  },
  data() {
    return {
      customData: false,
      geodataSource: { type: null, json: null },
    };
  },

  methods: {
    loadData: function (styleObject) {
      this.setStyleObject(styleObject);
      this.$refs.map.createVectorLayer();
    },
  },
};
</script>
<style></style>
