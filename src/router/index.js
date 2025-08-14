import { createRouter, createWebHistory } from "vue-router";
// Auth Pages
import Login from "../pages/authPages/Login.vue";
import Dashboard from "../pages/dashboard/dashboard.vue";
import VerifyEmail from "../pages/authPages/VerifyEmail.vue";
import Register from "../pages/authPages/Register.vue";

// Public Pages
import Home from "../pages/publicPages/home.vue";
import Contact from "../pages/publicPages/Contact.vue";
import Policy from "../pages/publicPages/Policy.vue";
import Terms from "../pages/publicPages/Terms.vue";
import Products from "../pages/publicPages/Products.vue";
import Categories from "../pages/publicPages/Categories.vue";
import Product from "../pages/publicPages/Product.vue";
// Users Pages
import DashboardLayout from "../layouts/DashboardLayout.vue";
import Orders from "../pages/dashboard/Orders.vue";
import Profil from "../pages/dashboard/Profil.vue";
// Admin Pages
import DashboardAdminLayout from "../layouts/DashboardAdminLayout.vue";
import AdminProducts from "../pages/adminPages/AdminProducts.vue";
import AdminCategories from "../pages/adminPages/AdminCategories.vue";
import AdminUsers from "../pages/adminPages/AdminUsers.vue";
import AdminOrders from "../pages/adminPages/AdminOrders.vue";

import ForgotPassword from "../pages/authPages/ForgotPassword.vue";
import ResetPassword from "../pages/authPages/ResetPassword.vue";
import UpdateProduct from "../pages/adminPages/UpdateProduct.vue";
import UpdateCategorie from "../pages/adminPages/UpdateCategorie.vue";

const routes = [
  //---------------authPages--------------//
  { path: "/login", component: Login },
  { path: "/register", component: Register }, //
  { path: "/verify-email", component: VerifyEmail },
  { path: "/forgot-password", component: ForgotPassword },
  { path: "/reset-password", component: ResetPassword },

  //---------------publicPages--------------//
  { path: "", component: Home },
  { path: "/products", component: Products },
  { path: "/categories", component: Categories },
  { path: "/product/:id", component: Product },
  { path: "/contact", component: Contact },
  { path: "/policy", component: Policy },
  { path: "/terms", component: Terms },

  //---------------dashboard user--------------//
  {
    path: "/dashboard",
    component: DashboardLayout,
    children: [
      { path: "", component: Dashboard },
      { path: "profile", component: Profil },
      { path: "orders", component: Orders },
    ],
  },
  //---------------dashboard admin--------------//
  {
    path: "/admin",
    component: DashboardAdminLayout,
    children: [
      { path: "", component: Dashboard },
      { path: "products", component: AdminProducts },
      { path: "update-product/:id", component: UpdateProduct },
      { path: "categories", component: AdminCategories },
      { path: "update-categorie/:id", component: UpdateCategorie },
      { path: "users", component: AdminUsers },
      { path: "orders", component: AdminOrders },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
