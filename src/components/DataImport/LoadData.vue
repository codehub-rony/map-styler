<template>
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
              @click="selectedType = source.type"
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
        v-if="selectedType && hasGeometry"
      >
        <StyleNameInput @update-input="updateInput" />
        <GeoJSONInput
          v-if="selectedType === 'geojson'"
          @update-input="updateInput"
          ref="geoJSONInput"
        />

        <OGCTileInput
          v-if="selectedType === 'ogcvectortile' && hasGeometry"
          ref="ogcTileInput"
          @update-input="updateInput"
        />
      </div>
      <div class="d-flex flex-column" v-if="!hasGeometry">
        <span
          >We couldn't parse the geometry type. Please select geometry type of
          data</span
        >
        <v-btn-toggle v-model="manualGeomType"
          ><v-btn value="polygon">polygon</v-btn><v-btn value="line">line</v-btn
          ><v-btn value="point">point</v-btn></v-btn-toggle
        >
      </div>
    </v-form>
    <div class="d-flex flex-row">
      <v-btn flat @click="handleBackClick" :loading="loadingData" variant="text"
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
</template>

<script>
import GeojsonStyle from "@/utils/ldproxy/GeojsonStyle.js";
import OGCTileStyle from "@/utils/ldproxy/OGCTileStyle.js";
import OGCTileInput from "@/components/DataImport/OGCTileInput.vue";
import GeoJSONInput from "@/components/DataImport/GeoJSONInput.vue";
import StyleNameInput from "@/components/DataImport/StyleNameInput.vue";

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
      isOpen: false,
      selectedType: null,
      styleName: null,
      file: null,
      url: null,
      manualGeomType: null,
      hasGeometry: true,
      dataSources: [
        { type: "geojson", label: "GeoJSON" },
        { type: "ogcvectortile", label: "OGC Vectortile" },
      ],
      loading: false,
      loadingData: false,
    };
  },
  methods: {
    updateInput: function (input) {
      switch (input.var) {
        case "styleName":
          this.styleName = input.value;
          break;
        case "url":
          this.url = input.value;
          break;
        case "file":
          this.file = input.value;
          break;
        default:
          null;
      }
    },
    async validate() {
      this.loading = true;
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        let styleObject;
        let style_name = this.styleName.replace(" ", "_");

        if (this.selectedType === "geojson") {
          this.openFile().then((geojson) => {
            let json = JSON.parse(geojson);
            let geometry_type = json.features[0].geometry.type.toLowerCase();
            let source_id = style_name;

            styleObject = new GeojsonStyle(
              style_name,
              source_id,
              geometry_type,
              geojson
            );

            this.$emit("import-data", styleObject);
          });
        }

        if (this.selectedType === "ogcvectortile") {
          let tilejson;
          try {
            tilejson = await this.parseTileJSON(this.url);

            if (!tilejson.geometry_type && !this.manualGeomType) {
              this.hasGeometry = false;
            } else if (!tilejson.geometry_type && this.manualGeomType) {
              tilejson.geometry_type = this.manualGeomType;
              this.createTileStyleObject(tilejson, style_name);
            } else {
              this.createTileStyleObject(tilejson, style_name);
            }
          } catch (error) {
            this.$refs.ogcTileInput.errorMessages.push(error);
          }
        }
      }
    },
    createTileStyleObject: function (tilejson, style_name) {
      let styleObject = new OGCTileStyle(
        style_name,
        this.url,
        tilejson.source_id,
        tilejson.geometry_type,
        tilejson.tiles_url
      );
      this.$emit("import-data", styleObject);
    },

    isValidJSON: function (file) {
      try {
        JSON.parse(file);
      } catch (e) {
        return false;
      }
      return true;
    },
    parseTileJSON: async function (url) {
      const promise = new Promise((resolve, reject) => {
        fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((tilejson) => {
            if (tilejson.vector_layers.length > 1) {
              reject(
                "Tile provider has more than one vector layer. Mulitple vector layers are currently not supported"
              );
            }

            let geometry_type = tilejson.vector_layers[0].geometry_type
              ? tilejson.vector_layers[0].geometry_type.toLowerCase()
              : null;

            let meta_data = {
              geometry_type: geometry_type,
              source_id: tilejson.vector_layers[0].id,
              tiles_url: tilejson.tiles[0],
            };

            resolve(meta_data);
          }).catch(() => {
            this.$refs.ogcTileInput.errorMessages.push("The URL seems to be invalid. Data can not be loaded");
          });
      });

      return promise;
    },

    openFile: async function (e) {
      let reader = new FileReader();
      const promise = new Promise((resolve, reject) => {
        reader.readAsText(this.file["0"]);
        reader.onload = () => {
          if (this.isValidJSON(reader.result)) {
            this.loading = false;
            this.isOpen = false;

            resolve(reader.result);
          } else {
            this.$refs.geoJSONInput.messages.push(
              "Invalid JSON structrue. Could not parse the GeoJSON file"
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
