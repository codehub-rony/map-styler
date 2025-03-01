<template>
  <div v-for="item in items" :key="item.id">
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
      <v-card-subtitle> {{ item.description }}</v-card-subtitle>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    items: Array,
  },
  methods: {
    openProject: function (item) {
      console.log(item);
      //fetch
      //   api.Project.get(id).then(){
      // set styleobjects to state
      // this.$router.push({ name: "editor"});

      // }
      this.$router.push({ name: "editor", query: { id: item.id } });
    },
  },
};
</script>
<style></style>
