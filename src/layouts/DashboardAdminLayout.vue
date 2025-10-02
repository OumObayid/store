<template>
  <div class="d-flex min-vh-100">
    <!-- Sidebar -->
    <DashboardAdminSidebar :show="sidebarVisible" @toggle="toggleSidebar" />

    <!-- Main -->
    <div class="flex-grow-1 d-flex flex-column transition-main"
         :class="{ 'expanded': !sidebarVisible }">
      <DashboardAdminHeader />
      <main class="p-4 bg-light-gray flex-grow-1">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DashboardAdminSidebar from "../components/DashboardAdminSidebar.vue";
import DashboardAdminHeader from "../components/DashboardAdminHeader.vue";

const sidebarVisible = ref(true);
function toggleSidebar() {
  sidebarVisible.value = !sidebarVisible.value;
}
</script>

<style>
.bg-light-gray { background-color: #f5f5f5; }
.transition-main { transition: all 0.3s ease; }
.expanded { margin-left: 0 !important; }
</style>
