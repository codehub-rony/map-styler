<template>
  <v-card
    rounded="2"
    hover
    class="pa-3 mb-2"
    variant="outlined"
    @click="openProject"
  >
    <v-card-title>
      {{ project.name }}
    </v-card-title>
    <div class="d-flex justify-space-between">
      <div>{{ project.description }}</div>
    </div>
  </v-card>
  <v-btn icon="mdi-trash-can" size="x-small" @click="deleteProject()"></v-btn>
</template>
<script>
export default {
  emits: ["open-project", "delete-project"],
  props: {
    project: Object,
  },
  methods: {
    openProject: function () {
      this.$emit("open-project", this.project.id);
    },
    deleteProject() {
      this.$emit("delete-project", this.project.id);
    },
  },
};
</script>
<style></style>
