// Composables
import { createRouter, createWebHistory } from "vue-router";

import MapPage from "@/views/MapPage.vue";

const routes = [
  {
    path: "/",
    component: MapPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
