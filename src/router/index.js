// Composables
import { createRouter, createWebHistory } from "vue-router";

import EditorPage from "@/views/EditorPage.vue";
import LandingPage from "@/views/LandingPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import ProjectPage from "@/views/ProjectPage.vue";

import { useAppStore } from "@/store/app.js";
import { mapState, mapActions } from "pinia";

const routes = [
  {
    path: "/editor",
    name: "editor",
    component: EditorPage,
    props: true,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    props: true,
  },
  {
    path: "/projects",
    name: "projects",
    component: ProjectPage,
    props: true,
  },
  {
    path: "/",
    name: "home",
    component: LandingPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const appStore = useAppStore();
  next();

  appStore.setCurrentPage(to.name);

  // if (to.meta.requiresAuth && !yourStore.isAuthenticated) {
  //   next('/'); // Redirect to home if not authenticated
  // } else {
  //   next(); // Proceed to the route
  // }
});

export default router;
