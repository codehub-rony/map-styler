<template>
  <v-form>
    <v-container width="500">
      <v-row class="justify-center">
        <v-col cols="4">
          <h2>Create a new project</h2>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="4">
          <InputTextField
            v-model="projectName"
            :validationRules="['not_empty']"
            ref="projectname"
            ><template #label>Project name</template></InputTextField
          >
          <InputTextField v-model="description"
            ><template #label>Description</template></InputTextField
          >
        </v-col>
      </v-row>
      <v-row class="justify-center"
        ><v-col cols="4">
          <div class="d-flex justify-end">
            <DefaultButton @click="saveProject"
              ><template #label>create</template></DefaultButton
            >
          </div></v-col
        ></v-row
      >
    </v-container>
  </v-form>
</template>
<script>
import DefaultButton from "@/components/DefaultButton.vue";
import InputTextField from "@/components/GenericComponents/InputTextField.vue";
import OGCTileInput from "@/components/DataImport/OGCTileInput.vue";
import apiService from "@/services/apiService";

import { useAppStore } from "@/store/app.js";
import { mapActions } from "pinia";
export default {
  components: {
    DefaultButton,
    OGCTileInput,
    InputTextField,
  },
  data() {
    return {
      projectName: null,
      description: null,
      stylename: "trest",
      tilejson: null,
    };
  },
  methods: {
    ...mapActions(useAppStore, ["setCurrentProject"]),
    handleTilejsonUpdate(tilejson) {
      this.tilejson = tilejson;
    },
    saveProject() {
      if (this.$refs.projectname.isFormValid) {
        apiService.Project.create({
          name: this.projectName,
          description: this.description,
        }).then((res) => {
          this.setCurrentProject(res);
          this.projectName = this.description = null;

          this.$router.push("/editor");
        });
      }
    },
  },
};
</script>
<style></style>
