<template>
  <v-dialog v-model="isOpen" max-width="400" persistent>
    <v-sheet>
      <v-container class="mb-4">
        <v-row>
          <v-col>
            <div class="d-flex flex-row mb-5">
              <span class="text-h5 font-weight-light">Add tilejson</span>
            </div>
          </v-col>
        </v-row>
        <v-row dense
          ><v-col cols="12">
            <div class="d-flex flex-column form-input-item-container">
              <InputTextField
                v-model="styleName"
                :validationRules="['not_empty', 'only_char']"
              />
              <OGCTileInput @set-tilejson="setTilejson" />
            </div>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="auto" class="text-center">
            <ButtonGroup @confirm="createTileJson" @decline="closeDialog" />
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-dialog>
</template>

<script>
import ButtonGroup from "@/components/DataImport/ButtonGroup.vue";
import OGCTileInput from "@/components/DataImport/OGCTileInput.vue";
import InputTextField from "@/components/GenericComponents/InputTextField.vue";

import OGCVectorTiles from "@/utils/datasources/OGCVectorTiles";

// store
import { useAppStore } from "@/store/app.js";
import { mapActions } from "pinia";

export default {
  components: {
    ButtonGroup,
    OGCTileInput,
    InputTextField,
  },
  data() {
    return {
      isOpen: false,
      styleName: null,
      tilejson: null,
    };
  },

  methods: {
    ...mapActions(useAppStore, ["addStyleObject"]),
    createTileJson() {
      if (this.tilejson && this.styleName) {
        let styleObject = new OGCVectorTiles(
          this.tilejson.url,
          this.tilejson.tilejson,
          this.styleName,
          null
        );

        this.addStyleObject(styleObject);

        this.closeDialog();
      }
    },
    setTilejson: function (tilejson) {
      this.tilejson = tilejson;
    },
    openDialog() {
      this.isOpen = true;
    },
    closeDialog() {
      this.styleName = null;
      this.tilejson = null;
      this.isOpen = false;
    },
  },
};
</script>
