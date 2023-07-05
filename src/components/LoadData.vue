<template>
  <div class="mb-4 d-flex flex-column align-center">
    <div class="d-flex flex-row">
      <span class="text-h5 font-weight-light text-center"
        >Import your data</span
      >
    </div>

    <v-form ref="form" class="form-container">
      <v-file-input
        v-model="file"
        :rules="rules"
        variant="outlined"
        density="compact"
        class="mt-5"
        accept="application/geojson"
        validate-on="submit-lazy"
        :error-messages="messages"
        @update:focused="messages = []"
      ></v-file-input>
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
          this.$emit("open-file", JSON.parse(reader.result));
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
</style>
