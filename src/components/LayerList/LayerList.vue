<template>
  <v-sheet rounded="0">
    <div class="pl-4 pb-1 pt-4 text-h6 font-weight-light">
      {{ styleObject.style_name }}
    </div>

    <div v-for="(layer, i) in styleObject.layers" :id="i" class="">
      <div
        v-for="(attribute, h) in layer.attributes"
        :id="h"
        class="text-subtitle-2 pl-7 pr-4 pt-1 pb-2 d-flex flex-row justify-space-between"
      >
        <ColorField
          :attribute="attribute"
          v-if="attribute.component.type === 'color_picker'"
        />

        <InputField
          :attribute="attribute"
          v-if="attribute.component.type === 'input_field'"
        />
      </div>
      <v-divider class="pb-2" v-if="styleObject.layers.length - 1 !== i">
      </v-divider>
    </div>
  </v-sheet>
</template>

<script>
import InputField from "./InputField.vue";
import ColorField from "./ColorField.vue";
import { useAppStore } from "@/store/app.js";
import { mapState } from "pinia";
export default {
  components: {
    InputField,
    ColorField,
  },
  computed: {
    ...mapState(useAppStore, ["styleObject"]),
  },
};
</script>

<style></style>
