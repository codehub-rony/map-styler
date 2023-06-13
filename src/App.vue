<template>
  <v-app>
    <v-main>
      <v-app id="app_container">
        <AppBar />
        <v-main class="bg-grey-lighten-3">
          <v-container>
            <v-row dense>
              <v-col cols="12" sm="2">
                <v-sheet min-height="268">
                  <!--  -->
                </v-sheet>
              </v-col>

              <v-col cols="12" sm="8">
                <MapViewer />
              </v-col>

              <v-col cols="12" sm="2">
                <v-sheet min-height="268">
                  <!--  -->
                </v-sheet>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-app>
    </v-main>
  </v-app>
</template>

<script setup>
import AppBar from "@/components/AppBar.vue";
import MapViewer from "@/components/MapViewer.vue";
</script>
