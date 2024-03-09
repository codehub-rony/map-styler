<template>
  <div>
    <v-sheet>
      <v-container class="mb-4">
        <v-row justify-content="center" dense
          ><v-col cols="12">
            <div class="d-flex flex-column align-center">
              <v-img
                src="../assets/logo.svg"
                height="200"
                class="default-image-height"
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
              @import-data="handleLoadData"
              @go-back="customData = false" /></v-col
        ></v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<script>
import demo_data from "../assets/buildings.json";
import GeojsonStyle from "@/utils/ldproxy/GeojsonStyle.js";
import LoadData from "@/components/DataImport/LoadData.vue";

// store
import { useAppStore } from "@/store/app.js";
import { mapActions } from "pinia";

export default {
  components: {
    LoadData,
  },
  data() {
    return {
      customData: false,
      isOpen: true,
    };
  },
  methods: {
    ...mapActions(useAppStore, ["setStyleObject"]),
    loadDemoData: function () {
      let geometry_type = demo_data.features[0].geometry.type.toLowerCase();
      let styleObject = new GeojsonStyle(
        "buildings",
        "buildings",
        geometry_type,
        JSON.stringify(demo_data)
      );

      this.handleLoadData(styleObject);
    },
    handleLoadData: function (styleObject) {
      this.setStyleObject(styleObject);
      this.$router.push("/editor");
    },
  },
};
</script>
