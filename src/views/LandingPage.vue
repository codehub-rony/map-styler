<template>
  <v-container class="container-content-landing">
    <v-row>
      <v-col
        ><v-sheet height="200"> <StartMenuView /></v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import StartMenuView from "@/views/StartMenuView";

export default {
  components: {
    StartMenuView,
  },
};
</script>

<style>
.container-content-landing {
  margin-top: 100px;
}
</style>
