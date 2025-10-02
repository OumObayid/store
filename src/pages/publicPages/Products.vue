<script setup>
import { ref, computed } from 'vue';
import { useProductStore } from '../../stores/productStore';
import { useCategorieStore } from '../../stores/categorieStore';
import { storeToRefs } from 'pinia';

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

// Couleurs
const colors = ref(['#FF5733', '#33FF57', '#3357FF', '#F0F033', '#8E33FF']);

// Filtres
const filters = ref({
  category: [],
  prix: 1000,
  color: '',
});

// Produits filtrés
const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchCategory = filters.value.category.length
      ? filters.value.category.includes(String(p.categorie_id))
      : true;
    const matchPrice = p.prix <= filters.value.prix;
    const matchColor = filters.value.color ? p.color === filters.value.color : true;
    return matchCategory && matchPrice && matchColor;
  });
});

// Appliquer couleur
const applyColorFilter = (color) => {
  filters.value.color = filters.value.color === color ? '' : color;
}

// Reset filtres
const resetFilters = () => {
  filters.value = { category: [], prix: 1000, color: '' };
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

          <!-- Couleurs -->
          <div class="mb-3">
            <h5 class="fw-semibold mb-3">Couleurs</h5>
            <div class="d-flex justify-content-start gap-3">
              <span v-for="color in colors" :key="color" @click="applyColorFilter(color)"
                :style="{ backgroundColor: color, width: '25px', height: '25px', borderRadius: '50%', cursor: 'pointer', margin: '2px', border: filters.color === color ? '2px solid black' : '1px solid #ccc' }">
              </span>
            </div>
          </div>
<hr>
          <!-- Prix -->
          <div class="mb-3">
            <h5 class="fw-semibold mb-3">Prix</h5>
            <input type="range" class="form-range" min="0" max="1000" v-model="filters.prix" />
            <p class="small text-muted">Up to ${{ filters.prix }}</p>
          </div>
<hr>
          <button class="btn btn-sm btn-secondary" @click="resetFilters">Reset Filters</button>
        </div>
      </aside>

      <!-- Produits -->
      <div class="col-lg-9">
        <div class="row g-4">
          <div v-for="p in filteredProducts" :key="p.id" class="col-6 col-md-4 col-lg-3  ">
            <div class="card border shadow product-card h-100 position-relative overflow-hidden">

              <!-- Badge promo -->
              <span v-if="p.discount" class="badge bg-danger discount-badge">
                -{{ p.discount }}%
              </span>

              <!-- Image produit -->
              <div class="product-image-wrapper">
                <router-link :to="`/product/${p.id}`">
                  <img :src="p.image" class="card-img-top" />
                </router-link>
              </div>

              <!-- Overlay icons -->
              <!-- <div class="overlay-icons d-flex flex-column gap-2 position-absolute top-50 end-0 translate-middle-y me-2">
                <button class="btn btn-sm btn-light shadow rounded-circle" @click="addToWishlist(p)">
                  <i class="bi bi-heart"></i>
                </button>                
              </div> -->

              <!-- Infos produit -->
              <div class="card-body">
                <p class="text-muted small">{{ getCategoryName(p.categorie_id) }}</p>
                <h5 class="fw-semibold product-title">{{ p.nom }}</h5>

                <!-- Prix + bouton -->
                <div class="d-flex align-items-center justify-content-between mt-2">
                  <span class="fw-bold text-dark">${{ p.prix }}</span>
                  <button class="btn btn-md btn-light  rounded-circle" @click="addToCart(p)">
                    <i class="bi bi-cart-plus"></i>
                  </button>
                </div>
              </div>

            </div>
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


</style>