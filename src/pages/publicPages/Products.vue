<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '../../stores/productStore';
import { useCategorieStore } from '../../stores/categorieStore';
import { storeToRefs } from 'pinia';
import MyButton from '../../components/MyButton.vue';
import { useI18n } from 'vue-i18n'; // <- i18n

// i18n
const { locale } = useI18n();

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

// Fonction utilitaire pour récupérer le nom d'une catégorie selon la langue
const getCategoryName = (id) => {
  const cat = categories.value.find(c => c.id === id);
  if (!cat) return "Inconnue";
  return locale.value === 'ar' && cat.nom_ar ? cat.nom_ar : cat.nom;
};

// Fonction utilitaire pour récupérer nom produit selon la langue
const getProductName = (product) => locale.value === 'ar' && product.nom_ar ? product.nom_ar : product.nom;

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
      ? getProductName(p).toLowerCase().includes(filters.value.search)
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
  filters.value = { category: [], prix: 1000 };
  router.push("/products");
}

function addToWishlist(product) {
  alert(`Produit ajouté aux favoris : ${getProductName(product)}`);
}

function addToCart(product) {
  alert(`Produit ajouté au panier : ${getProductName(product)}`);
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
            <h5 class="fw-semibold mb-2">{{ $t('categories') }}</h5>
            <ul class="list-unstyled category-list">
              <li v-for="cat in categories" :key="cat.id"
                class="mb-1 d-flex justify-content-between align-items-center">
                <div>
                  <input type="checkbox" class="form-check-input mx-2" v-model="filters.category"
                    :value="String(cat.id)" />
                  <label class="mb-0">{{ locale === 'ar' ? cat.nom_ar : cat.nom }}</label>
                </div>
              </li>
            </ul>
          </div>
          <hr>

          <!-- Prix -->
          <div class="mb-3">
            <h5 class="fw-semibold mb-3">{{ $t('price') }}</h5>
            <input type="range" class="form-range" min="0" max="500" v-model="filters.prix" />
            <p class="small text-muted">{{ $t('up_to') }} ${{ filters.prix }}</p>
          </div>
          <hr>
          <button class="btn btn-sm btn-secondary" @click="resetFilters">{{ $t('reset_filters') }}</button>
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
                <img :src="p.image" class="img-card card-img-top" />
              </div>

              <!-- Infos produit -->
              <div class="card-body">
                <p class="text-muted small">{{ getCategoryName(p.categorie_id) }}</p>
                <h5 class="fw-semibold product-title">{{ getProductName(p) }}</h5>

                <!-- Prix + bouton -->
                <div class="d-flex align-items-center justify-content-between mt-2">
                  <span class="fw-bold text-dark">${{ p.prix }}</span>
                  <MyButton classNm="my-3 py-1" :styleNm="{ backgroundColor: 'var(--gold)', fontSize: '14px' }"
                    :onClick="() => router.push(`/product/${p.id}`)">
                    {{ $t("see") }}
                  </MyButton>
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
.product-card {
  display: flex;
  flex-direction: column;
  border: none;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  background: #fff;
  height: 100%;
  /* assure que la carte prend toute la hauteur du parent */
}

.img-card {
  width: 100%;
  height: 200px;
  /* hauteur fixe pour toutes les images */
  object-fit: cover;
  /* l'image remplit le conteneur sans déformation */
}

.card-body {
  flex: 1;
  /* prend tout l’espace restant pour aligner prix + bouton en bas */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>