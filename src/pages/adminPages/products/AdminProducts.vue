<template>
  <div class="py-3">
    <!-- Header -->
    <div class="d-flex justify-content-end  mb-3 ">

      <MyButton
      :onClick="() => router.push('/admin/add-product')"
       classNm="outline py-1">
        <i class="bi bi-plus-circle me-1"></i> Ajouter un produit
      </MyButton>
    </div>
    <!-- Stats Cards -->
    <div class="row g-4 mb-4">
      <div class="col-md-3 col-sm-6" v-for="stat in stats" :key="stat.label">
        <div class="card card-dashboard shadow-sm border-0">
          <div class="card-body text-center">
            <i :class="stat.icon + ' display-6 mb-3 text-gold'"></i>
            <p class="h4 fw-bold mb-1">{{ stat.value }}</p>
            <p class="text-muted mb-0">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Search & Filters -->
    <div class="row d-flex justify-content-between mb-3">
      <div class="col-md-4 col-lg-3 mb-2">
        <input v-model="search" type="text" class="form-control" placeholder="🔍 Rechercher un produit..." />
      </div>
      <div class="col-md-3  mb-2">
        <select v-model="filterCategory" class="form-select">
          <option value="">Toutes les catégories</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.nom }}
          </option>
        </select>
      </div>
      <div class="col-md-3  mb-2">
        <select v-model="filterStock" class="form-select">
          <option value="">Tous</option>
          <option value="disponible">Disponible</option>
          <option value="sous-stock">Sous stock</option>
          <option value="rupture">Rupture</option>
        </select>
      </div>
    </div>

    <h5>Liste des produits ({{ filteredProducts?.length }})</h5>
    <div class="card shadow-sm border-0">
      <div class="table-responsive">
        <table class="table align-middle table-hover mb-0">
          <thead class="table-gold text-white">
            <tr>
              <th>Image</th>
              <th>Nom</th>
              <th>Prix en Dh</th>
              <th>Catégorie</th>
              <th>Stock mini</th>
              <th>Stock actuel</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in filteredProducts" :key="product.id">
              <td>
                <img :src="product.image" :alt="product.nom" class="product-img" />
              </td>
              <td>{{ product.nom }}
                <div v-for="img in product.images_galerie" :key="img.id">{{ img.id }}</div>

               
              </td>
              <td>{{ Number(product.prix).toFixed(2) }}</td>
              <td>{{ product.categorie_nom }}</td>
              <td>{{ product.stock_mini }}</td>
              <td :class="getStockClass(product)">
                {{ product.stock }}
              </td>

              <td class="text-center">
                <button class="btn btn-sm btn-outline-success me-2" title="Modifier" @click="openModal(product.id)">
                  <i class="bi bi-eye"></i>
                </button>
                <router-link :to="`/admin/update-product/${product.id}`" class="btn btn-sm btn-outline-primary me-2"
                  title="Modifier">
                  <i class="bi bi-pencil"></i>
                </router-link>
                <button class="btn btn-sm btn-outline-danger" title="Supprimer"
                  @click="handleDeleteProduct(product.id)">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>

            <tr v-if="filteredProducts.length === 0 && !productStore.loading">
              <td colspan="10" class="text-center text-muted py-3">Aucun produit trouvé</td>
            </tr>

            <tr v-if="productStore.loading">
              <td colspan="10" class="text-center py-3">
                <div class="spinner-border text-gold" role="status">
                  <span class="visually-hidden">Chargement...</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- Modal Bootstrap -->
  <div class="modal fade" ref="modal" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <!-- Header -->
        <div style="background-color: var(--gold);" class="modal-header  text-white py-2">
          <h5 class="modal-title">Produit Nº : {{ selectedProduct?.id }}</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row g-4">

              <!-- Informations principales (disposées en 2 colonnes) -->
              <div class="">
                <div class="row mb-2">
                  <div class="col-md-6">
                    <strong>Nom :</strong> {{ selectedProduct?.nom }}
                  </div>
                  <div class="col-md-6">
                    <strong>Nom arabe :</strong> {{ selectedProduct?.nom_ar }}
                  </div>
                </div>
                <div class="row mb-2">
                  <div class="col-md-6">
                    <strong>Catégorie :</strong> {{ selectedProduct?.categorie_nom }}
                  </div>
                  <div class="col-md-6">
                    <strong>Catégorie arabe :</strong> {{ selectedProduct?.categorie_nom_ar }}
                  </div>
                </div>
                <div class="row mb-2">
                  <div class="col-md-6">
                    <strong>Stock mini :</strong> {{ selectedProduct?.stock_mini }}
                  </div>
                  <div class="col-md-6">
                    <strong>Stock actuel :</strong> <span :class="getStockClass(selectedProduct)">{{
                      selectedProduct?.stock }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <strong>Description :</strong> {{ selectedProduct?.description }}
                  </div>
                  <div class="col-md-6">
                    <strong>Description arabe :</strong> {{ selectedProduct?.description_ar }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Galerie images -->
            <div class="mt-4 d-md-flex justify-content-evenly align-items-center">
              <!-- Image principale -->
              <div class="col-md-4 text-center">
                <img :src="selectedProduct?.image" style="height:150px;" class="img-fluid rounded  mb-3"
                  alt="Image produit">
              </div>
              <div v-if="selectedProduct?.images_galerie?.length">
                <h6>Galerie</h6>
                <div class="d-flex flex-wrap gap-2">
                  <img v-for="img in selectedProduct?.images_galerie" :key="img.id" :src="img.src" class="img-thumbnail"
                    style="width:100px;">
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useProductStore } from "../../../stores/productStore";
import { useCategorieStore } from "../../../stores/categorieStore";
import { storeToRefs } from "pinia";
import { useProducts } from "../../../composables/useProducts";
import MyButton from "../../../components/MyButton.vue";
import { useRouter } from "vue-router";
const router=useRouter();
const search = ref("");
const filterCategory = ref("");
const filterStock = ref("");
const productStore = useProductStore();
const { products } = storeToRefs(productStore);

const categoryStore = useCategorieStore();
const { categories } = storeToRefs(categoryStore)

//useProducts
const { error, deleteProduct } = useProducts()
// Statistiques
const availableProducts = computed(() =>
  products.value?.filter(p => Number(p.stock) >= Number(p.stock_mini)).length || 0
);

const lowStockProducts = computed(() =>
  products.value?.filter(p => Number(p.stock) > 0 && Number(p.stock) < Number(p.stock_mini)).length || 0
);

const outOfStockProducts = computed(() =>
  products.value?.filter(p => Number(p.stock) === 0).length || 0
);

// Stats à afficher
const stats = computed(() => [
  { label: 'Total Produits', value: products.value?.length || 0, icon: 'bi bi-box' },
  { label: 'Disponible', value: availableProducts.value, icon: 'bi bi-check-circle' },
  { label: 'Sous-stock', value: lowStockProducts.value, icon: 'bi bi-exclamation-diamond' },
  { label: 'Rupture', value: outOfStockProducts.value, icon: 'bi bi-exclamation-triangle' },
]);

// Filtrage des produits
const filteredProducts = computed(() => {
  return products.value?.filter(p => {
    const matchName = p.nom?.toLowerCase().includes(search.value.toLowerCase());
    const matchCat = filterCategory.value === "" || Number(p.categorie_id) === Number(filterCategory.value);
    const matchStock = filterStock.value === "" ||
      (filterStock.value === "disponible" && Number(p.stock) >= Number(p.stock_mini)) ||
      (filterStock.value === "sous-stock" && Number(p.stock) > 0 && Number(p.stock) < Number(p.stock_mini)) ||
      (filterStock.value === "rupture" && Number(p.stock) === 0);
    return matchName && matchCat && matchStock;
  }) || [];
});


// Classe pour stock
const getStockClass = (product) => {
  if (Number(product?.stock) === 0) return 'text-danger fw-bold';
  if (Number(product?.stock) < Number(product?.stock_mini)) return 'text-warning fw-bold';
  return 'text-success fw-semibold';
};

// Supprimer un produit
const handleDeleteProduct = async (id) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer ce produit ?`)) {
    await deleteProduct(id);
    if (!error.value) alert("Produit supprimé avec succès.")
    else {
      console.log('error :', error.value);
      alert("Erreur dans la suppression de votre produit");
    }
  }
};


//------------script pour modal
const selectedProduct = ref(null);
const modal = ref(null);
let bsModal = null;

const openModal = (productId) => {
  selectedProduct.value = products.value.find(p => Number(p.id) === Number(productId));
  if (!bsModal) bsModal = new bootstrap.Modal(modal.value, { keyboard: false });
  bsModal.show();
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
  color: #fff;
}

.table-gold {
  background: linear-gradient(90deg, #d4af37, #b8962f);
}

.card-dashboard {
  border-radius: 12px;
  background: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-dashboard:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.product-img {
  width: 55px;
  height: 55px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #dee2e6;
  background-color: #f8f9fa;
}

.spinner-border.text-gold {
  color: #d4af37 !important;
}

.text-success {
  color: #198754 !important;
}

.text-warning {
  color: #ffc107 !important;
}

.text-danger {
  color: #dc3545 !important;
}
</style>
