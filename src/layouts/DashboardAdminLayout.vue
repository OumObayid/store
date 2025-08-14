<template>
  <div class="dashboard-layout">
    <div class="dashboard-sidebar mt-0">
      <DashboardAdminSidebar />
    </div>
  
    <div class="dashboard-content">      
      <router-view />
    </div>
  </div>
</template>

<script setup>
import DashboardAdminSidebar from '../components/DashboardAdminSidebar.vue';
</script>

<style scoped>
.dashboard-layout {
  display: flex;

}

.dashboard-sidebar {
  width: 230px;
  background-color: #f4f4f4;
  border-right: 1px solid #ccc;
  background-color: darkgrey;
}

.dashboard-content {
  flex: 1;
  display: flex;
  flex-direction: column;
 
}
</style>
