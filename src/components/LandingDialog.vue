<template>
  <v-dialog v-model="isOpen" width="600" persistent>
    <v-sheet>
      <v-container max-width="600" class="mb-6">
        <v-row justify-content="center" dense
          ><v-col cols="12">
            <div class="mb-4 d-flex flex-column align-center">
              <v-img
                src="../assets/logo.svg"
                :class="{
                  'smaller-image-height': customData,
                  'default-image-height': !customData,
                }"
              />
              <div v-if="!customData" class="d-flex flex-column align-center">
                <span class="text-h4 mt-4 font-weight-black">MapStyler</span>
                <span class="text-h6 mt-4 font-weight-light text-center"
                  >A powerful tool to design styles for your vector geodata.
                </span>
              </div>
            </div>
          </v-col></v-row
        ><v-row v-if="!customData" dense
          ><v-col cols="12">
            <div class="d-flex flex-column align-center mt-3">
              <v-btn
                color="primary"
                size="large"
                flat
                @click="customData = true"
                width="250"
                >create style</v-btn
              >

              <v-btn
                size="small"
                variant="plain"
                class="mt-3"
                @click="load_demo_data()"
                >try out
              </v-btn>
            </div></v-col
          ></v-row
        >
        <v-row v-if="customData" dense
          ><v-col cols="12"> <LoadData @open-file="load_file_data" /></v-col
        ></v-row>
      </v-container>
    </v-sheet>
  </v-dialog>
</template>
<script>
import LoadData from "@/components/LoadData.vue";
import jsonObject from "../assets/buildings.json";
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
    load_demo_data: function () {
      this.isOpen = false;
      this.$emit("load-datasource", jsonObject);
    },
    load_file_data: function (jsonObject) {
      this.isOpen = false;
      this.$emit("load-datasource", jsonObject);
    },
  },
};
</script>

<style>
.smaller-image-height {
  margin: 20px;
  animation-name: shrink;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
}

.default-image-height {
  margin: 20px;
  height: 260px;
}

@keyframes shrink {
  from {
    height: 260px;
  }
  to {
    height: 130px;
  }
}
</style>
