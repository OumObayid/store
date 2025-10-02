<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router'

// Stores Vitrine
import { useProductStore } from './stores/productStore.js';
import { useCategorieStore } from './stores/categorieStore.js';

// Stores Admin
import { useAdminProductStore } from './stores/admin/adminProductStore.js';
import { useAdminCategorieStore } from './stores/admin/adminCategorieStore.js';

// Services
import { getAllProducts } from './services/productService.js';
import { getAllCategories } from './services/categorieService.js';
import { adminProductService } from './services/admin/adminProductService.js';
import { adminCategorieService } from './services/admin/adminCategorieService.js';

// Composable pour la direction
import { useDirection } from './composables/useDirection'
const { dir } = useDirection()

// Vérification route admin
const route = useRoute();
const isAdminRoute = computed(() => route.path.startsWith('/admin'))

// Stores
const productStore = useProductStore();
const categoryStore = useCategorieStore();
const adminProductStore = useAdminProductStore();
const adminCategorieStore = useAdminCategorieStore();
// Computed pour déterminer si on est sur login/register
const headerClasses = computed(() => {
  // Si la route est Login ou Register, retourne une string vide (pas de class)
  if (route.name === "login" || route.name === "register" || route.name==="home") {
    return "";
  }
  // Sinon retourne la classe normale
  return "height-Header";
});
// Chargement des données
onMounted(async () => {
    console.log('route.name :', route.name);

  try {
    if (isAdminRoute.value) {
      // Admin : CRUD complet
      const [resProducts, resCategories] = await Promise.all([
        adminProductService.getAllProductsAdmin(),
        adminCategorieService.getAllCategoriesAdmin()
      ]);

      if (resProducts.data.success) adminProductStore.products = resProducts.data.products;
      if (resCategories.data.success) adminCategorieStore.categories = resCategories.data.dataCat;

    } else {
      // Vitrine : lecture seule
      const [resProducts, resCategories] = await Promise.all([
        getAllProducts(),
        getAllCategories()
      ]);

      if (resProducts.data.success) productStore.setProducts(resProducts.data.products);
      if (resCategories.data.success) categoryStore.setCategories(resCategories.data.dataCat);
    }
  } catch (err) {
    console.error('Erreur lors du chargement des données :', err);
  }


});
</script>

<template>
  <div :dir="dir">
    <!-- Layout normal -->
    <div v-if="!isAdminRoute" class="app-layout">
      <Header :class="headerClasses" />
      <main class="app-content">
        <router-view />
      </main>
      <Footer />
    </div>

    <!-- Layout admin minimal -->
    <div v-else class="admin-layout">
      <router-view />
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
}

/* Admin layout prend toute la page */
.admin-layout {
  min-height: 100vh;
  padding: 0;
  margin: 0;
}

.height-Header {
}
</style>
