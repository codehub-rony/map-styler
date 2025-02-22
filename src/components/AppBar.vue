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
    <div v-if="isAuthenticated()" class="ml-4">
      <v-btn
        color="black"
        size="small"
        @click="$router.push({ name: 'projects' })"
        >projects</v-btn
      >
      <v-btn
        color="black"
        size="small"
        @click="$router.push({ name: 'editor' })"
        >editor</v-btn
      >
      <v-btn variant="text" size="small" color="black">documentation</v-btn>
    </div>

    <v-app-bar-title class="d-sm-flex d-none" v-if="!isAuthenticated()"
      >MapStyler</v-app-bar-title
    >

    <v-spacer></v-spacer>
    <template v-slot:append>
      <v-btn
        v-if="!isAuthenticated()"
        icon="mdi-github"
        href="https://github.com/codehub-rony/map-styler"
        target="_blank"
      ></v-btn>
      <!-- <v-btn
        color="#FFDD00"
        size="small"
        variant="flat"
        href="https://www.buymeacoffee.com/RonyNedkov"
        target="_blank"
        class="mr-4"
        ><span> &#9749; </span>Buy me a coffee</v-btn
      > -->
      <v-btn
        v-if="!isAuthenticated()"
        variant="flat"
        rounded="0"
        color="primary"
        flat
        @click="$router.push({ name: 'login' })"
        >login</v-btn
      >
      <div v-if="isAuthenticated()" class="mr-3">
        <span>{{ this.user_email }}</span>
        <v-btn class="mr-3" size="small" variant="text" @click="handleLogout"
          >logout</v-btn
        >
      </div>
    </template>
  </v-app-bar>
</template>

<script>
// store
import { useAuthStore } from "@/store/auth.js";
import { mapState, mapActions } from "pinia";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(useAuthStore, ["user_email"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["logout", "isAuthenticated"]),
    refresh: function () {
      this.$router.push("/");
    },
    handleLogout: function () {
      this.logout();
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style>
.app-bar-logo:hover {
  cursor: pointer;
}
</style>
