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
import Orders from "../pages/dashboard/Orders.vue";
import Profil from "../pages/dashboard/Profil.vue";
import Wishlist from "../pages/dashboard/Wishlist.vue";

// Admin Pages
import DashboardAdminLayout from "../layouts/DashboardAdminLayout.vue";
import AdminUsers from "../pages/adminPages/AdminUsers.vue";
import DashboardAdm from "../pages/adminPages/DashboardAdm.vue";
import AdminProfil from "../pages/adminPages/AdminProfil.vue";

import ForgotPassword from "../pages/authPages/ForgotPassword.vue";
import ResetPassword from "../pages/authPages/ResetPassword.vue";
import Cart from "../pages/carts/Cart.vue";
import AdminSales from "../pages/adminPages/AdminSales.vue";
import AdminLogin from "../pages/adminPages/auth/adminLogin.vue";
import { useAdminAuthStore } from "../stores/admin/adminAuthStore";
import AdminCategories from "../pages/adminPages/categories/AdminCategories.vue";
import UpdateCategorie from "../pages/adminPages/categories/UpdateCategorie.vue";
import AdminProducts from "../pages/adminPages/products/AdminProducts.vue";
import UpdateProduct from "../pages/adminPages/products/UpdateProduct.vue";
import AdminOrders from "../pages/adminPages/orders/AdminOrders.vue";
import Categorie from "../pages/publicPages/Categorie.vue";

const routes = [
  //---------------authPages--------------//
  { path: "/login", name: "login", component: Login },
  { path: "/register", name: "register", component: Register },
  { path: "/verify-email", component: VerifyEmail },
  { path: "/forgot-password", component: ForgotPassword },
  { path: "/reset-password", component: ResetPassword },

  //---------------publicPages--------------//
  { path: "",name:"home", component: Home },
  { path: "/",name:"home", component: Home },
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

  //--------dashboard user-------//
  {
    path: "/dashboard",
    component: DashboardUserLayout,
    children: [
      {
        path: "",
        component: Dashboard,
        meta: {
          title: "Dashboard",
          subtitle:
            "Gérez vos commandes, favoris et informations en un seul endroit.",
          icon: "bi bi-speedometer2",
        },
      },
      {
        path: "profile",
        component: Profil,
        meta: {
          title: "Profil",
          subtitle: "Mettez à jour vos informations personnelles",
          icon: "bi bi-person-circle",
        },
      },
      {
        path: "orders",
        component: Orders,
        meta: {
          title: "Commandes",
          subtitle: "Gérez vos commandes en cours",
          icon: "bi bi-bag-check",
        },
      },
      {
        path: "wishlist",
        component: Wishlist,
        meta: {
          title: "Favoris",
          subtitle: "Tous vos articles favoris",
          icon: "bi bi-heart",
        },
      },
    ],
  },

  //---------------dashboard admin--------------//
  // Login admin hors dashboard layout
  {
    path: "/admin/login",
    component: AdminLogin,
  },
  {
    path: "/admin",
    component: DashboardAdminLayout,
    children: [
      {
        path: "",
        component: DashboardAdm,
        meta: { title: "Dashboard", icon: "bi bi-house-door-fill" },
      },
      {
        path: "products",
        component: AdminProducts,
        meta: { title: "Produits", icon: "bi bi-box-seam" },
      },
      {
        path: "update-product/:id",
        component: UpdateProduct,
        meta: { title: "Modifier Produit", icon: "bi bi-box-seam" },
      },
      {
        path: "categories",
        component: AdminCategories,
        meta: { title: "Catégories", icon: "bi bi-tags" },
      },
      {
        path: "update-categorie/:id",
        component: UpdateCategorie,
        meta: { title: "Modifier Catégorie", icon: "bi bi-tags" },
      },
      {
        path: "users",
        component: AdminUsers,
        meta: { title: "Utilisateurs", icon: "bi bi-people" },
      },
      {
        path: "orders",
        component: AdminOrders,
        meta: { title: "Commandes", icon: "bi bi-bag-check" },
      },
      {
        path: "sales",
        component: AdminSales,
        meta: { title: "Ventes", icon: "bi bi-graph-up" },
      },
      {
        path: "profil",
        component: AdminProfil,
        meta: { title: "Profil", icon: "bi bi-person" },
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
   scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      const el = document.querySelector(to.hash)
      if (el) {
        return window.scrollTo({
          top: el.offsetTop - 80, // 80 = hauteur du header fixe, à ajuster
          behavior: 'smooth'
        })
      }
    }
    return { top: 0 }
  }
});

// 🛡️ Guards
router.beforeEach((to, from, next) => {
  const adminStore = useAdminAuthStore();

  // Liste des routes publiques admin
  const publicAdminPages = ["/admin/login"];
  const authRequired =
    to.path.startsWith("/admin") && !publicAdminPages.includes(to.path);

  // 1 Rediriger vers dashboard si admin connecté et va sur login
  if (to.path === "/admin/login" && adminStore.isLoggedIn) {
    return next("/admin");
  }

  // 2 Rediriger vers login si admin non connecté et essaie d'accéder au dashboard
  if (authRequired && !adminStore.isLoggedIn) {
    return next("/admin/login");
  }

  next();
});

export default router;
