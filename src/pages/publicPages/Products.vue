<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '../../stores/productStore';
import { useCategorieStore } from '../../stores/categorieStore';
import { storeToRefs } from 'pinia';

// Route actuelle pour récupérer le paramètre
const route = useRoute();
const router = useRouter();
const searchQuery = ref(route.params.query || '');

// Produits
const productsStore = useProductStore();
const { products } = storeToRefs(productsStore);

// Catégories
const categoriesStore = useCategorieStore();
const { categories } = storeToRefs(categoriesStore);

// Fonction utilitaire pour récupérer le nom d'une catégorie
const getCategoryName = (id) => {
  const cat = categories.value.find(c => c.id === id);
  return cat ? cat.nom : "Inconnue";
};


// Filtres
const filters = ref({
  category: [],
  prix: 500,
  color: '',
  search: searchQuery.value.toLowerCase()  // initialisation avec query
});

// Produits filtrés
const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchCategory = filters.value.category.length
      ? filters.value.category.includes(String(p.categorie_id))
      : true;
    const matchPrice = p.prix <= filters.value.prix;
    const matchColor = filters.value.color ? p.color === filters.value.color : true;
    const matchSearch = filters.value.search
      ? p.nom.toLowerCase().includes(filters.value.search)
      : true;
    return matchCategory && matchPrice && matchColor && matchSearch;
  });
});

// Watcher pour mettre à jour le filtre si la route change
watch(
  () => route.params.query,
  (newQuery) => {
    filters.value.search = (newQuery || '').toLowerCase();
  }
);



// Reset filtres
const resetFilters = () => {
  filters.value = { category: [], prix: 1000};
  router.push("/products");
}

function addToWishlist(product) {
  alert(`Produit ajouté aux favoris : ${product.nom}`);
}

function addToCart(product) {
  alert(`Produit ajouté au panier : ${product.nom}`);
}
</script>

<template>
  <div class="container-fluid pt-3">
    <div class="row">
      <!-- Sidebar Filtres -->
      <aside class="col-lg-3 mb-4">
        <div class="filter-sidebar p-3 rounded-3 shadow bg-white">
          <!-- Catégories -->
          <div class="mb-3">
            <h5 class="fw-semibold mb-2">Catégories</h5>
            <ul class="list-unstyled category-list">
              <li v-for="cat in categories" :key="cat.id"
                class="mb-1 d-flex justify-content-between align-items-center">
                <div>
                  <input type="checkbox" class="form-check-input me-2" v-model="filters.category"
                    :value="String(cat.id)" />
                  <label class="mb-0">{{ cat.nom }}</label>
                </div>
              </li>
            </ul>
          </div>
          <hr>

          <!-- Prix -->
          <div class="mb-3">
            <h5 class="fw-semibold mb-3">Prix</h5>
            <input type="range" class="form-range" min="0" max="500" v-model="filters.prix" />
            <p class="small text-muted">Up to ${{ filters.prix }}</p>
          </div>
          <hr>
          <button class="btn btn-sm btn-secondary" @click="resetFilters">Reset Filters</button>
        </div>
      </aside>

      <!-- Produits -->
      <div class="col-lg-9">
        <div class="row g-4">
          <div v-for="p in filteredProducts" :key="p.id" class="col-6 col-md-4 col-lg-3">
            <div class="card border shadow product-card h-100 position-relative overflow-hidden">
              <!-- Badge promo -->
              <span v-if="p.discount" class="badge bg-danger discount-badge">
                -{{ p.discount }}%
              </span>

              <!-- Image produit -->
              <div>
                <router-link :to="`/product/${p.id}`">
                  <img :src="p.image"  class="img-card card-img-top" />
                </router-link>
              </div>

              <!-- Infos produit -->
              <div class="card-body">
                <p class="text-muted small">{{ getCategoryName(p.categorie_id) }}</p>
                <h5 class="fw-semibold product-title">{{ p.nom }}</h5>

                <!-- Prix + bouton -->
                <div class="d-flex align-items-center justify-content-between mt-2">
                  <span class="fw-bold text-dark">${{ p.prix }}</span>
                  <button class="btn btn-md btn-light rounded-circle" @click="addToCart(p)">
                    <i class="bi bi-cart-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="filteredProducts.length === 0" class="text-center text-muted mt-4">
            Aucun produit trouvé pour "{{ filters.search }}"
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-sidebar {
  border: 1px solid #eee;
  padding-bottom: 10px;
}

/* Carte produit */
.product-card {
  border: none;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  background: #fff;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* Image effet zoom */
.product-image-wrapper {
  overflow: hidden;
}

.product-card img {
  transition: transform 0.4s ease;
}

.product-card:hover img {
  transform: scale(1.1);
}

/* Overlay icons */
.overlay-icons {
  opacity: 0;
  transition: opacity 0.4s, transform 0.4s;
  transform: translateX(50px);
}

.product-card:hover .overlay-icons {
  opacity: 1;
  transform: translateX(0);
}

.overlay-icons .btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Badge promo */
.discount-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 0.75rem;
  padding: 5px 8px;
  border-radius: 8px;
}

/* Titre produit */
.product-title {
  font-size: 0.95rem;
  min-height: 40px;
}

.category-list li {
  padding: 4px 0;
  border-bottom: 1px solid #f0f0f0;
}

.category-list li:last-child {
  border-bottom: none;
}

.category-list input[type="checkbox"] {
  cursor: pointer;
}

.category-list label {
  cursor: pointer;
}

.img-card{
  height: 200px;
  width: 100%;
}
</style>
