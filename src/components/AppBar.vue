<template>
  <v-app-bar flat>
    <div class="d-flex align-center">
      <v-img
        src="../assets/logo.svg"
        width="50px"
        class="pa-2 ml-2 app-bar-logo"
        @click="refresh"
      />
    </div>

    <v-app-bar-title class="d-sm-flex d-none">MapStyler</v-app-bar-title>

    <v-spacer></v-spacer>
    <v-btn
      color="#FFDD00"
      size="small"
      variant="flat"
      href="https://www.buymeacoffee.com/RonyNedkov"
      target="_blank"
      class="mr-4"
      ><span> &#9749; </span>Buy me a coffee</v-btn
    >
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
