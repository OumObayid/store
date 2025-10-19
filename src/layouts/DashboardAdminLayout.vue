<template>
  <div class="d-md-flex min-vh-100">
    <!-- Sidebar -->
    <div class="container-sidebar-admin">
      <DashboardAdminSidebar :show="sidebarVisible" @toggle="toggleSidebar" />
    </div>
    <!-- Main -->
    <div class="flex-grow-1 d-flex flex-column transition-main" :class="{ 'expanded': !sidebarVisible }">

      <main class="p-4 bg-light-gray flex-grow-1">
        <!-- HEADER (Titre de la page + actions) -->

        <header class=" d-flex flex-column ">
          <div class="dashboard-header py-3">
            <i style="color:var(--gold)" class="dashboard-icon" :class="route.meta.icon"></i>
            <div>
              <div class="h3 dashboard-title">{{ pageTitle }}</div>
              <p class="d-none d-md-block">{{ pageSubtitle }}</p>
            </div>
          </div>
          <hr class="mt-0 pt-0" />
        </header>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import DashboardAdminSidebar from "../components/DashboardAdminSidebar.vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
const { t } = useI18n()
// Récupérer la route active
const route = useRoute();
const pageTitle = computed(() => t(route.meta?.titleKey) || "");
const pageSubtitle = computed(() => t(route.meta?.subtitleKey) || "");
const sidebarVisible = ref(true);
function toggleSidebar() {
  sidebarVisible.value = !sidebarVisible.value;
}
</script>

<style>
/* Header */
.dashboard-header {
  padding: 2rem .8rem;
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
 

@media (max-width: 768px) {
  .container-sidebar-admin {
    width: 100% !important;
    background-color: rgba(54, 48, 18, 0.726);
  }

}

.bg-light-gray {
  background-color: #f5f5f5;
}

.transition-main {
  transition: all 0.3s ease;
}

.expanded {
  margin-left: 0 !important;
}
</style>
