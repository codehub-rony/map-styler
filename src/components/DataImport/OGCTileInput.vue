<template>
  <div>
    <span
      >OGC Vectortile URL
      <v-tooltip text="Click for more information on github">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            density="compact"
            size="small"
            icon="mdi-information-outline"
            flat
            class="mb-1"
            @click="openUrl"
          ></v-btn>
        </template> </v-tooltip
      ><span class="text-caption beta-text-label ml-1">beta</span></span
    >
    <v-text-field
      v-model="url"
      variant="outlined"
      density="comfortable"
      validate-on="submit-lazy"
      append-icon="mdi-web"
      class="mt-2"
      @change="update"
      :error-messages="errorMessages"
      :rules="validationRules"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  emits: ["update-input"],
  data() {
    return {
      url: null,
      errorMessages: [],
      validationRules: [(v) => !!v || "A URL to a tile provider is required"],
    };
  },
  methods: {
    openUrl: function () {
      window.open(
        "https://github.com/codehub-rony/map-styler/wiki/OGC-API-%E2%80%90-Tiles",
        "_blank"
      );
    },
    update: function () {
      this.$emit("update-input", { var: "url", value: this.url });
    },
    clearErrorMessages: function () {
      this.errorMessages = [];
    },
    addErrorMessage: function (error) {
      this.errorMessages.push(error);
    },
  },
};
</script>

<style>
.beta-text-label {
  color: red;
}
</style>
