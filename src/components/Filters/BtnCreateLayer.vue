<template>
  <div>
    <!-- <div>
      <v-btn block variant="text" size="x-small" @click="openDialog"
        ><v-icon icon="mdi-plus"></v-icon>
      </v-btn>
    </div> -->
    <div>
      <v-btn block variant="text" size="x-small" @click="openDialog"
        ><span class="text-caption">create filter</span>
      </v-btn>
    </div>

    <LayerEditDialog ref="LayerEditDialog" @add-layer="addLayer" />
  </div>
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
    },
  },
};
</script>
<style></style>
