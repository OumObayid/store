<template>
  <div class="product-details container py-5" v-if="selectedProduct">
    <!-- Breadcrumb -->
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Accueil</a></li>
        <li class="breadcrumb-item">
          <a href="#">{{ selectedProduct.categorie_id }}</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ selectedProduct.nom }}
        </li>
      </ol>
    </nav>

    <div class="row g-5">
      <!-- Images -->
      <div class="col-lg-6">
        <div class="main-image shadow-sm rounded mb-3">
          <img :src="selectedImage || selectedProduct.image" class="img-fluid rounded zoom-img" alt="Produit" />
        </div>
        <div class="d-flex gap-2 flex-wrap">
          <img v-for="(img, index) in selectedProduct.images_galerie" :key="index" :src="img" class="thumbnail"
            @click="selectImage(img)" />
        </div>

      </div>

      <!-- Infos produit -->
      <div class="col-lg-6">
        <h2 class="fw-bold product-title">{{ selectedProduct.nom }}</h2>

        <!-- Prix -->
        <div class="mb-3">
          <span v-if="selectedProduct.prix_promo > 0" class="product-price me-3">{{ selectedProduct.prix_promo }}
            DH</span>
          <span :class="{
            'text-muted text-decoration-line-through':
              selectedProduct.prix_promo > 0,
            'product-price': selectedProduct.prix_promo === 0,
          }">
            {{ selectedProduct.prix }} DH
          </span>
        </div>

        <p class="text-secondary mb-4">{{ selectedProduct.description }}</p>

        <!-- Taille -->
        <div class="mb-3" v-if="tailleArray.length">
          <label class="form-label fw-semibold">Taille :</label>
          <div class="d-flex flex-wrap gap-2">
            <button v-for="size in tailleArray" :key="size" class="size-btn" :class="{ active: selectedSize === size }"
              @click="selectedSize = size">
              {{ size }}
            </button>
          </div>
        </div>

        <!-- Couleur -->
        <div class="mb-3" v-if="colorsArray.length">
          <label class="form-label fw-semibold">Couleur :</label>
          <div class="d-flex gap-2">
            <span v-for="(color, index) in colorsArray" :key="index" :style="{ backgroundColor: color }"
              class="color-circle" :class="{ active: selectedColor === color }" @click="selectedColor = color"></span>
          </div>
        </div>

        <!-- Quantité -->
        <div class="mb-3 d-flex align-items-center gap-2">
          <label class="form-label fw-semibold mb-0">Quantité :</label>
          <input type="number" class="form-control w-auto" v-model.number="quantity" min="1" />
        </div>

        <!-- Boutons -->
        <div class="d-flex gap-3 mt-4">
          <button class="btn btn-gold btn-lg" @click="addToCart">
            <i class="bi bi-cart-plus me-2"></i> Ajouter au panier
          </button>
          <button class="btn btn-outline-gold btn-lg" @click="addToWishlist">
            <i class="bi bi-heart me-2"></i> Favoris
          </button>
        </div>
      </div>
    </div>

    <!-- Onglets -->
    <div class="mt-5">
      <ul class="nav nav-tabs" id="productTabs" role="tablist">
        <li class="nav-item">
          <button class="nav-link active" id="desc-tab" data-bs-toggle="tab" data-bs-target="#desc" type="button">
            Description
          </button>
        </li>
        <li class="nav-item">
          <button class="nav-link" id="details-tab" data-bs-toggle="tab" data-bs-target="#details" type="button">
            Détails
          </button>
        </li>
        <li class="nav-item">
          <button class="nav-link" id="avis-tab" data-bs-toggle="tab" data-bs-target="#avis" type="button">
            Avis
          </button>
        </li>
      </ul>
      <div class="tab-content p-4 bg-light rounded-bottom shadow-sm">
        <div class="tab-pane fade show active" id="desc">
          <p>{{ selectedProduct.description }}</p>
        </div>
        <div class="tab-pane fade" id="details">
          <ul>
            <li><strong>Stock :</strong> {{ selectedProduct.stock }}</li>
            <li><strong>Statut :</strong> {{ selectedProduct.status }}</li>
          </ul>
        </div>
        <div class="tab-pane fade" id="avis">
          <p>Aucun avis pour le moment.</p>
        </div>
      </div>
    </div>

    <!-- Produits similaires -->
    <div class="mt-5" v-if="similarProducts.length">
      <h4 class="fw-bold text-dark mb-3">Produits similaires</h4>
      <div class="row row-cols-2 row-cols-md-4 g-4">
        <div class="col" v-for="item in similarProducts" :key="item.id">
          <div class="card product-card h-100 shadow-sm">
            <img :src="item.image" class="card-img-top" alt="Produit similaire" />
            <div class="card-body text-center">
              <h6 class="fw-semibold">{{ item.nom }}</h6>
              <p class="product-price">{{ item.prix }} DH</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useAdminProduct } from "../../composables/admin/useAdminProduct";
