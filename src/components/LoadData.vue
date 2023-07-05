<template>
  <div class="mb-4 d-flex flex-column align-center">
    <div class="d-flex flex-row">
      <span class="text-h5 font-weight-light">Import your data</span>
    </div>

    <v-form ref="form" class="form-container d-flex flex-row mt-5 pa-4">
      <div class="d-flex flex-column form-input-item-container">
        <v-text-field
          variant="outlined"
          :rules="nameRules"
          density="comfortable"
          v-model="layerName"
          label="Style name"
          class="mb-2"
        ></v-text-field>

        <v-file-input
          v-model="file"
          :rules="fileRules"
          variant="outlined"
          density="comfortable"
          accept="application/geojson"
          validate-on="submit-lazy"
          append-icon="mdi-paperclip"
          label="GeoJSON file"
          prepend-icon
          :error-messages="messages"
          @update:focused="messages = []"
        ></v-file-input>
      </div>
    </v-form>

    <v-btn color="primary" flat @click="validate" :loading="loadingData"
      >import</v-btn
    >
  </div>
</template>

<script>
export default {
  emits: ["open-file"],
  data() {
    return {
      isOpen: false,
      file: null,
      geojson: null,
      layerName: null,
      loading: false,
      fileRules: [
        (v) => !!v || "Select a file",
        (v) =>
          v[0].name.includes(".geojson") || "Currently we only support GeoJSON",
      ],
      nameRules: [
        (v) => !!v || "A name for you style is required",
        (v) => /^[a-zA-Z]+$/.test(v) || "Name can only contain characters",
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

          let jsonObject = JSON.parse(reader.result);
          jsonObject["name"] = this.layerName.replace(" ", "_");
          this.$emit("open-file", jsonObject);
        } else {
          this.messages.push(
            "Invalid JSON structrue. Could not parse the GeoJSON file"
          );
        }
      };
    },
  },
};
</script>
<style>
.form-container {
  width: 100%;
}
.form-input-item-container {
  width: 100%;
}

.form-input-item-label {
  width: 30%;
  margin-top: 5px;
}
</style>
