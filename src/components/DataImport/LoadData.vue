<template>
  <div>
    <div class="d-flex flex-column align-center">
      <div class="d-flex flex-row mb-5">
        <span class="text-h5 font-weight-light">{{ dialogTitle }}</span>
      </div>

      <div class="d-flex flex-row justify-center" v-if="!selectedType">
        <div v-for="(source, i) in dataSources" :key="i">
          <v-hover>
            <template v-slot:default="{ isHovering, props }">
              <v-card
                v-bind="props"
                :color="isHovering ? 'primary' : undefined"
                class="pa-4 ma-4 testy"
                rounded="1"
                flat
                @click="selectedType = source.id"
              >
                <h4>{{ source.label }}</h4>
              </v-card>
            </template>
          </v-hover>
        </div>
      </div>

      <v-form ref="form" class="form-container d-flex flex-row pa-4">
        <div
          class="d-flex flex-column form-input-item-container"
          v-if="selectedType"
        >
          <InputTextField
            v-model="stylename"
            :validationRules="['not_empty', 'only_char']"
          />

          <GeoJSONInput
            v-if="isGeoJsonSelected"
            @update-input="(item) => (fileInput = item.value)"
            ref="geoJSONInput"
          />

          <OGCTileInput
            v-if="isVectorTileSelected"
            @set-tilejson="this.tilejson = $event"
          />
        </div>
      </v-form>
      <div class="d-flex flex-row">
        <v-btn
          flat
          @click="handleBackClick"
          :loading="loadingData"
          variant="text"
          v-if="!$route.name === 'new-project'"
          >back</v-btn
        >
        <v-btn
          color="primary"
          flat
          @click="validate"
          :loading="loadingData"
          v-if="selectedType"
          >import</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import OGCTileInput from "@/components/DataImport/OGCTileInput.vue";
import GeoJSONInput from "@/components/DataImport/GeoJSONInput.vue";
import InputTextField from "@/components/GenericComponents/InputTextField.vue";

import OGCVectorTiles from "@/utils/datasources/OGCVectorTiles";
import GeoJSONFeatures from "@/utils/datasources/GeoJSONFeatures";

import { useAppStore } from "@/store/app.js";
import { mapActions } from "pinia";

export default {
  components: { InputTextField, OGCTileInput, GeoJSONInput },
  computed: {
    dialogTitle() {
      return this.selectedType ? "Import your data" : "Choose a data source";
    },
  },
  data() {
    return {
      fileInput: null,
      stylename: null,
      selectedType: null,
      dataSources: null,
      loading: false,
      loadingData: false,
      tilejson: null,
    };
  },
  computed: {
    isVectorTileSelected() {
      return this.selectedType === "ogc_vectortile";
    },
    isGeoJsonSelected() {
      return this.selectedType === "geojson";
    },
  },

  mounted() {
    this.dataSources = [
      { label: "GeoJSON", id: "geojson" },
      { label: "OGC Vectortile", id: "ogc_vectortile" },
    ];
  },
  methods: {
    ...mapActions(useAppStore, ["addStyleObject"]),
    async validate() {
      this.loading = true;
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        let styleObject;

        if (this.selectedType === "geojson") {
          this.openFile().then((geojson) => {
            styleObject = new GeoJSONFeatures(this.stylename, geojson);
            this.loadStyleJson(styleObject);
          });
        }

        if (this.selectedType === "ogc_vectortile" && this.tilejson) {
          let styleObject = new OGCVectorTiles(
            this.tilejson.url,
            this.tilejson.tilejson,
            this.stylename
          );

          this.loadStyleJson(styleObject);
        }
      }
    },

    loadStyleJson: function (styleObject) {
      this.addStyleObject(styleObject);
      this.$router.push("/editor");
    },

    // Move this function to GeoJsoninput
    isValidJSON: function (file) {
      try {
        JSON.parse(file);
      } catch (e) {
        return false;
      }
      return true;
    },

    openFile: async function (e) {
      let reader = new FileReader();
      const promise = new Promise((resolve, reject) => {
        reader.readAsText(this.fileInput);
        reader.onload = () => {
          if (this.isValidJSON(reader.result)) {
            this.loading = false;

            resolve(reader.result);
          } else {
            this.$refs.geoJSONInput.messages.push(
              "Invalid JSON structure. Could not parse the GeoJSON file"
            );

            reject();
          }
        };
      });

      return promise;
    },
    handleBackClick: function () {
      if (this.selectedType) {
        this.selectedType = null;
      } else {
        this.$emit("go-back");
      }
    },
  },
};
</script>
<style>
.form-container {
  width: 100%;
  max-width: 500px;
}
.form-input-item-container {
  width: 100%;
}

.form-input-item-label {
  width: 30%;
  margin-top: 5px;
}

.testy {
  border: solid 1px lightgrey !important;
}
</style>
