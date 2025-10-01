<template>
  <div class="container py-4">

    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap">
      <h2 class="fw-bold text-gold d-flex align-items-center">
        <i class="bi bi-box-seam me-2"></i> Gestion des Produits
      </h2>
      <button class="btn btn-gold shadow-sm">
        <i class="bi bi-plus-circle me-1"></i> Ajouter un produit
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="row g-4 mb-4">
      <div class="col-md-3 col-sm-6" v-for="stat in stats" :key="stat.label">
        <div class="card card-dashboard shadow-sm border-0">
          <div class="card-body text-center">
            <i :class="stat.icon + ' display-6 mb-3 text-gold'"></i>
            <h4 class="fw-bold mb-1">{{ stat.value }}</h4>
            <p class="text-muted mb-0">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Search & Filters -->
    <div class="row d-flex justify-content-between mb-3">
      <div class="col-md-6 col-lg-4">
        <input v-model="search" type="text" class="form-control" placeholder="🔍 Rechercher un produit..." />
      </div>
      <div class="col-md-4 col-lg-3">
        <select v-model="filter" class="form-select">
          <option value="">Toutes les catégories</option>
          <option v-for="cat in categoryStore.categories" :key="cat.id" :value="cat.id">
            {{ cat.nom }}
          </option>
        </select>

      </div>
    </div>

    <!-- Table Produits -->
    <div class="card shadow-sm border-0">
      <div class="table-responsive">
        <table class="table align-middle table-hover mb-0">
          <thead class="table-gold text-white">
            <tr>
              <th>Nom</th>
              <th>Description</th>
              <th>Prix</th>
              <th>Prix Promo</th>
              <th>Stock</th>
              <th>Catégorie</th>
              <th>Taille</th>
              <th>Status</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in filteredProducts" :key="product.id">
              <td>{{ product.nom }}</td>
              <td>{{ truncate(product.description, 20) }}</td>
              <td>{{ product.prix }} MAD</td>
              <td>{{ product.prix_promo ? product.prix_promo + ' MAD' : '-' }}</td>
              <td>{{ product.stock }}</td>
              <td>{{ getCategoryName(product.categorie_id) }}</td>
              <td>{{ product.taille || '-' }}</td>
              <td>
                <span class="badge" :class="{
                  'bg-success-subtle text-success fw-semibold': product.status.toLowerCase() === 'disponible',
                  'bg-danger-subtle text-danger fw-semibold': product.status.toLowerCase() === 'rupture',
                  'bg-warning-subtle text-warning fw-semibold': product.status.toLowerCase() === 'lowstock'
                }">
                  {{ product.status }}
                </span>
              </td>
              <td class="text-center">
                <router-link :to="`/admin/update-product/${product.id}`" class="btn btn-sm btn-outline-primary me-2" title="Modifier">
                  <i class="bi bi-pencil"></i>
                </router-link>
                <button class="btn btn-sm btn-outline-danger" title="Supprimer">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
            <tr v-if="filteredProducts.length === 0">
              <td colspan="10" class="text-center text-muted py-3">
                Aucun produit trouvé
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAdminProductStore } from "../../../stores/admin/adminProductStore";
import { useAdminCategorieStore } from "../../../stores/admin/adminCategorieStore";

const search = ref("");
const filter = ref("");

const productStore = useAdminProductStore();
const categoryStore = useAdminCategorieStore();

const productCount = computed(() => productStore.products?.length || 0)

const ProductDisponible = computed(() =>
  productStore.products?.filter(
    p => p.status?.toLowerCase() === "disponible"
  ).length || 0
);

const Rupture = computed(() =>
  productStore.products?.filter(
    p => p.status?.toLowerCase() === "rupture"
  ).length || 0
);

const ProductLowStock = computed(() =>
  productStore.products?.filter(
    p => p.status?.toLowerCase() === "lowstock"
  ).length || 0
);



onMounted(async () => {
  await productStore.fetchAllProducts();
  await categoryStore.fetchAllCategories();

})

const stats = computed(() => [
  { label: "Total Produits", value: productCount.value, icon: "bi bi-box" },
  { label: "Disponibles", value: ProductDisponible.value, icon: "bi bi-check-circle" },
  { label: "Ruptures", value: Rupture.value, icon: "bi bi-exclamation-triangle" },
  { label: "Bientôt", value: ProductLowStock.value, icon: "bi bi-exclamation-diamond" },
]);

const filteredProducts = computed(() => {
  return productStore.products?.filter(
    (p) =>
      p.nom.toLowerCase().includes(search.value.toLowerCase()) &&
      (filter.value === "" || p.categorie_id == filter.value) // double égal pour compatibilité types
  ) || [];
});

const getCategoryName = (categorie_id) => {
  const cat = categoryStore.categories.find(c => c.id === categorie_id);
  return cat ? cat.nom : '-';
};

const truncate = (text, length) => {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '…' : text;
};



</script>

<style scoped>
.text-gold {
  color: #d4af37;
}

.btn-gold {
  background: #d4af37;
  color: #fff;
  font-weight: bold;
  border-radius: 8px;
  transition: background 0.3s ease;
}

.btn-gold:hover {
  background: #b8962f;
}

/* Table Header personnalisé */
.table-gold {
  background: linear-gradient(90deg, #d4af37, #b8962f);
}

/* Card Stats */
.card-dashboard {
  border-radius: 12px;
  background: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-dashboard:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

/* Images produits */
.product-img {
  width: 55px;
  height: 55px;
  object-fit: cover;
  border-radius: 8px;
}
</style>
