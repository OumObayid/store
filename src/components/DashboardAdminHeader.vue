<template>
  <header class="navbar navbar-expand-lg shadow-sm px-3 py-2 ">
    <div class="container-fluid d-flex align-items-center justify-content-between">

      <!-- Logo / Titre dynamique -->
      <router-link class="navbar-brand fw-bold text-gold d-flex align-items-center" to="/admin">
        <i :class="route.meta.icon + ' me-2 fs-5'"></i>
        <span class="fs-5">{{ pageTitle }}</span>
      </router-link>

      <!-- Section utilisateur -->
      <div class="d-flex align-items-center gap-3">

        <!-- Nom + profession -->
        <div class="user-info d-none d-lg-flex flex-column align-items-end me-1">
          <div class="user-name fw-bold">{{ adminInfos.name }}</div>
          <div class="user-profession">{{ adminInfos.role }}</div>
        </div>

        <!-- Avatar avec dropdown -->
        <div class="dropdown">
          <a class=" d-flex align-items-center" href="#" id="userMenu" role="button"
             data-bs-toggle="dropdown" aria-expanded="false">
            <img :src="user.avatar || '/images/default-avatar.png'" alt="Avatar"
                 class="rounded-circle border border-2 border-light" width="50" height="50" />
          </a>
          <ul class="dropdown-menu dropdown-menu-end shadow-sm py-2" aria-labelledby="userMenu">
            <li>
              <router-link class="dropdown-item d-flex align-items-center" to="/admin/profil">
                <i class="bi bi-person-circle me-2"></i> Profil
              </router-link>
            </li>
            <li>
              <router-link class="dropdown-item d-flex align-items-center" to="/admin/settings">
                <i class="bi bi-gear me-2"></i> Paramètres
              </router-link>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <router-link class="dropdown-item d-flex align-items-center text-danger" to="#" @click="logout">
                <i class="bi bi-box-arrow-right me-2"></i> Déconnexion
              </router-link>
            </li>
          </ul>
        </div>

       
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAdminAuth } from '../composables/admin/useAdminAuth';
import { useAdminAuthStore } from '../stores/admin/adminAuthStore';

const {logout} = useAdminAuth();

const route = useRoute();
const authStore=useAdminAuthStore();
const adminInfos=computed(()=>authStore.adminInfos || {});
const pageTitle = computed(() => route.meta.title || 'Dashboard');

const user = ref({
  name: 'Oumaima',
  profession: 'Administrator',
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNGeQTU4N-KFWTu6l5hX71DCgAKIk3DhYN6ZIrTGdzHkDRqGfYEfUkrG0&s',
});



</script>

<style scoped>

/* Header */
header {
  background: var(--gold);
  color: white;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);
}

/* Texte doré */
.text-gold {
  color: var(--dark);
}

/* User info */
.user-info {
  cursor: default;
}

.user-name {
  color: var(--dark2);
  transition: background 0.2s;
  padding: 2px 6px;
  border-radius: 4px;
}


.user-profession {
  color: var(--dark2);
  font-size: 0.85rem;
}

/* Avatar */
img.rounded-circle {
  object-fit: cover;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

img.rounded-circle:hover {
  transform: scale(1.05);
  box-shadow: 0 0 8px rgba(212, 175, 55, 0.5);
}

/* Dropdown */
.dropdown-menu {
  min-width: 200px;
  border-radius: 0.5rem;
  color: white;
}

.dropdown-item i {
  font-size: 1rem;
}

.dropdown-item:hover {
  background-color: var(--gold2);
  color: var(--dark2);
}

/* LanguageSwitcher */
.language-switcher {
  display: flex;
  align-items: center;
}
</style>
