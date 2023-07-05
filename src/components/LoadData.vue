<template>
  <div class="mb-4 d-flex flex-column align-center">
    <div class="d-flex flex-row">
      <span class="text-h5 font-weight-light">Import your data</span>
    </div>

    <v-form ref="form" class="form-container d-flex flex-row mt-5">
      <div class="d-flex flex-column form-input-item-container">
        <div class="d-flex flex-row">
          <span class="mr-3 form-input-item-label">style name</span>

          <v-text-field
            variant="outlined"
            :rules="nameRules"
            density="compact"
            v-model="layerName"
          ></v-text-field>
        </div>
        <div class="d-flex flex-row">
          <span class="mr-3 form-input-item-label">file</span>
          <v-file-input
            v-model="file"
            :rules="fileRules"
            variant="outlined"
            density="compact"
            accept="application/geojson"
            validate-on="submit-lazy"
            append-icon="mdi-paperclip"
            prepend-icon
            :error-messages="messages"
            @update:focused="messages = []"
          ></v-file-input>
        </div>
      </div>
    </v-form>
    <span class="text-caption mb-6"> Currently we only support GeoJSON</span>

    <v-btn
      color="primary"
      size="large"
      flat
      @click="validate"
      :loading="loadingData"
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
        (v) => v[0].name.includes(".geojson") || "File is not a geojson",
      ],
      nameRules: [(v) => !!v || "A name for you style is required"],
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
  width: 400px;
}
.form-input-item-container {
  width: 100%;
}

.form-input-item-label {
  width: 20%;
  margin-top: 5px;
}
</style>
