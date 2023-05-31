import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/add-post",
      name: "add-post",
      component: () => import("../views/AddPostView.vue"),
    },
    {
      path: "/edit-post/:id",
      name: "edit-post",
      component: () => import("../views/EditPostView.vue"),
    },
    {
      path: "/post/:id",
      name: "post",
      component: () => import("../views/PostView.vue"),
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: import("../components/NotFoundPage.vue"),
      meta: {
        requiresAuth: false,
      },
    },
  ],
});

export default router;
