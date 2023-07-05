<template>
  <v-app id="app_container">
    <AppBar />

    <v-main class="bg-grey-lighten-3 app-main-content-container">
      <router-view></router-view>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  components: {
    AppBar,
    AppFooter,
  },
  data() {
    return {
      geodata: { type: null, json: null },
      isOpen: true,
    };
  },
  methods: {
    handleData: function (geojson) {
      this.geodata = { type: "geojson", json: geojson };
    },
  },
};
</script>
