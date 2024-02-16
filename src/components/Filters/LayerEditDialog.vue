<template>
  <div>
    <v-dialog persistent v-model="dialogIsOpen" width="400">
      <v-card>
        <v-card-title class="text-h6 font-weight-light">{{
          title
        }}</v-card-title>
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
            v-if="filter.conditions.length > 0"
          >
            Conditions
          </div>

          <LayerCondition
            v-for="condition in filter.conditions"
            :key="condition.getId()"
            :condition="condition"
            :attributes="attributes"
            @update-condition="updateCondition"
            @delete-condition="deleteCondition"
          />
          <div class="d-flex justify-end mt-1">
            <v-btn flat size="x-small" rounded="0" @click="createCondition"
              >add condition</v-btn
            >
          </div>
        </v-card-text>
        <v-divider class="mt-3"></v-divider>
        <div class="d-flex flex-row justify-center pa-4">
          <v-btn
            variant="text"
            size="small"
            rounded="0"
            @click="dialogIsOpen = false"
            >cancel</v-btn
          >
          <v-btn color="primary" size="small" flat rounded="0" @click="save"
            >save</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import LayerCondition from "./LayerCondition.vue";

export default {
  emits: ["add-layer"],
  components: {
    LayerCondition,
  },
  data() {
    return {
      dialogIsOpen: false,
      mode: "new",
      modes: { new: 1, edit: 2 },
      label: null,
      messages: [],
      filter: [],
      attributes: [],
    };
  },
  computed: {
    title: function () {
      return this.mode === 1 ? "Create new layer" : "Edit layer";
    },
  },
  methods: {
    openDialog: async function (layer, attributes, mode) {
      this.layer = layer;
      this.attributes = attributes;
      this.mode = this.modes[mode];
      this.dialogIsOpen = true;

      if (this.mode === 1) {
        this.label = null;
        this.filter = this.layer.createFilter();
      }

      if (this.mode === 2) {
        this.label = this.layer.label;
      }
    },
    createCondition: function () {
      this.filter.createCondition();
    },
    updateCondition: function (update) {
      console.log("yayay update");
    },
    deleteCondition: function (condition_id) {
      this.filter.deleteCondition(condition_id);
    },
    save: function () {
      if (this.label) {
        this.layer.label = this.label;
        this.layer.setFilter(this.filter);
        this.dialogIsOpen = false;
        this.$emit("add-layer", this.layer);
      } else {
        this.messages.push("required field");
      }
    },
    unmounted() {
      this.label = "";
    },
  },
};
</script>
<style></style>
