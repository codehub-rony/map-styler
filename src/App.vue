<template>
  <v-app id="app_container">
    <AppBar />

    <v-main class="bg-grey-lighten-3 app-main-content-container">
      <v-container>
        <v-row dense>
          <v-col cols="12" sm="2">
            <LayerPanel @geojson-data="handleData" />
          </v-col>

          <v-col cols="12" sm="10">
            <MapViewer :geodata="geodata" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import AppFooter from "@/components/AppFooter.vue";
import MapViewer from "@/components/MapViewer.vue";
import LayerPanel from "@/views/LayerPanel.vue";

export default {
  components: {
    AppBar,
    AppFooter,
    MapViewer,
    LayerPanel,
  },
  data() {
    return {
      geodata: { type: null, json: null },
    };
  },
  methods: {
    handleData: function (geojson) {
      this.geodata = { type: "geojson", json: geojson };
    },
  },
};
</script>
