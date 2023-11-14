<template>
  <div>
    <div class="d-flex justify-center pb-3">
      <v-btn
        class="mt-2"
        elevation="0"
        variant="outlined"
        rounded="0"
        size="small"
        @click="openDialog"
        >create filter
      </v-btn>
    </div>
    <v-dialog persistent v-model="dialog" width="400">
      <v-card>
        <v-card-title class="text-h6 font-weight-light"
          >New filter</v-card-title
        >
        <v-card-text>
          <div class="d-flex flex-column">
            <span class="text-body-2 font-weight-bold pb-1">Label</span>
            <v-text-field
              v-model="label"
              :error-messages="messages"
              variant="outlined"
              density="compact"
              @update:modelValue="messages = []"
            ></v-text-field>
          </div>

          <div
            class="mt-4 text-body-2 font-weight-bold pb-1"
            v-if="conditions.length > 0"
          >
            Conditions
          </div>

          <ConditionCreator
            v-for="(condition, i) in conditions"
            :key="i"
            :filter="condition"
            :attributes="attributes"
            @update-condition="updateCondition"
            @remove-condition="removeCondition"
          />
          <div class="d-flex justify-end mt-1">
            <v-btn flat size="x-small" rounded="0" @click="createCondition"
              >add condition</v-btn
            >
          </div>
        </v-card-text>
        <v-divider class="mt-3"></v-divider>
        <div class="d-flex flex-row justify-center pa-4">
          <v-btn variant="text" size="small" rounded="0" @click="dialog = false"
            >cancel</v-btn
          >
          <v-btn color="primary" size="small" flat rounded="0" @click="create"
            >create</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import InputField from "@/components/LayerList/InputField.vue";
import ColorField from "@/components/LayerList/ColorField.vue";
import ConditionCreator from "./ConditionCreator.vue";

// utils
import utils from "@/utils/utils.js";

export default {
  components: {
    InputField,
    ColorField,
    ConditionCreator,
  },
  props: {
    styleObject: Object,
  },
  data() {
    return {
      isClicked: 0,
      dialog: false,
      label: null,
      messages: [],
      conditions: [],
      attributes: [],
    };
  },
  methods: {
    openDialog: async function () {
      this.dialog = true;
      this.attributes = await this.styleObject.getFeatureAttributes();
      this.createCondition();
    },
    createCondition: function () {
      let filter = { id: 0, condition: ["==", null, null] };

      if (this.conditions.length > 0) {
        filter.id = this.conditions[this.conditions.length - 1].id + 1;
        filter.condition[1] =
          this.conditions[this.conditions.length - 1].condition[1];
      }
      this.conditions.push(filter);
    },
    updateCondition: function (update) {
      let index = this.conditions.findIndex((x) => x.id === update.id);
      this.conditions[index].condition = update.condition;
    },
    removeCondition: function (condition) {
      this.conditions.forEach((item, i) => {
        if (item.id === condition.id) {
          this.conditions.splice(i, 1);
        }
      });
    },
    createFilterArray: function () {
      let filter = ["all"];

      this.conditions.forEach((condition) => {
        filter.push(condition.condition);
      });

      return filter;
    },
    create: function () {
      if (this.label) {
        let filter = this.createFilterArray();
        let layer_id = utils.generateId();

        this.styleObject.addFilter(layer_id, this.label, filter);
        this.closeAndResetDialog();
      } else {
        this.messages.push("required field");
      }
    },
    closeAndResetDialog: function () {
      this.conditions = [];
      this.label = "";
      this.dialog = false;
    },

    deleteLayer: function (layer) {
      this.styleObject.deteLayer(layer.id)
    },
  },
};
</script>
<style></style>
