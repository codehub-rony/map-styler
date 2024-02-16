<template>
  <div class="d-flex justify-center pb-3">
    <v-btn
      elevation="0"
      variant="outlined"
      rounded="0"
      size="small"
      @click="openDialog"
      >new layer
    </v-btn>
  </div>

  <LayerEditDialog ref="LayerEditDialog" @add-layer="addLayer" />
</template>

<script>
import LayerEditDialog from "./LayerEditDialog.vue";

export default {
  components: {
    LayerEditDialog,
  },
  props: {
    styleObject: Object,
    mode: String,
  },
  data() {
    return {
      isClicked: 0,
      dialog: false,
      label: null,
      messages: [],
      conditions: [],
      attributes: [],
      layer: null,
    };
  },
  methods: {
    openDialog: async function () {
      this.attributes = await this.styleObject.getFeatureAttributes();
      this.layer = this.styleObject.createLayer();
      this.$refs.LayerEditDialog.openDialog(this.layer, this.attributes, "new");
    },
    addLayer: function (new_layer) {
      this.styleObject.addLayer(new_layer);
      console.log(this.styleObject.getStyleAsJSON());
    },
  },
};
</script>
<style></style>
