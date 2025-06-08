<template>
  <v-app-bar flat elevation="1">
    <div>
      <v-img
        src="@/assets/logo.svg"
        width="50px"
        class="pa-2 ml-2 app-bar-logo"
        @click="refresh"
      />
    </div>

    <v-app-bar-title v-if="!isAuthenticated()">MapStyler</v-app-bar-title>

    <div v-if="isAuthenticated()" class="ml-4 d-flex flex-row">
      <v-btn
        color="black"
        size="small"
        @click="$router.push({ name: 'projects' })"
        :variant="$route.name === 'projects' ? 'text' : 'plain'"
        >projects</v-btn
      >
      <v-btn
        color="black"
        background
        size="small"
        @click="$router.push({ name: 'editor' })"
        :variant="$route.name === 'editor' ? 'text' : 'plain'"
        >editor</v-btn
      >
    </div>

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
        class="mr-4"
        flat
        @click="$router.push({ name: 'login' })"
        >login</v-btn
      >

      <AppBarMenu
        v-if="isAuthenticated()"
        :user="user_email"
        :logout="logout"
      />
    </template>
  </v-app-bar>
</template>

<script>
import AppBarMenu from "./AppBarMenu.vue";

// store
import { useAuthStore } from "@/store/auth.js";
import { useAppStore } from "@/store/app.js";
import { mapState, mapActions } from "pinia";

export default {
  components: {
    AppBarMenu,
  },

  computed: {
    ...mapState(useAuthStore, ["user_email"]),
    ...mapState(useAppStore, ["currentProject"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["logout", "isAuthenticated"]),
    refresh: function () {
      this.$router.push("/");
    },
  },
};
</script>

<style>
.app-bar-logo:hover {
  cursor: pointer;
}
</style>
