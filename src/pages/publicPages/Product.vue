<template>
  <div class="product-page container-md py-5">
    <!-- Produit -->
    <div v-if="product"
      class="mt-3 mt-md-0 py-5 p-md-0 mx-1 mx-md-auto row g-4 d-md-flex align-items-center justify-content-between ">
      <!-- Image -->
      <div class="col-md-4 text-center ">
        <div>
          <h4
            :style="locale === 'fr' ? { borderLeft: '4px solid var(--bs-warning)' } : { borderRight: '4px solid var(--bs-warning)' }"
            class="fw-bold mb-5 d-md-none">{{ locale === 'fr' ? (product.nom || '') : (product.nom_ar || '') }} </h4>
        </div>
        <div class="product-image shadow-sm rounded">
          <img :src="product.image" :alt="product.nom" class="img-fluid rounded" />
        </div>
        <!-- //image gallery -->
        <!-- Galerie miniature -->
        <div class="d-flex flex-wrap gap-2 mt-3">
          <img v-for="img in product?.images_galerie" :key="img.id" :src="img.src" class="img-thumbnail"
            style="width:100px; cursor:pointer; transition: transform 0.2s;" data-bs-toggle="modal"
            data-bs-target="#imageModal" @click="selectedImage = img.src" />
        </div>

        <!-- Modal -->
        <div class="modal fade" id="imageModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <!-- Limiter le modal-content à la taille de l'image -->
            <div class="modal-content position-relative d-inline-block p-0 border-0 bg-transparent">
              <!-- bouton X visible au-dessus de l'image -->
              <button type="button" class="btn-close btn-close-dark position-absolute top-0 end-0 m-2"
                data-bs-dismiss="modal" aria-label="Close" style="z-index: 10;"></button>

              <!-- Image -->
              <img :src="selectedImage" class="img-fluid rounded shadow" style="display: block; max-width: 100%;" />
            </div>
          </div>
        </div>

      </div>

      <!-- Infos -->
      <div class="col-md-6">
        <h4
          :style="locale === 'fr' ? { borderLeft: '4px solid var(--bs-warning)' } : { borderRight: '4px solid var(--bs-warning)' }"
          class="fw-bold mb-5 d-none d-md-block ">{{ locale === 'fr' ? (product.nom || '') : (product.nom_ar || '') }}
        </h4>
        <div style="color:var(--orange)" class="h4  mb-3">{{ Number(product.prix).toFixed(2) }} {{ $t('dh') }}</div>
        <p class="mt-4 fs-5">{{ locale === 'fr' ? (product.description || '') : (product.description_ar || '') }}</p>
        <div class="mt-4">
          <MyButton @click="addToCartHandler" classNm=" px-4 py-1 mx-md-4 my-3" :disabled="loadingCart">
            <i class="bi bi-cart-plus "></i> {{ $t('addTocart') }}
          </MyButton>
          <MyButton @click="addToWishlist" classNm="outline py-1 mx-md-4  my-3">
            <i class="bi bi-heart "></i> {{ $t('addToWishlist') }}
          </MyButton>
        </div>
        <p v-if="messageCart" class="mt-3 text-success">{{ messageCart }}</p>
      </div>
    </div>

    <!-- Carrousel Produits similaires -->
    <hr class="my-5" />
    <div v-if="sameCategoryProducts.length" class="container py-3">
      <h5 style="color:var(--vert-olive-fonce)" class="text-center mb-4 fw-bold">
        {{ $t('ProductsInSameCategorie ') }}
      </h5>

      <div class="product-carousel" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
        <div class="product-track">
          <div v-for="(item, index) in [...sameCategoryProducts, ...sameCategoryProducts]" :key="index"
            class="product-card mb-3 mx-2 shadow-card">
            <div class="product-img-wrapper">
              <img :src="item.image" class="product-img" />
            </div>
            <p class="mt-2 fw-semibold">{{ locale === 'ar' ? item.nom_ar : item.nom }}</p>
            <div class="text-center">
              <MyButton classNm="my-3 py-1 px-3" :styleNm="{ fontSize: '14px' }"
                :onClick="() => router.push(`/product/${item.id}`)">
                {{ $t("see") }}
              </MyButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import MyButton from '../../components/MyButton.vue'
import { useProductStore } from '../../stores/productStore'
import { storeToRefs } from 'pinia'
import { useWishlistStore } from '../../stores/wishlistStore'
import { useCart } from '../../composables/useCart'
import { Toast } from '../../utils/Toast'

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n();
const productsStore = useProductStore()
const { products } = storeToRefs(productsStore)

const wishlistStore = useWishlistStore()
const { addToCartUse, error: errorCart, message: messageCart, loading: loadingCart } = useCart()

// productId réactif qui suit route.params.id
const productId = computed(() => Number(route.params.id))

// product se mettra à jour automatiquement quand l'ID change
const product = computed(() =>
  products.value.find(p => Number(p.id) === productId.value)
)

// produits de même catégorie (mise à jour automatique aussi)
const sameCategoryProducts = computed(() =>
  products.value.filter(
    p => p.categorie_id === product.value?.categorie_id && p.id !== product.value?.id
  )
)

async function addToCartHandler() {
  await addToCartUse({ product: product.value, quantity: 1 })
  if (errorCart) Toast(t('productAddedSuccess'), 'success');
  else Toast(t('productAddedErrorToCart'), 'error');
}

function addToWishlist() {
  wishlistStore.addToWishlist(product.value)
  // toast.success('Produit ajouté aux favoris !')
  Toast(t('productAddedFavoris'), 'success')
}

import { ref } from "vue";

const selectedImage = ref(null);
</script>


<style scoped>
.product-image {
  position: relative;
  display: inline-block;
  overflow: hidden;
  border-radius: 20px;
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: transform 0.6s ease, box-shadow 0.6s ease;
}

.product-image img {
  width: 100%;
  height: auto;
  transition: transform 0.6s ease;
}

.product-image:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15);
}

.product-image:hover img {
  transform: scale(1.07);
}

/* 🎠 Carrousel */
.product-carousel {
  overflow: hidden;
  width: 100%;
}

.product-track {
  display: flex;
  gap: 1rem;
  width: max-content;
  animation: scroll-ltr 120s linear infinite;
  animation-play-state: running;
}

.product-carousel[dir="rtl"] .product-track {
  animation: scroll-rtl 120s linear infinite;
  animation-play-state: running;
}

.product-carousel:hover .product-track {
  animation-play-state: paused;
}

.product-card {
  flex: 0 0 auto;
  border-radius: 0.75rem;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s;
}

.shadow-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid #eee;
}

.product-img-wrapper {
  width: 100%;
  height: 14rem;
  overflow: hidden;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.product-card p {
  padding: 0.5rem;
  margin: 0;
}

@keyframes scroll-ltr {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

@keyframes scroll-rtl {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(50%);
  }
}
</style>
