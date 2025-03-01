<template>
  <div v-for="project in projects" :key="project.id" class="d-flex flex-row">
    <ProjectListItem
      :project="project"
      @delete-project="deleteProject"
      @open-project="openProject"
    />
  </div>
</template>
<script>
// Components
import ProjectListItem from "./ProjectListItem.vue";

// ApiService
import apiService from "@/services/apiService";

export default {
  components: {
    ProjectListItem,
  },
  data() {
    return {
      projects: null,
    };
  },
  mounted() {
    apiService.Project.getAll().then((res) => {
      this.projects = res;
    });
  },

  methods: {
    openProject: function (project_id) {
      console.log(project_id);
    },
    deleteProject(project_id) {
      apiService.Project.delete(project_id).then((res) => {
        console.log("delete succesful");
        this.projects = this.projects.filter((x) => x.id !== project_id);
      });
    },
  },
};
</script>
<style></style>
