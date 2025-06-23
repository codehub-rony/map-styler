<template>
  <div>
    <div>
      <v-btn block variant="text" size="x-small" @click="openDialog"
        ><span class="text-caption">create filter</span>
      </v-btn>
    </div>

    <LayerEditDialog ref="LayerEditDialog" @add-layer="addLayer" />
  </div>
</template>

<script>
import LayerEditDialog from "@/components/Filters/LayerEditDialog.vue";

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
    };
  },
  methods: {
    openDialog: async function () {
      let fields;
      if (this.styleObject.fields) {
        fields = this.styleObject.fields;
      } else {
        fields = await this.styleObject.fetchFields();
      }
      let new_layer = this.styleObject.stylejson.createLayer(
        this.styleObject.source_id,
        this.styleObject.geometry_type
      );
      let dialog_mode = "new";
      this.$refs.LayerEditDialog.openDialog(new_layer, fields, dialog_mode);
    },
    addLayer: function (new_layer) {
      this.styleObject.stylejson.addLayer(new_layer);
    },
  },
};
</script>
<style></style>
