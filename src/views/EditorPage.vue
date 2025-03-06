<template>
  <v-container>
    <v-row dense
      ><v-col cols="0" xl="1"></v-col>
      <v-col cols="12" xl="2" lg="3" md="3" sm="3">
        <LayerPanel
          :styleObjects="styleObjects"
          :currentProject="currentProject"
          @save-project="saveProject"
        />
      </v-col>

      <v-col cols="12" lg="8" md="9" sm="9">
        <MapViewer ref="map" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// components
import LayerPanel from "@/views/LayerPanel.vue";
import MapViewer from "@/components/MapViewer.vue";

// store
import { useAppStore } from "@/store/app";
import { mapActions, mapState } from "pinia";

//API
import api from "@/services/apiService";

export default {
  components: {
    LayerPanel,
    MapViewer,
  },
  computed: {
    ...mapState(useAppStore, ["styleObjects", "currentProject"]),
  },
  data() {
    return {
      originalState: [],
    };
  },
  created() {
    this.setOriginalState();
  },
  methods: {
    ...mapActions(useAppStore, [
      "clearProject",
      "setOriginalState",
      "hasUnsavedChanges",
    ]),

    saveProject: function () {
      this.styleObjects.forEach((styleObject) => {
        let payload = {
          name: styleObject.name,
          description: styleObject.description,
          geometry_type: styleObject.geometry_type,
          source_id: styleObject.source_id,
          tilejson_url: styleObject.tilejson_url,
          stylejson: JSON.parse(styleObject.getStyleJSON()),
        };

        if (styleObject.id) {
          api.Project.saveStyleJSON(
            this.currentProject.id,
            styleObject.id,
            payload
          );
        } else {
          let res = api.Project.createStyleJSON(
            this.currentProject.id,
            payload
          ).then((res) => {
            styleObject.id = res.id;
          });
        }
      });
      this.setOriginalState();
    },
  },

  beforeRouteLeave: function (to, from, next) {
    if (this.hasUnsavedChanges()) {
      const answer = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      if (!answer) return;
    }
    this.clearProject();

    this.$nextTick(() => {
      next();
    });
  },
};
</script>
<style></style>
