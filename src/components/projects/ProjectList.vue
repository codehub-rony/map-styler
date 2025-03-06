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

// store
import { useAppStore } from "@/store/app.js";
import { mapActions } from "pinia";

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
    ...mapActions(useAppStore, ["setCurrentProject"]),
    openProject: function (project) {
      this.setCurrentProject(project);
      this.$router.push({ name: "editor" });
    },
    deleteProject(project) {
      apiService.Project.delete(project.id).then((res) => {
        // to do: add component for confirming deletion
        this.projects = this.projects.filter((x) => x.id !== project.id);
      });
    },
  },
};
</script>
<style></style>
