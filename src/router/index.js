// Composables
import { createRouter, createWebHistory } from "vue-router";

import EditorPage from "@/views/EditorPage.vue";
import LandingPage from "@/views/LandingPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import ProjectPage from "@/views/ProjectPage.vue";

import { useAuthStore } from "@/store/auth.js";

const routes = [
  {
    path: "/editor",
    name: "editor",
    component: EditorPage,

    meta: { requiresAuth: false },
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    props: true,
    meta: { requiresAuth: false },
  },
  {
    path: "/projects",
    name: "projects",
    component: ProjectPage,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/",
    name: "home",
    component: LandingPage,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  console.log(
    "to.path:",
    to.path,
    to.path === "/" && authStore.isAuthenticated()
  );

  if (to.path === "/" && authStore.isAuthenticated()) {
    console.log("ROUTING BACK TO PROJECTS");
    next("/projects");
  } else {
    if (to.meta.requiresAuth && authStore.isAuthenticated()) {
      console.log("ROUTING BACK TO", to.path);
      next();
    } else {
      if (
        to.path !== "/login" &&
        to.meta.requiresAuth &&
        !authStore.isAuthenticated()
      ) {
        next("login");
      } else {
        next();
      }
    }
  }
});

export default router;
