<template>
  <v-container class="container-content-landing">
    <v-row>
      <v-col
        ><v-sheet height="200"> <DataImportView /></v-sheet>
      </v-col>
    </v-row>
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
