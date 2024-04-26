// Composables
import { createRouter, createWebHistory } from "vue-router";

import EditorPage from "@/views/EditorPage.vue";
import LandingPage from "@/views/LandingPage.vue";

const routes = [
  {
    path: "/editor",
    name: "editor",
    component: EditorPage,
    props: true,
  },
  {
    path: "/",
    component: LandingPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
