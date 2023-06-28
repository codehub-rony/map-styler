<template>
  <v-sheet class="pa-4">
    <div class="d-flex justify-center mb-4">
      <v-img src="@/assets/asset 3.svg" height="200px" class="pa-6" />
    </div>
    <h3 class="mb-3">Welcome to bla</h3>
    <span class="text-body-2 mb-5"
      >Use this tool to quickly create styles for your Vector Tiles based on the
      Mapbox Style Specification. Create your own style by importing data,
      styling it as you want and export it to JSON. <br /><br />
      Curiuous to quickly see how it works? Hit the try button to load a demo
      dataset</span
    >

    <v-btn
      color="primary"
      class="mt-5"
      flat
      block
      @click="isOpen = true"
      :loading="loading"
      >create style</v-btn
    >
    <div class="d-flex justify-center">
      <v-btn size="small" variant="plain" class="mt-3" @click="DownloadDemoData"
        >try out
      </v-btn>
    </div>
  </v-sheet>

  <div class="text-center">
    <v-dialog v-model="isOpen" width="500">
      <v-card rounded="0">
        <v-card-title>Create style</v-card-title>
        <v-card-text class="text-body-2">
          Import a file with data. Currently we only support GeoJSON.
          <v-form ref="form">
            <v-file-input
              v-model="file"
              :rules="rules"
              variant="outlined"
              density="compact"
              class="mt-5"
              accept="application/geojson"
              validate-on="submit-lazy"
              id="best"
              :error-messages="messages"
              @update:focused="messages = []"
            ></v-file-input>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="validate" :loading="loadingData"
            >import</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  emits: ["datasource-added"],
  data() {
    return {
      isOpen: false,
      file: null,
      geojson: null,
      loading: false,
      rules: [
        (v) => !!v || "Select a file",
        (v) => v[0].name.includes(".geojson") || "File is not a geojson",
      ],
      messages: [],
      color: "#adced2",
      loadingData: false,
    };
  },
  methods: {
    async validate() {
      this.loading = true;
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        this.openFile();
      }
    },

    isValidJSON: function (file) {
      try {
        JSON.parse(file);
      } catch (e) {
        return false;
      }
      return true;
    },

    openFile: function (e) {
      var reader = new FileReader();
      reader.readAsText(this.file["0"]);
      reader.onload = () => {
        if (this.isValidJSON(reader.result)) {
          this.geojson = reader.result;
        } else {
          this.messages.push(
            "Invalid JSON structrue. Could not parse the GeoJSON file"
          );
        }
      };
    },
    async DownloadDemoData() {
      let url = "../../demo_data/buildings.geojson";
      // "https://github.com/codehub-rony/mapbox-style-editor/blob/main/demo_data/states.geojson";
      let attr = {
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
      };

      const response = await fetch(url, attr);

      const jsonData = await response.json();

      this.$emit("datasourceAdded", jsonData);
    },
  },
  watch: {
    geojson(geojson) {
      this.$emit("datasourceAdded", geojson);
      this.loading = false;
      this.isOpen = false;
    },
  },
};
</script>
<style>
.welcome-container {
  width: 100%;
}
</style>
