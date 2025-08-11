import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/authPages/Login.vue";
import Dashboard from "../pages/dashboard/dashboard.vue";
const routes = [

  { path: "/login", component: Login },
  { path: "/dashboard", component: Dashboard },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;