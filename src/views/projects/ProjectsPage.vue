<template>
  <v-container width="500">
    <v-row class="justify-center">
      <v-col cols="6">
        <div class="d-flex justify-space-between align-center">
          <h2>Projects</h2>
          <v-btn
            variant="outlined"
            size="small"
            @click="$router.push({ name: 'new-project' })"
            >create new</v-btn
          >
        </div>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col cols="6">
        <ProjectList />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ProjectList from "@/components/projects/ProjectList.vue";

export default {
  components: {
    ProjectList,
  },

  methods: {
    handleCreateNew: function () {},
  },
};
</script>
