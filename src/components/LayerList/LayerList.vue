<template>
  <v-sheet rounded="0">
    <div class="pl-4 pb-1 pt-4 text-h6 font-weight-light">
      {{ styleObject.style_name }}
    </div>
    <div v-for="(layer, i) in styleObject.layers" :id="i" class="">
      <div class="d-flex flex-row align-center justify-space-between pl-1">
        <span class="text-subtitle-2 pl-3">{{ layer.label }}</span>
        <div class="d-flex flex-row">
          <EditButton
            :layer="layer"
            :styleObject="styleObject"
            @open-edit-dialog="handleEvent"
            class="mb-1"
          />
          <DeleteButton :callback="deleteLayer" :layer="layer" class="mb-1" />
          <VisibilityButton :layer="layer" class="mb-1" />
        </div>
      </div>

      <div
        v-for="(attribute, h) in layer.attributes"
        :id="h"
        class="text-subtitle-2 test pr-4 pb-2 d-flex flex-row justify-space-between"
      >
        <ColorField
          :attribute="attribute"
          v-if="attribute.component.type === 'color_picker'"
        />

        <InputField
          :attribute="attribute"
          v-if="attribute.component.type === 'input_field'"
        />

        <DashArrayInput
          :attribute="attribute"
          v-if="attribute.component.type === 'input_field_dasharray'"
        />
      </div>

      <v-divider class="pb-2" v-if="styleObject.layers.length - 1 !== i">
      </v-divider>
    </div>
  </v-sheet>
</template>

<script>
import InputField from "./InputField.vue";
import DashArrayInput from "./DashArrayInput.vue";
import ColorField from "./ColorField.vue";
import DeleteButton from "@/components/DeleteButton.vue";
import VisibilityButton from "./VisibilityButton.vue";
import EditButton from "./EditButton.vue";

export default {
  emits: ["open-edit-dialog"],
  components: {
    InputField,
    DashArrayInput,
    ColorField,
    DeleteButton,
    VisibilityButton,
    EditButton,
  },
  props: {
    styleObject: Object,
  },

  methods: {
    deleteLayer: function (layer) {
      this.styleObject.deleteLayer(layer.getId());
    },
    handleEvent: function (layer) {
      this.$emit("open-edit-dialog", layer);
    },
  },
};
</script>

<style>
.test {
  margin-left: 36px;
}
</style>
