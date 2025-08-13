import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/authPages/Login.vue";
import Dashboard from "../pages/dashboard/dashboard.vue";
import VerifyEmail from "../pages/authPages/VerifyEmail.vue";
import Register from "../pages/authPages/Register.vue";
import Home from "../pages/publicPages/home.vue";
import Contact from "../pages/publicPages/Contact.vue";
import Policy from "../pages/publicPages/Policy.vue";
import Terms from "../pages/publicPages/Terms.vue";

const routes = [
  //---------------authPages--------------//
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/verify-email", component: VerifyEmail },
  //---------------publicPages--------------//
   { path: "", component: Home },
   {path: "/contact", component: Contact },
   {path: "/policy", component: Policy },
   {path: "/terms", component: Terms },


  //---------------dashboard--------------//
  { path: "/dashboard", component: Dashboard },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
