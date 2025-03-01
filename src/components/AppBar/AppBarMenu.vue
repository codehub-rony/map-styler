<template>
  <div class="mr-3">
    <v-menu open-on-hover density="compact">
      <template v-slot:activator="{ props }">
        <div>
          <a>{{ this.user }}</a>
          <v-btn icon="mdi-menu" v-bind="props" size="small" class="ml-2" />
        </div>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :value="index"
          @click="handleItemClick(item)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    user: String,
    logout: Function,
  },
  data() {
    return {
      items: [{ title: "logout" }],
    };
  },
  methods: {
    handleItemClick(item) {
      if (item.title === "logout") {
        this.logout();
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>
