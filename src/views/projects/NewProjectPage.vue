<template>
  <v-container width="500">
    <v-row class="justify-center">
      <v-col cols="6">
        <h2>New project</h2>
      </v-col>
    </v-row>
    <v-row class="justify-center"
      ><v-col cols="6"><LoadData /></v-col
    ></v-row>
  </v-container>
</template>
<script>
import LoadData from "@/components/DataImport/LoadData.vue";
export default {
  components: {
    LoadData,
  },
};
</script>
<style></style>
