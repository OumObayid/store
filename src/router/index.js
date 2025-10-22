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
import About from "../pages/publicPages/about.vue";

// Users Pages
import DashboardUserLayout from "../layouts/DashboardUserLayout.vue";
import MyOrders from "../pages/dashboard/MyOrders.vue";
import Profil from "../pages/dashboard/Profil.vue";
import Wishlist from "../pages/dashboard/Wishlist.vue";

// Admin Pages
import DashboardAdminLayout from "../layouts/DashboardAdminLayout.vue";

import DashboardAdm from "../pages/adminPages/DashboardAdm.vue";
import AdminProfil from "../pages/adminPages/AdminProfil.vue";
import ForgotPassword from "../pages/authPages/ForgotPassword.vue";
import ResetPassword from "../pages/authPages/ResetPassword.vue";
import Cart from "../pages/carts/Cart.vue";
import AdminCategories from "../pages/adminPages/categories/AdminCategories.vue";
import UpdateCategorie from "../pages/adminPages/categories/UpdateCategorie.vue";
import AdminProducts from "../pages/adminPages/products/AdminProducts.vue";
import UpdateProduct from "../pages/adminPages/products/UpdateProduct.vue";
import AdminOrders from "../pages/adminPages/orders/AdminOrders.vue";
import Categorie from "../pages/publicPages/Categorie.vue";
import Order from "../pages/order/Order.vue";
import OrderSuccess from "../pages/order/OrderSuccess.vue";
import AdminSetting from "../pages/adminPages/AdminSetting.vue";
import AddCategorie from "../pages/adminPages/categories/AddCategorie.vue";
import AddProduct from "../pages/adminPages/products/AddProduct.vue";
import { AdminGuard, UserGuard } from "../guards/guards";
import AdminUsers from "../pages/adminPages/users/AdminUsers.vue";

