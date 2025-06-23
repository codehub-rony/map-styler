<template>
  <v-container class="container-content-landing">
    <v-row>
      <v-col
        ><v-sheet> <DataImportView /></v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DataImportView from "@/pages/DataImportPage";

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
