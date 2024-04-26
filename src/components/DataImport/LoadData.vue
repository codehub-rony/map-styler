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
                @click="selectedType = source"
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
          <StyleNameInput
            @update-input="
              (item) => (inputs[item.var] = item.value.replace(' ', ''))
            "
          />
          <GeoJSONInput
            v-if="isGeoJsonSelected()"
            @update-input="(item) => (inputs[item.var] = item.value)"
            ref="geoJSONInput"
          />

          <OGCTileInput
            v-if="isVectorTileSelected()"
            @set-tilejson="setTilejson"
          />
        </div>
      </v-form>
      <div class="d-flex flex-row">
        <v-btn
          flat
          @click="handleBackClick"
          :loading="loadingData"
          variant="text"
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
import GeojsonStyle from "@/utils/ldproxy/GeojsonStyle.js";
import OGCTileStyle from "@/utils/ldproxy/OGCTileStyle.js";
import OGCTileInput from "@/components/DataImport/OGCTileInput.vue";
import GeoJSONInput from "@/components/DataImport/GeoJSONInput.vue";
import StyleNameInput from "@/components/DataImport/StyleNameInput.vue";

import {
  DataSourceTypes,
  GeojsonDataSource,
  VectorTileDataSource,
} from "@/utils/datasources/DataSourceTypes";

export default {
  emits: ["import-data"],
  components: { StyleNameInput, OGCTileInput, GeoJSONInput },
  computed: {
    dialogTitle() {
      return this.selectedType ? "Import your data" : "Choose a data source";
    },
  },
  data() {
    return {
      inputs: { styleName: null, file: null },
      selectedType: null,
      dataSources: null,
      loading: false,
      loadingData: false,
      tilejson: null,
    };
  },
  mounted() {
    this.dataSources = new DataSourceTypes().getDataSources();
  },
  methods: {
    isVectorTileSelected: function () {
      return this.selectedType instanceof VectorTileDataSource;
    },
    isGeoJsonSelected: function () {
      return this.selectedType instanceof GeojsonDataSource;
    },
    async validate() {
      this.loading = true;
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        let styleObject;

        if (this.selectedType instanceof GeojsonDataSource) {
          this.openFile().then((geojson) => {
            let json = JSON.parse(geojson);
            // move geometry-Type to class
            let geometry_type = json.features[0].geometry.type.toLowerCase();
            let source_id = this.inputs.styleName;

            styleObject = new GeojsonStyle(
              this.inputs.styleName,
              source_id,
              geometry_type,
              geojson,
              this.selectedType
            );

            this.$emit("import-data", styleObject);
          });
        }

        if (
          this.selectedType instanceof VectorTileDataSource &&
          this.tilejson
        ) {
          this.createTileStyleObject(this.tilejson, this.inputs.styleName);
        }
      }
    },
    setTilejson: function (tilejson) {
      this.tilejson = tilejson;
    },
    //consider movig this to OGCTileINput component. Requires passing style_name as prop
    createTileStyleObject: function (tilejson, style_name) {
      let styleObject = new OGCTileStyle(
        style_name,
        tilejson.url,
        tilejson.source_id,
        tilejson.vector_layers[0].geometry_type,
        tilejson.tiles_url
      );
      this.$emit("import-data", styleObject);
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
        reader.readAsText(this.inputs.file["0"]);
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
