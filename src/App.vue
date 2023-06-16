<template>
  <v-app>
    <v-main>
      <v-app id="app_container">
        <AppBar />
        <v-layout>
          <v-navigation-drawer
            :rail="rail"
            rail-width="0.1"
            permanent
            location="right"
            color="rgba(0,0,0,0)"
            border="0"
            class="mr-2"
          >
            <div class="app-nav-drawer-container">
              <StylingPanel v-if="selectedLayer" />
            </div>
          </v-navigation-drawer>
          <v-main class="bg-grey-lighten-3 app-main-content-container">
            <v-container>
              <v-row dense>
                <v-col cols="12" sm="2">
                  <LayerPanel />
                </v-col>

                <v-col cols="12" sm="10">
                  <MapViewer />
                </v-col>
              </v-row>
            </v-container>
          </v-main>
        </v-layout>
      </v-app>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import MapViewer from "@/components/MapViewer.vue";
import StylingPanel from "@/views/StylingPanel.vue";
import LayerPanel from "@/views/LayerPanel.vue";
import { useAppStore } from "@/store/app.js";
import { mapState } from "pinia";

export default {
  components: {
    AppBar,
    MapViewer,
    StylingPanel,
    LayerPanel,
  },
  computed: {
    ...mapState(useAppStore, ["selectedLayer", "styleLayer"]),
    rail() {
      return this.selectedLayer ? false : true;
    },
  },
  data() {
    return {};
  },
};
</script>
<style>
.app-nav-drawer-container {
  margin-top: 75px;
}
.app-main-content-container {
  margin-top: 60px;
}
</style>
