<template>
  <div class="dashboard-layout">
    <div class="dashboard-sidebar mt-0">
      <DashboardSidebar />
    </div>
  
    <div class="dashboard-content">      
      <router-view />
    </div>
  </div>
</template>

<script setup>
import DashboardSidebar from '../components/DashboardSidebar.vue';
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
