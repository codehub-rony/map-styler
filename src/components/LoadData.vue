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
        <div class="d-flex flex-column align-center">
          <p class="mt-2 mb-1">Choose datasource</p>

          <v-btn-toggle
            density="compact"
            v-model="dataType"
            rounded="0"
            color="primary"
            group
            variant="text"
            class="ma-2 mb-4"
          >
            <v-btn value="geojson"> GeoJSON </v-btn>

            <v-btn value="ogcvectortile"> OGC Vectorile URL </v-btn>
          </v-btn-toggle>
        </div>

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
          v-if="dataType === 'geojson'"
        ></v-file-input>
        <v-text-field
          v-model="url"
          variant="outlined"
          density="comfortable"
          validate-on="submit-lazy"
          append-icon="mdi-web"
          label="url"
          prepend-icon
          :error-messages="messages"
          v-if="dataType === 'ogcvectortile'"
        ></v-text-field>
      </div>
    </v-form>

    <v-btn color="primary" flat @click="validate" :loading="loadingData"
      >import</v-btn
    >
  </div>
</template>

<script>
import StyleJSON from "../utils/StyleJSON.js";

export default {
  emits: ["import-data"],
  data() {
    return {
      isOpen: false,
      dataType: "ogcvectortile",
      file: null,
      url: "http://localhost:7080/rest/services/schiphol/collections/ctr/tiles/WebMercatorQuad/",
      layerName: "ctr",
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
      loadingData: false,
    };
  },
  methods: {
    async validate() {
      this.loading = true;
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        let styleObject;
        let style_name = this.layerName.replace(" ", "_");

        if (this.dataType === "geojson") {
          this.openFile().then((geojson) => {
            let json = JSON.parse(geojson);
            let geometry_type = json.features[0].geometry.type.toLowerCase();
            let source_id = style_name;

            styleObject = new StyleJSON.GeojsonStyle(
              style_name,
              source_id,
              geometry_type,
              geojson
            );

            this.$emit("import-data", styleObject);
          });
        }

        if (this.dataType === "ogcvectortile") {
          let tilejson = await this.parseTileJSON();
          styleObject = new StyleJSON.OGCTileStyle(
            style_name,
            this.url,
            tilejson.source_id,
            tilejson.geometry_type
          );

          this.$emit("import-data", styleObject);
        }
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
    parseTileJSON: async function () {
      const promise = new Promise((resolve, reject) => {
        fetch(`${this.url}?f=tilejson`)
          .then((res) => res.json())
          .then((tilejson) => {
            if (tilejson.vector_layers.length > 1) {
              throw new Error(
                "Tile provider as more than one vector layer. Mulitple vector layers are currently not supported"
              );
            }

            let meta_data = {
              geometry_type:
                tilejson.vector_layers[0].geometry_type.toLowerCase(),
              source_id: tilejson.vector_layers[0].id,
            };

            resolve(meta_data);
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
            this.messages.push(
              "Invalid JSON structrue. Could not parse the GeoJSON file"
            );
            reject();
          }
        };
      });

      return promise;
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
