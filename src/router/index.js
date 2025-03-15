// Composables
import { createRouter, createWebHistory } from "vue-router";

import EditorPage from "@/views/EditorPage.vue";
import LandingPage from "@/views/LandingPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import ProjectsPage from "@/views/projects/ProjectsPage.vue";
import NewProjectPage from "@/views/projects/NewProjectPage.vue";

import { useAuthStore } from "@/store/auth.js";

const routes = [
  {
    path: "/",
    name: "home",
    component: LandingPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/editor",
    name: "editor",
    component: EditorPage,
    props: true,
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
    component: ProjectsPage,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/projects/new",
    name: "new-project",
    component: NewProjectPage,
    props: true,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.path === "/" && authStore.isAuthenticated()) {
    next("/projects");
  } else {
    if (to.meta.requiresAuth && authStore.isAuthenticated()) {
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
