<template>
  <v-card
    rounded="0"
    elevation="0"
    class="pa-1 container-project-list-item"
    @click="openProject"
    :loading="loading"
  >
    <div class="d-flex flex-row align-center justify-space-between">
      <div class="d-flex flex-column">
        <span class="text-subtitle-1 font-weight-medium">{{
          project.name
        }}</span>
        <span class="text-body-1 font-weight-light">{{
          project.description
        }}</span>
      </div>
      <v-btn
        icon="mdi-delete-outline"
        size="x-small"
        flat
        color="grey"
        variant="text"
        class="btn-delete-list-item"
        @click.stop="deleteProject()"
      ></v-btn>
    </div>
  </v-card>
</template>
<script>
export default {
  emits: ["open-project", "delete-project"],
  props: {
    project: Object,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    openProject: function () {
      this.loading = true;
      // this.$emit("open-project", this.project);
      setTimeout(() => {
        this.$emit("open-project", this.project);
      }, 1000);
    },
    deleteProject() {
      this.$emit("delete-project", this.project);
    },
  },
};
</script>
<style>
.container-project-list-item {
  width: 100%;
  border-bottom: 1px rgb(169, 169, 169) solid;
}

.container-project-list-item:hover {
  background-color: rgba(173, 206, 210, 0.7);
}

.btn-delete-list-item {
  background-color: white;
}
</style>
