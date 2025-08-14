<template>
  <div class="sidebar">
    <ul class="list-group">
      <li class="list-group-item">
        <router-link to="/admin" class="nav-link">Dashboard</router-link>
      </li>
      <li class="list-group-item">
        <router-link to="/admin/products" class="nav-link">Products</router-link>
      </li>
      <li class="list-group-item">
        <router-link to="/admin/orders" class="nav-link">Orders</router-link>
      </li>
      <li class="list-group-item">
        <router-link to="/admin/users" class="nav-link">Users</router-link>
      </li>
      <li class="list-group-item">
        <span @click="handleLogout" class="nav-link">Déconnexion</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';

const router = useRouter();
const { logout } = useAuth();

const handleLogout = () => {
  logout();
  router.push('/login');
};
</script>

<style scoped>
.sidebar {
  width: 230px;
  background-color: #f4f4f4;
  border-right: 1px solid #ccc;
  background-color: darkgrey;
  min-height: var(--min-height-body);
}

.nav-link {
  color: #333;
  text-decoration: none;
  cursor: pointer;
  font-size: 1.3rem;
}

.nav-link:hover {
  color: white;
}

.list-group-item:hover {
  background-color: #333;
}
</style>
