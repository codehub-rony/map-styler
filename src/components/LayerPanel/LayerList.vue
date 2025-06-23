<template>
  <div class="dataset-container mb-2">
    <LayerListControls
      :styleObject="styleObject"
      @collapse="isCollapsed = isCollapsed ? false : true"
      class="pl-2 pr-2 pb-1 pt-2"
    />
    <v-divider v-if="!isCollapsed" class="pb-2"> </v-divider>
    <div v-if="!isCollapsed">
      <div
        v-for="(layer, i) in styleObject.stylejson.layers"
        :id="i"
        class="mb-1 pl-4"
      >
        <div
          class="d-flex flex-row align-center justify-space-between pl-2 pr-2"
        >
          <span class="text-subtitle-2">{{ layer.name }}</span>
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
          v-for="(property, key) in layer.paint"
          :id="key"
          class="text-subtitle-2 test pr-4 pb-1 d-flex flex-row justify-space-between"
        >
          <ColorField
            v-if="property.component.type === 'color_picker'"
            :key="key"
            :property="property"
            @color-updated="layer.setColor($event.color, key)"
          />

          <InputField
            v-if="property.component.type === 'input_field'"
            :property="property"
          />

          <DashArrayInput
            v-if="property.component.type === 'input_field_dasharray'"
            :property="property"
            :key="key"
          />
        </div>
      </div>
      <BtnCreateLayer
        :styleObject="styleObject"
        mode="new"
        ref="filterDialog"
      />
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
import LayerListControls from "@/components/LayerPanel/LayerListControls.vue";

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
    LayerListControls,
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
      this.styleObject.stylejson.deleteLayer(layer.getId());
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
