<template>
  <span>GeoJSON file</span>
  <v-file-input
    v-model="file"
    :rules="validationRules"
    variant="outlined"
    density="comfortable"
    accept="application/geojson"
    validate-on="submit-lazy"
    append-icon="mdi-paperclip"
    prepend-icon
    :error-messages="errorMessages"
    @update:focused="messages = []"
    @change="update"
    class="mt-2"
  ></v-file-input>
</template>

<script>
export default {
  emits: ["update-input"],
  data() {
    return {
      file: null,
      errorMessages: [],
      validationRules: [
        (v) => !!v || "Select a file",
        (v) =>
          (v && v.name.endsWith(".geojson")) ||
          "Currently we only support GeoJSON",
      ],
    };
  },
  methods: {
    update: function () {
      this.$emit("update-input", { var: "file", value: this.file });
    },
  },
};
</script>

<style></style>
