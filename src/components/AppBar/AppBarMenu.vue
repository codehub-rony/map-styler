<template>
  <div class="mr-3">
    <v-menu density="compact">
      <template v-slot:activator="{ props }">
        <div>
          <span class="text-body-1 font-weight-light">{{ this.user }}</span>
          <v-btn
            icon="mdi-menu"
            v-bind="props"
            size="small"
            class="ml-2 text-grey"
          />
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
      items: [
        { title: "My account", route_name: "me" },
        { title: "logout", route_name: "home" },
      ],
    };
  },
  methods: {
    handleItemClick(item) {
      if (item.title === "logout") {
        this.logout();
      }
      this.$router.push({ name: item.route_name });
    },
  },
};
</script>
