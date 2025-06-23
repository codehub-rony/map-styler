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
import LayerEditDialog from "@/components/Filters/LayerEditDialog.vue";

export default {
  components: { LayerEditDialog },
  props: {
    layer: Object,
    styleObject: Object,
  },
  methods: {
    handleClick: async function () {
      let fields = this.styleObject.fields;
      let dialog_mode = "edit";
      this.$refs.LayerEditDialog.openDialog(this.layer, fields, dialog_mode);
    },
  },
};
</script>
