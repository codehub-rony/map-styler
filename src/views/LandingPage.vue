<template>
  <v-main class="mx-auto">
    <v-container max-width="600">
      <v-row justify-content="center"
        ><v-col cols="12">
          <div class="mb-4 d-flex flex-column align-center">
            <v-img src="../assets/logo.svg" height="300px" class="pa-6" />
            <span class="text-h2 mt-4 font-weight-black">MapStyler</span>
          </div>
        </v-col></v-row
      ><v-row align-content="center"
        ><v-col cols="6" class="mx-auto test">
          <div class="d-flex flex-column justify-center">
            <span class="text-h6 mb-5 font-weight-light text-center"
              >A powerful tool to design styles for your vector geodata.
            </span>
          </div></v-col
        ></v-row
      ><v-row
        ><v-col cols="12">
          <div class="d-flex flex-column align-center">
            <v-btn
              color="primary"
              class="mt-5"
              size="large"
              flat
              @click="isOpen = true"
              :loading="loading"
              width="250"
              >create style</v-btn
            >

            <v-btn
              size="small"
              variant="plain"
              class="mt-3"
              @click="DownloadDemoData"
              >try out
            </v-btn>
          </div></v-col
        ></v-row
      >
      <v-divider class="mt-6"></v-divider>
    </v-container>
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
            <v-btn
              color="primary"
              block
              @click="validate"
              :loading="loadingData"
              >import</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-main>
</template>

<script>
export default {
  emits: ["load-datasource"],
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
          this.loading = false;
          this.isOpen = false;
          this.$emit("load-datasource", reader.result);
        } else {
          this.messages.push(
            "Invalid JSON structrue. Could not parse the GeoJSON file"
          );
        }
      };
    },
    async DownloadDemoData() {
      let url = "../assets/buildings.geojson";
      // "https://github.com/codehub-rony/mapbox-style-editor/blob/main/demo_data/states.geojson";
      let attr = {
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
      };

      const response = await fetch(url, attr);
      const jsonData = await response.json();

      this.$emit("load-datasource", JSON.stringify(jsonData));
    },
  },
};
</script>
<style>
.welcome-container {
  width: 100%;
}
.test {
  min-width: 550px;
}
</style>
