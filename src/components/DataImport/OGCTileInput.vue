<template>
  <div>
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
      <v-form>
        <v-text-field
          v-model="url"
          variant="outlined"
          density="comfortable"
          append-icon="mdi-web"
          class="mt-2"
          @update:modelValue="validateUrl"
          :error-messages="errorMessages"
          :rules="validationRules"
        ></v-text-field>
      </v-form>
    </div>

    <div v-if="showToggle" class="mt-1 mb-3">
      <div class="pb-3">Geometry type</div>
      <div class="d-flex flex-row justify-center">
        <v-btn-toggle
          v-model="geometry"
          density="compact"
          variant="outlined"
          @click="setGeometryManually"
          ><v-btn value="polygon">polygon</v-btn
          ><v-btn value="linestring">line</v-btn
          ><v-btn value="point">point</v-btn></v-btn-toggle
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["set-tilejson"],
  data() {
    return {
      url: null,
      errorMessages: [],
      validationRules: [(v) => !!v || "A URL to a vector tilejson is required"],
      validGoemetries: [
        "polygons",
        "polygon",
        "point",
        "line",
        "lines",
        "points",
      ],
      showToggle: false,
      geometry: null,
      tilejson: null,
    };
  },
  methods: {
    openUrl: function () {
      window.open(
        "https://github.com/codehub-rony/map-styler/wiki/OGC-API-%E2%80%90-Tiles",
        "_blank"
      );
    },
    validateUrl: function (url) {
      this.errorMessages = [];
      this.showToggle = false;
      fetch(`${url}?f=tilejson`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((tilejson) => {
          this.tilejson = tilejson;
          if (tilejson.vector_layers.length > 1) {
            this.errorMessages.push(
              "Tile provider has more than one vector layer. Mulitple vector layers are currently not supported"
            );
          } else if (
            !this.validGoemetries.includes(
              tilejson.vector_layers[0].geometry_type
            )
          ) {
            this.showToggle = true;
          } else {
            this.$emit("set-tilejson", { tilejson: tilejson, url: this.url });
          }
        })
        .catch(() => {
          this.errorMessages.push("The URL does not return a valid tilejson");
        });
    },

    setGeometryManually: function () {
      this.tilejson.vector_layers[0].geometry_type = this.geometry;
      this.$emit("set-tilejson", { tilejson: this.tilejson, url: this.url });
    },
  },
};
</script>

<style>
.beta-text-label {
  color: red;
}
</style>
