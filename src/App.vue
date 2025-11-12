<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router'
import { useCategories } from "./composables/useCategories";
import { useProducts } from "./composables/useProducts";

import { useI18n } from 'vue-i18n';
import { useDirection } from './composables/useDirection'
import { useOrders } from './composables/useOrders';
import { useUsers } from './composables/useUsers';

const { locale } = useI18n();

// Composable pour la direction
const { dir } = useDirection()

// Vérification route admin
const route = useRoute();
const isAdminRoute = computed(() => route.path.startsWith('/admin'))


// Computed pour déterminer si on est sur login/register
const headerClasses = computed(() => {
  // Si la route est Login ou Register, retourne une string vide (pas de class)
  if (route.name === "login" || route.name === "register" || route.name === "home") {
    return "";
  }
  // Sinon retourne la classe normale
  return "height-Header";
});
// Chargement des données
const { fetchCategories } = useCategories();
const { getAllProducts } = useProducts();
const { fetchAllOrders } = useOrders();
const { fetchUsers } = useUsers();


onMounted(async () => {
  // 🟢 Charger les catégories
  await fetchCategories();
  // 🟢 Charger les produits
  await getAllProducts(); 
   // 🟢 Charger les users
  await fetchUsers();
  // charger les commandes 
  await fetchAllOrders();
});
</script>

<template>
  <div class="app" :lang="locale" :dir="dir">
    <!-- Layout normal -->
    <div  class="app-layout">
      <Header  />
      <main class="app-content">
        <router-view />
      </main>
      <Footer />
    </div>

 
  </div>
</template>

<style>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

}

.app-content {
  flex: 1;
  text-align: center;
  padding: 20px auto;
}

/* Admin layout prend toute la page */
.admin-layout {
  min-height: 100vh;
  padding: 0;
  margin: 0;
}

@media (max-width:768px) {
  .bottomClasses {
    margin-bottom: 36px !important;
  }
}
</style>
