<template>
  <v-container class="container-content-landing">
    <v-row>
      <v-col
        ><v-sheet> <DataImportView /></v-sheet>
        <v-col>
          <v-divider></v-divider>
          <v-img
            height="600"
            class="mt-7"
            elevation="2"
            src="@/assets/landing_page.png"
          />
          <v-divider></v-divider>
        </v-col>
      </v-col>
    </v-row>
    <v-row> </v-row>
  </v-container>
</template>

<script>
import DataImportView from "@/views/DataImportView";

export default {
  components: {
    DataImportView,
  },
};
</script>

<style>
.container-content-landing {
  margin-top: 100px;
}
</style>
