<template>
  <v-app-bar flat>
    <div class="d-flex align-center">
      <v-img
        src="@/assets/asset 3.svg"
        width="50px"
        class="pa-2 ml-2 app-bar-logo"
        @click="refresh"
      />
    </div>
    <v-container class="fill-height d-flex align-center ma-0">
      <v-app-bar-title>MapStyler</v-app-bar-title>

      <v-spacer></v-spacer>
      <v-btn
        color="#FFDD00"
        size="small"
        variant="flat"
        href="https://www.buymeacoffee.com/RonyNedkov"
        target="_blank"
        ><span> &#9749; </span>Buy me a coffee</v-btn
      >
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    refresh: function () {
      window.location.href = "/";
    },
  },
};
</script>

<style>
.app-bar-logo:hover {
  cursor: pointer;
}
</style>
