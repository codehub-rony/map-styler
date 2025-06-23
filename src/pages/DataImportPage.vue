<template>
  <div>
    <v-sheet>
      <v-container class="mb-4">
        <v-row justify-content="center" dense
          ><v-col cols="12">
            <div class="d-flex flex-column align-center">
              <v-img src="../assets/logo.svg" class="default-image-height" />
              <div v-if="!customData" class="d-flex flex-column align-center">
                <span class="text-h5 mt-4 font-weight-black">MapStyler</span>
                <span class="text-h6 mt-4 font-weight-light text-center"
                  >A powerful tool to design styles for your vector geodata.
                </span>
              </div>
            </div>
          </v-col></v-row
        ><v-row v-if="!customData" justify-content="center" dense class="mt-5"
          ><v-col cols="12">
            <div class="mt-4 d-flex flex-column align-center">
              <v-btn
                color="primary"
                flat
                rounded="0"
                @click="customData = true"
                width="250"
                >create style</v-btn
              >

              <v-btn
                size="small"
                variant="plain"
                class="mt-3"
                @click="loadDemoData()"
                :loading="loading"
                >try out
              </v-btn>
            </div></v-col
          ></v-row
        >
        <v-row v-if="customData" dense justify-content="center"
          ><v-col cols="12">
            <LoadData
              @import-data="handleLoadData"
              @go-back="customData = false" /></v-col
        ></v-row>
        <v-row v-if="!customData">
          <v-col>
            <v-divider></v-divider>
            <v-img
              height="600"
              class="mt-7"
              elevation="2"
              src="@/assets/landing_page.png"
            />
            <v-divider></v-divider> </v-col
        ></v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<script>
import demo_data from "../assets/municipalities.json";
import LoadData from "@/components/DataImport/LoadData.vue";

import GeoJSONFeatures from "@/utils/datasources/GeoJSONFeatures";

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
      loading: false,
    };
  },
  methods: {
    ...mapActions(useAppStore, ["addStyleObject"]),
    loadDemoData: function () {
      this.loading = true;
      setTimeout(() => {
        let styleObject = new GeoJSONFeatures("Municipalities", demo_data);

        this.handleLoadData(styleObject);
      }, 100);
    },
    handleLoadData: function (styleObject) {
      this.addStyleObject(styleObject);
      this.$router.push("/editor");
    },
  },
};
</script>

<style>
.default-image-height {
  height: 200px;
  width: 200px;
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
