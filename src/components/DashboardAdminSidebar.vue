<template>
  <div class="sidebar d-flex flex-column bg-dark-gray text-gold shadow" :class="{ 'sidebar-hidden': !show }">

    <!-- Flèche toggle -->
    <button class="btn-toggle-sidebar" @click="$emit('toggle')">
      <i :class="show ? 'bi bi-chevron-left' : 'bi bi-chevron-right'"></i>
    </button>

    <!-- Logo -->
    <router-link to="/">
      <div class="text-center border-bottom border-secondary">
        <!-- <img src="/images/logo.png" alt="Logo" class="img-fluid sidebar-logo mb-2" /> -->
      </div>
    </router-link>
    <!-- Menu -->
    <ul class="nav nav-pills flex-column px-2 mt-3 flex-grow-1">
      <li v-for="item in menu" :key="item.name" class="mb-1">
        <router-link :to="item.link" class="nav-link d-flex align-items-center sidebar-link"
          :class="{ 'active-link': isActive(item.link) }">
          <i :class="item.icon + ' me-2 fs-5'"></i>
          <span>{{ item.name }}</span>
        </router-link>
      </li>
    </ul>
    
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

defineProps({
  show: { type: Boolean, default: true }
});

const route = useRoute();

// Toujours activer le Dashboard quand on est sur /admin
function isActive(link) {
  if (link === "/admin") {
    return route.path === "/admin";
  }
  return route.path.startsWith(link);
}

const menu = [
  { name: "Dashboard", link: "/admin", icon: "bi bi-house-door" },
  { name: "Produits", link: "/admin/products", icon: "bi bi-box-seam" },
  { name: "Commandes", link: "/admin/orders", icon: "bi bi-bag-check" },
  { name: "Catégories", link: "/admin/categories", icon: "bi bi-tags" },
  { name: "Utilisateurs", link: "/admin/users", icon: "bi bi-people" },
  { name: "Ventes", link: "/admin/sales", icon: "bi bi-graph-up" },
  { name: "Profile", link: "/admin/profil", icon: "bi bi-person" },
];
</script>

<style scoped>
/* Couleurs */
.bg-dark-gray {
  background-color: #1e1e1e;
}

.text-gold {
  color: #d4af37;
}

.sidebar-logo {
  max-width: 120px;
}

/* Sidebar */
.sidebar {
  width: 250px;
  min-height: 100vh;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.25);
}

.sidebar-hidden {
  transform: translateX(-100%);
  position: absolute;
  left: 0;
  top: 0;
}

/* Flèche toggle */
.btn-toggle-sidebar {
  position: absolute;
  top: 50vh;
  right: -18px;
  transform: translateY(-50%);
  width: 18px;
  height: 60px;
  background: #d4af37;
  border: none;
  border-radius: 0 8px 8px 0;
  color: #413f37;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 9999;
  transition: background 0.3s ease, transform 0.2s ease;
}

/* Liens */
.sidebar-link {
  color: #d4af37;
  padding: 10px 15px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.sidebar-link:hover {
  background-color: rgba(212, 175, 55, 0.15);
  color: #fff;
}

.active-link {
  background-color: #d4af37 !important;
  color: #1e1e1e !important;
  font-weight: 600;
  box-shadow: inset 3px 0 0 #fff;
}
</style>
