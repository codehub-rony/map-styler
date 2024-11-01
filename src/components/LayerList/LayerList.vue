<template>
  <!-- <div :class="['dataset-container', isCollapsed ? 'mb-2' : 'mb-5']"> -->
  <div class="dataset-container mb-2">
    <LayerListHeader
      :styleObject="styleObject"
      @collapse="isCollapsed = isCollapsed ? false : true"
      class="pl-2 pr-2 pb-1 pt-2"
    />
    <v-divider v-if="!isCollapsed" class="pb-2"> </v-divider>
    <div v-if="!isCollapsed">
      <div v-for="(layer, i) in styleObject.layers" :id="i" class="mb-1 pl-4">
        <div
          class="d-flex flex-row align-center justify-space-between pl-2 pr-2"
        >
          <span class="text-subtitle-2">{{ layer.label }}</span>
          <div class="d-flex flex-row">
            <EditButton
              :layer="layer"
              :styleObject="styleObject"
              @open-edit-dialog="handleEvent"
              class="mb-1"
              :disabled="isHovered"
            />
            <DeleteButton
              :callback="deleteLayer"
              :layer="layer"
              class="mb-1"
              :disabled="isHovered"
            />
            <VisibilityButton
              :layer="layer"
              class="mb-1"
              :disabled="isHovered"
            />
          </div>
        </div>

        <div
          v-for="(attribute, h) in layer.attributes"
          :id="h"
          class="text-subtitle-2 test pr-4 pb-1 d-flex flex-row justify-space-between"
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
      </div>
      <BtnCreateLayer
        :styleObject="styleObject"
        mode="new"
        ref="filterDialog"
      />

      <!-- <div class="d-flex flex-row mt-4">
        <v-btn
          elevation="0"
          variant="outlined"
          rounded="0"
          size="small"
          @click="openDialog"
          >download
        </v-btn>
      </div> -->
    </div>
  </div>
</template>

<script>
import InputField from "./InputField.vue";
import DashArrayInput from "./DashArrayInput.vue";
import ColorField from "./ColorField.vue";
import DeleteButton from "@/components/DeleteButton.vue";
import VisibilityButton from "./VisibilityButton.vue";
import EditButton from "./EditButton.vue";
import BtnCreateLayer from "@/components/Filters/BtnCreateLayer.vue";
import LayerListHeader from "@/components/LayerList/LayerListHeader.vue";

export default {
  emits: ["open-edit-dialog"],
  components: {
    InputField,
    DashArrayInput,
    ColorField,
    DeleteButton,
    VisibilityButton,
    EditButton,
    BtnCreateLayer,
    LayerListHeader,
  },
  props: {
    styleObject: Object,
  },
  data() {
    return {
      isCollapsed: false,
    };
  },

  methods: {
    deleteLayer: function (layer) {
      this.styleObject.deleteLayer(layer.getId());
    },
    handleEvent: function (layer) {
      this.$refs.filterDialog.openDialog(layer);
    },
  },
};
</script>

<style>
.test {
  margin-left: 25px;
}

.dataset-container {
  border: 1px solid #e0e0e0;
}
</style>