const routes = [
  //---------------authPages--------------//
  { path: "/login", name: "login", component: Login },
  { path: "/register", name: "register", component: Register },
  { path: "/verify-email", component: VerifyEmail },
  { path: "/forgot-password", component: ForgotPassword },
  { path: "/reset-password", component: ResetPassword },

  //---------------publicPages--------------//
  { path: "", name: "home", component: Home },
  { path: "/", name: "home", component: Home },
  { path: "/products/:query?", component: Products },
  { path: "/categories", component: Categories },
  { path: "/product/:id", component: Product },
  { path: "/categorie/:id", component: Categorie },
  { path: "/contact", component: Contact },
  { path: "/policy", component: Policy },
  { path: "/terms", component: Terms },
  { path: "/about", component: About },

  //---------------------------User---------------------------//
  { path: "/cart", component: Cart },

  { path: "/order", component: Order, beforeEnter: UserGuard },
  { path: "/order-success", beforeEnter: UserGuard, component: OrderSuccess },

  //--------dashboard user-------
  {
    path: "/dashboard",
    component: DashboardUserLayout,
    beforeEnter: UserGuard,
    children: [
      {
        path: "",
        component: Dashboard,
        meta: {
          titleKey: "user-dashboard.title",
          subtitleKey: "user-dashboard.subtitle",
          icon: "bi bi-speedometer2",
        },
      },
      {
        path: "profile",
        component: Profil,
        meta: {
          titleKey: "user-profile.title",
          subtitleKey: "user-profile.subtitle",
          icon: "bi bi-person-circle",
        },
      },
      {
        path: "my-orders",
        component: MyOrders,
        meta: {
          titleKey: "user-orders.title",
          subtitleKey: "user-orders.subtitle",
          icon: "bi bi-bag-check",
        },
      },
      {
        path: "wishlist",
        component: Wishlist,
        meta: {
          titleKey: "user-wishlist.title",
          subtitleKey: "user-wishlist.subtitle",
          icon: "bi bi-heart",
        },
      },
    ],
  },
  //---------------admin--------------//
  {
    path: "/admin",
    component: DashboardAdminLayout,
    redirect: "/admin/dashboard", // redirection automatique
    beforeEnter: AdminGuard,
    children: [
      {
        path: "dashboard",
        component: DashboardAdm,
        // meta: { title: "Dashboard", icon: "bi bi-house-door-fill" },
        meta: {
          titleKey: "admin-dashboard.title",
          subtitleKey: "admin-dashboard.subtitle",
          icon: "bi bi-house-door-fill",
        },
      },
      {
        path: "products",
        component: AdminProducts,
        // meta: { title: "Produits", icon: "bi bi-box-seam" },
        meta: {
          titleKey: "admin-products.title",
          subtitleKey: "admin-products.subtitle",
          icon: "bi bi-box-seam",
        },
      },
      {
        path: "add-product",
        component: AddProduct,
        meta: {
          titleKey: "admin-add-product.title",
          subtitleKey: "admin-add-product.subtitle",
          icon: "bi bi-box-seam",
        },
      },
      {
        path: "update-product/:id",
        component: UpdateProduct,
        // meta: { title: "Modifier Produit", icon: "bi bi-box-seam" },
        meta: {
          titleKey: "admin-update-product.title",
          subtitleKey: "admin-update-product.subtitle",
          icon: "bi bi-box-seam",
        },
      },
      {
        path: "categories",
        component: AdminCategories,
        // meta: { title: "Catégories", icon: "bi bi-tags" },
        meta: {
          titleKey: "admin-categories.title",
          subtitleKey: "admin-categories.subtitle",
          icon: "bi bi-tags",
        },
      },
      {
        path: "add-categorie",
        component: AddCategorie,
        // meta: { title: "Ajouter Catégorie", icon: "bi bi-plus-circle" },
        meta: {
          titleKey: "admin-add-categorie.title",
          subtitleKey: "admin-add-categorie.subtitle",
          icon: "bi bi-plus-circle",
        },
      },
      {
        path: "update-categorie/:id",
        component: UpdateCategorie,
        // meta: { title: "Modifier Catégorie", icon: "bi bi-tags" },
        meta: {
          titleKey: "admin-update-categorie.title",
          subtitleKey: "admin-update-categorie.subtitle",
          icon: "bi bi-tags",
        },
      },
      {
        path: "users",
        component: AdminUsers,
        // meta: { title: "Utilisateurs", icon: "bi bi-people" },
        meta: {
          titleKey: "admin-users.title",
          subtitleKey: "admin-users.subtitle",
          icon: "bi bi-people",
        },
      },
      {
        path: "orders",
        component: AdminOrders,
        // meta: { title: "Commandes", icon: "bi bi-bag-check" },
        meta: {
          titleKey: "admin-orders.title",
          subtitleKey: "admin-orders.subtitle",
          icon: "bi bi-bag-check",
        },
      },
      {
        path: "revenues",
        component: AdminOrders,
        // meta: { title: "Commandes", icon: "bi bi-bag-check" },
        meta: {
          titleKey: "admin-orders.title",
          subtitleKey: "admin-orders.subtitle",
          icon: "bi bi-bag-check",
        },
      },

      {
        path: "profil",
        component: AdminProfil,
        // meta: { title: "Profil", icon: "bi bi-person" },
        meta: {
          titleKey: "admin-profil.title",
          subtitleKey: "admin-profil.subtitle",
          icon: "bi bi-person",
        },
      },
      {
        path: "setting",
        component: AdminSetting,
        // meta: { title: "Profil", icon: "bi bi-person" },
        meta: {
          titleKey: "admin-setting.title",
          subtitleKey: "admin-setting.subtitle",
          icon: "bi bi-gear-fill ",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      const el = document.querySelector(to.hash);
      if (el) {
        return window.scrollTo({
          top: el.offsetTop - 80, // 80 = hauteur du header fixe, à ajuster
          behavior: "smooth",
        });
      }
    }
    return { top: 0 };
  },
});

export default router;
