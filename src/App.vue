<template>
  <v-app id="app_container">
    <AppBar />
    <!-- <v-main class="bg-grey-lighten-3"> -->
    <v-main>
      <router-view></router-view>
      <!-- <AppFooter /> -->
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import AppFooter from "@/components/AppFooter.vue";

// store
import { useAppStore } from "@/store/app.js";
import { mapActions } from "pinia";

export default {
  components: {
    AppBar,
    AppFooter,
  },
  mounted() {
    let mapstyler_user = localStorage.getItem("mapstyler_user");
    console.log(mapstyler_user);

    if (mapstyler_user) {
      this.setUser(JSON.parse(mapstyler_user));
    }
  },
  methods: {
    ...mapActions(useAppStore, ["setUser"]),
  },
};
</script>
