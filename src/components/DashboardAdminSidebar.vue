<template>
  <div class="sidebar-admin d-flex flex-column bg-dark-gray text-gold shadow" :class="{ 'sidebar-hidden': !show }">

    <!-- Flèche toggle -->
    <button class="btn-toggle-sidebar" @click="emitDesktopToggle('all')">
      <i :class="show ? 'bi bi-chevron-left' : 'bi bi-chevron-right'"></i>
    </button>

    <!-- Logo -->
    <router-link to="/">
      <div class="text-center border-bottom border-secondary">
        <!-- <img src="/images/logoAr.png" alt="Logo" class="img-fluid sidebar-logo mb-2" /> -->
      </div>
    </router-link>
    <!-- Menu -->
    <ul class="nav nav-pills flex-column px-2 mt-3 flex-grow-1">
      <li @click="emitDesktopToggle('desktop')" v-for="item in filteredMenu" :key="item.name" class="mb-1">
        <router-link  :to="item.link" class="nav-link d-flex align-items-center sidebar-link"
          :class="{ 'active-link': isActive(item.link) }">
          <i :class="item.icon + ' mx-2 fs-5'"></i>
          <span>{{ item.name }}</span>
        </router-link>
      </li>
    </ul>

  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "../stores/authStore";
import { computed } from "vue";
const {userInfos} = useAuthStore();
const { t } = useI18n();
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
  { name: t("mydashboard"), link: "/admin", icon: "bi bi-house-door" },
  { name: t("profil"), link: "/admin/profil", icon: "bi bi-person" },
  { name: t("categories"), link: "/admin/categories", icon: "bi bi-tags" },
  { name: t("products"), link: "/admin/products", icon: "bi bi-bag" },
  { name: t("orders"), link: "/admin/orders", icon: "bi bi-box" },
  { name: t("users"), link: "/admin/users", icon: "bi bi-people" },
  { name: t("setting"), link: "/admin/setting", icon: "bi bi-gear" },
];
const filteredMenu = computed(() => {
  if (userInfos.role === "admin") {
    return menu.filter(item => item.link !== "/admin/users");
  }
  return menu;
});

const emit = defineEmits(['toggle'])

// ✅ Fonction utilitaire
const emitDesktopToggle = (param) => {
  if (param === 'all') emit('toggle')
  else
    if (window.innerWidth <= 768) { // >= md
      emit('toggle')
    }
}
</script>

<style scoped>
/* Couleurs */
.bg-dark-gray {
  background-color: #1e1e1e;
}

.text-gold {
  color: var(--gold);
}

.sidebar-logo {
  max-width: 120px;
}

/* Sidebar */
.sidebar-admin {
  width: 250px;
  min-height: 100vh;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  z-index: 10;
  margin-top: 0.4rem;
  background-color: #1e1e1e;
}

.sidebar-hidden[data-v-63bc4ab6] {
  margin-top: 5rem;
}

@media (max-width: 768px) {
  .sidebar-admin {
    margin-top: 5rem;
  }

  .sidebar-hidden[data-v-63bc4ab6] {
    margin-top: 7.4rem;
  }
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
  right: -14px;
  transform: translateY(-50%);
  width: 14px;
  height: 60px;
  background: var(--gold);
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
  color: var(--gold);
  padding: 10px 15px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.sidebar-link:hover {
  background-color: rgba(212, 175, 55, 0.15);
  color: #fff;
}

.active-link {
  background-color: var(--gold) !important;
  color: #1e1e1e !important;
  font-weight: 600;
  box-shadow: inset 3px 0 0 #fff;
}
</style>
