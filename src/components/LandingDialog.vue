<template>
  <v-dialog v-model="isOpen" max-width="400" persistent>
    <v-sheet>
      <v-container class="mb-4">
        <v-row justify-content="center" dense
          ><v-col cols="12">
            <div class="d-flex flex-column align-center">
              <v-img
                src="../assets/logo.svg"
                :class="{
                  'smaller-image-height': customData,
                  'default-image-height': !customData,
                }"
              />
              <div v-if="!customData" class="d-flex flex-column align-center">
                <span class="text-h5 mt-4 font-weight-black">MapStyler</span>
                <span class="text-h6 mt-4 font-weight-light text-center"
                  >A powerful tool to design styles for your vector geodata.
                </span>
              </div>
            </div>
          </v-col></v-row
        ><v-row v-if="!customData" dense class="mt-5"
          ><v-col cols="12">
            <div class="mt-4 d-flex flex-column align-center">
              <v-btn color="primary" flat @click="customData = true" width="250"
                >create style</v-btn
              >

              <v-btn
                size="small"
                variant="plain"
                class="mt-3"
                @click="loadDemoData()"
                >try out
              </v-btn>
            </div></v-col
          ></v-row
        >
        <v-row v-if="customData" dense
          ><v-col cols="12">
            <LoadData
              @import-data="handleImportData"
              @go-back="customData = false" /></v-col
        ></v-row>
      </v-container>
    </v-sheet>
  </v-dialog>
</template>
<script>
import LoadData from "@/components/DataImport/LoadData.vue";
import demo_data from "../assets/buildings.json";
import GeojsonStyle from "@/utils/ldproxy/GeojsonStyle.js";

export default {
  components: {
    LoadData,
  },
  emits: ["load-datasource"],
  data() {
    return {
      customData: false,
      isOpen: true,
    };
  },
  methods: {
    loadDemoData: function () {
      this.isOpen = false;
      let geometry_type = demo_data.features[0].geometry.type.toLowerCase();
      let styleObject = new GeojsonStyle(
        "buildings",
        "buildings",
        geometry_type,
        JSON.stringify(demo_data)
      );

      this.$emit("load-datasource", styleObject);
    },
    handleImportData: function (styleObject) {
      this.isOpen = false;
      this.$emit("load-datasource", styleObject);
    },
  },
};
</script>

<style>
.smaller-image-height {
  margin-top: 20px;
  margin-bottom: 10px;
  animation-name: shrink;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
}

.default-image-height {
  margin-top: 20px;
  margin-bottom: 10px;
  height: 200px;
}

@keyframes shrink {
  from {
    height: 200px;
  }
  to {
    height: 0px;
  }
}
.testy {
  display: hidden;
}
</style>
