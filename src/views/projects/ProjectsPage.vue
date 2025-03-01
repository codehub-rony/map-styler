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
        <ProjectList :items="items" />
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
  data() {
    return {
      items: [
        {
          id: 1,
          name: "Park west",
          description: "luchtvaart app approach altitude styling",
        },
        { id: 2, name: "Schiphol", description: "Styling voor de TMA zone" },
        {
          id: 3,
          name: "tesdfdfd",
          description: "random element om het een en ander te testen",
        },
      ],
    };
  },
  methods: {
    handleCreateNew: function () {},
  },
};
</script>
