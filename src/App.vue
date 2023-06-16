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
              <StylingPanel />
            </div>
          </v-navigation-drawer>
          <v-main class="bg-grey-lighten-3 app-main-content-container">
            <v-container>
              <v-row dense>
                <v-col cols="12" sm="2" class="move-forward">
                  <LayerPanel
                    :featureLayer="featureLayer"
                    @update-style="updateStyle"
                  />
                </v-col>

                <v-col cols="12" sm="10">
                  <MapViewer
                    @update-featureLayer="updateFeatureLayer"
                    :styles="styles"
                  />
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

export default {
  components: {
    AppBar,
    MapViewer,
    StylingPanel,
    LayerPanel,
  },
  data() {
    return {
      rail: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.rail = false;
    }, 1000);
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
