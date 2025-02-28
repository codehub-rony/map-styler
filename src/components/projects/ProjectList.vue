<template>
  <div v-for="item in items" :key="item.id" class="d-flex flex-row">
    <v-card
      rounded="2"
      hover
      class="pa-3 mb-2"
      variant="outlined"
      @click="openProject(item)"
    >
      <v-card-title>
        {{ item.name }}
      </v-card-title>
      <div class="d-flex justify-space-between">
        <div>{{ item.description }}</div>
      </div>
    </v-card>
    <v-btn
      icon="mdi-trash-can"
      size="x-small"
      @click="deleteProject(item.id)"
    ></v-btn>
  </div>
</template>
<script>
import apiService from "@/services/apiService";

export default {
  data() {
    return {
      items: null,
    };
  },
  mounted() {
    apiService.Project.getAll().then((res) => {
      this.items = res;
    });
  },

  methods: {
    openProject: function (project_id) {
      console.log(project_id);
    },
    deleteProject(project_id) {
      apiService.Project.delete(project_id).then((res) => {
        console.log("delete succesful");
        this.items = this.items.filter((x) => x.id !== project_id);
      });
    },
  },
};
</script>
<style></style>
