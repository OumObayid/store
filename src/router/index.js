import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/authPages/Login.vue";
import Dashboard from "../pages/dashboard/dashboard.vue";
import VerifyEmail from "../pages/authPages/VerifyEmail.vue";
import Register from "../pages/authPages/Register.vue";

const routes = [
  //---------------authPages--------------//
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/verify-email", component: VerifyEmail },

  //---------------dashboard--------------//
  { path: "/dashboard", component: Dashboard },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
