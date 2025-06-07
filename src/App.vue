<template>
  <v-app>
    <AppBar />

    <!-- <v-main class="bg-grey-lighten-3"> -->
    <v-main>
      <router-view></router-view>
      <!-- <AppFooter /> -->
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar/AppBar.vue";
import AppFooter from "@/components/AppFooter.vue";

// store
import { useAuthStore } from "@/store/auth.js";
import { mapActions } from "pinia";

export default {
  components: {
    AppBar,
    AppFooter,
  },
  mounted() {
    let mapstyler_user = localStorage.getItem("mapstyler_user");
    if (mapstyler_user) {
      this.setUser(JSON.parse(mapstyler_user));
    }
  },
  methods: {
    ...mapActions(useAuthStore, ["setUser"]),
  },
};
</script>
