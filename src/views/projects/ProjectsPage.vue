<template>
  <v-container width="500">
    <v-row class="justify-center">
      <v-col cols="6">
        <div class="d-flex justify-space-between align-center">
          <span class="text-h5 font-weight-light">Projects</span>
          <v-btn
            variant="outlined"
            size="small"
            rounded="0"
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
