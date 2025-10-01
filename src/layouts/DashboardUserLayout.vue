<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <aside class="dashboard-sidebar">
      <DashboardSidebar />
    </aside>

    <!-- Main Content -->
    <div class="dashboard-main">

      <!-- HEADER (Titre de la page + actions) -->
      <header class="dashboard-header">
        <i class="dashboard-icon" :class="route.meta.icon"></i>
        <div>
          <h1 class="dashboard-title">{{ pageTitle }}</h1>
          <p class="dashboard-subtitle">{{ pageSubtitle }}</p>
        </div>
      </header>

      <!-- Page Content -->
      <main class="dashboard-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DashboardSidebar from '../components/DashboardUserSidebar.vue';
import { useAdminAuthStore } from '../stores/admin/adminAuthStore';

// Récupérer la route active
const route = useRoute();
const router = useRouter();
const adminStore = useAdminAuthStore();

// Exemple : tu définis un meta.title dans tes routes
const pageTitle = computed(() => route.meta.title || "Dashboard");
const pageSubtitle = computed(() => route.meta.subtitle || "");

//  Vérification si admin connecté
onMounted(() => {
  if (!adminStore.isLoggedIn) {
    router.push('/admin/login');
  }
});
</script>

<style scoped>
/* Layout */
.dashboard-layout {
  display: flex;
  align-items: flex-start;
  background: #f8f9fa;
  font-family: 'Poppins', sans-serif;
}

/* Sidebar */
.dashboard-sidebar {
  position: sticky;
  top: 0;
  /* align-self: flex-start; */
  height: 100vh; 
  background: #2f2f2f;
  /* color: #fff; */
}

/* Main */
.dashboard-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Header */
.dashboard-header {
  background: #fff;
  border-bottom: 1px solid #ddd;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.dashboard-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #524e4e;
  display: flex;
  align-items: center;
}

.dashboard-icon {
  font-size: 1.9rem;
  color: rgb(81, 79, 79);
  margin-right: 0.5rem;
}

/* Content */
.dashboard-content {
  flex: 1;
  padding: 2rem;
  background: #f9f9f9;
  overflow-y: auto;
}
</style>