import { useCartStore } from "../../stores/cartStore";
import { useWishlistStore } from "../../stores/wishlistStore";
import { useToast } from "vue-toastification";

const route = useRoute();
const { selectedProduct, fetchProductById } = useAdminProduct();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const toast = useToast();

const selectedImage = ref(null);
const selectedSize = ref(null);
const selectedColor = ref(null);
const quantity = ref(1);
const tailleArray = ref([]);
const colorsArray = ref([]);
const similarProducts = ref([]);

onMounted(async () => {
  await fetchProductById(route.params.id);

  if (selectedProduct.value) {
    selectedImage.value = selectedProduct.value.image;

    // Taille
    tailleArray.value = selectedProduct.value.taille
      ? selectedProduct.value.taille.split(",")
      : [];
    selectedSize.value = tailleArray.value.length ? tailleArray.value[0] : null;

    // Couleur
    colorsArray.value = selectedProduct.value.couleur
      ? selectedProduct.value.couleur.split(",")
      : [];

    // Produits similaires (exemple)
    // Ici tu peux adapter pour ton store global ou API
    similarProducts.value = [];
  }
});

function selectImage(img) {
  selectedImage.value = img;
}

function addToCart() {
  if (!selectedProduct.value) return;

  const productToAdd = {
    ...selectedProduct.value,
    quantity: quantity.value,
  };

  cartStore.addToCart(productToAdd);
  toast.success(`${selectedProduct.value.nom} ajouté au panier !`);
}

function addToWishlist() {
  wishlistStore.addToWishlist(selectedProduct.value);
  toast.success("Produit ajouté aux favoris !");
}
</script>


<style scoped>

/* Zoom image principale */
.zoom-img {
  transition: transform 0.4s ease;
}

.zoom-img:hover {
  transform: scale(1.05);
}

.product-title {
  font-size: 1.8rem;
  color: var(--dark);
}

.product-price {
  color: var(--gold);
  font-weight: bold;
}

/* Boutons tailles */
.size-btn {
  border: 1px solid var(--dark);
  padding: 0.4rem 1rem;
  border-radius: 20px;
  background: white;
  cursor: pointer;
  transition: 0.3s;
}

.size-btn.active,
.size-btn:hover {
  background: var(--gold);
  color: white;
  border-color: var(--gold);
}

/* Couleurs */
.color-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  transition: 0.3s;
}

.color-circle.active {
  border: 2px solid var(--gold);
  transform: scale(1.1);
}

/* Boutons */
.btn-gold {
  background: var(--gold);
  color: white;
  border-radius: 30px;
  padding: 0.6rem 1.5rem;
}

.btn-gold:hover {
  background: #b89232;
}

.btn-outline-gold {
  border: 2px solid var(--gold);
  color: var(--gold);
  border-radius: 30px;
  padding: 0.6rem 1.5rem;
}

.btn-outline-gold:hover {
  background: var(--gold);
  color: white;
}

/* Thumbnails */
.thumbnail {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.thumbnail:hover,
.thumbnail:active {
  border: 2px solid var(--gold);
}

/* Carte produit */
.product-card {
  border: none;
  transition: 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

/* Onglets */
.nav-tabs .nav-link {
  color: var(--dark);
  font-weight: 600;
  border: none;
}

.nav-tabs .nav-link.active {
  border-bottom: 3px solid var(--gold);
  color: var(--gold);
}
</style>
