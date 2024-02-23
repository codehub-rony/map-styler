<template>
  <div>
    <v-btn
      variant="text"
      icon="mdi-pencil-outline"
      color="grey"
      size="x-small"
      @click="handleClick"
    ></v-btn>

    <LayerEditDialog ref="LayerEditDialog" />
  </div>
</template>
<script>
import LayerEditDialog from "../Filters/LayerEditDialog.vue";

export default {
  components: { LayerEditDialog },
  props: {
    layer: Object,
    styleObject: Object,
  },
  methods: {
    handleClick: async function () {
      let attributes = await this.styleObject.getFeatureAttributes();
      this.$refs.LayerEditDialog.openDialog(this.layer, attributes, "edit");
    },
  },
};
</script>
