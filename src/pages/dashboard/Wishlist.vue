<script setup>
import { useRouter } from "vue-router";
import MyButton from "../../components/MyButton.vue";
import { useWishlistStore } from "../../stores/wishlistStore";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";

const wishlistStore = useWishlistStore();
const router = useRouter();
// states
const { wishlist } = storeToRefs(wishlistStore);
const { locale } = useI18n();
// actions
const { removeFromWishlist, clearWishlist } = wishlistStore;
</script>

<template>
  <div class="container my-2">
    <!-- Si vide -->
    <div v-if="!wishlist.length" class="text-center text-muted">
      <div class="text-center py-5 empty-cart">
        <div class="d-flex justify-content-center align-items-center">
          <i style="background-color: var(--orange-clair);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center; color: var(--gold);" class="p-5 bi bi-heart display-3"></i>
        </div>

        <p class="h5  mt-5 ">{{ $t('noFavorites') }}</p>
        <p>{{ $t('exploreProducts') }}</p>
        <MyButton @click="() => router.push('/products')" classNm="py-1 mt-5">
          <i class="bi bi-bag me-2 "></i> {{ $t('startShopping') }}
        </MyButton>
      </div>
    </div>

    <!-- Liste des favoris -->
    <div class="row g-3" v-else>
      <div v-for="item in wishlist" :key="item.id" class="">
        <div class="card wishlist-card shadow-sm d--md-flex  align-items-stretch">
          <!-- Image -->
          <div class="wishlist-img-wrapper flex-shrink-0">
            <img :src="item.image" class="wishlist-img" alt="Produit" />
          </div>

          <!-- Contenu -->
          <div class="card-body d-flex  justify-content-between">
            <div class=" d-flex flex-column justify-content-center align-items-center">
              <div class="text-center">
                <h6 class="card-title">{{ locale === 'fr' ? item.nom : item.nom_ar }}</h6>
                <p class="card-text text-muted small">{{ item.prix }} {{ $t("dh") }}</p>
              </div>
            </div>
            <div class="d-flex flex-column justify-content-center align-items-center ">
              <MyButton classNm="py-1 mb-3 w-100 w-md-100">
                <i class="bi bi-cart"></i> {{ $t("addToCart") }}
              </MyButton>
              <MyButton classNm="py-1 mb-3 outline w-100 w-md-100" @click="removeFromWishlist(item.id)">
                <i class="bi bi-heart-fill"></i> {{ $t("removeFromFavorites") }}
              </MyButton>

            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bouton vider -->
    <div v-if="wishlist.length" class="text-end mt-4">
      <MyButton styleNm="background-color:var(--vert-olive-fonce);color:white;border:none;" class="py-1"
        @click="clearWishlist">
        {{ $t("clearFavorites") }}
      </MyButton>
    </div>
  </div>
</template>

<style scoped>
.wishlist-card {
  width: 100%;
  min-height: 160px;
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
}

.wishlist-img-wrapper {
  width: 220px;
  height: 160px;
  overflow: hidden;
  padding: 10px;
}

.wishlist-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.5s ease;
}

@media (max-width: 768px) {
  .wishlist-img {

    width: 100%;
    height: 100%;
  }
}

.wishlist-img:hover {
  transform: scale(1.1);
}

/* Mobile */
@media (max-width: 576px) {
  .wishlist-card {
    flex-direction: column;
  }

  .wishlist-img-wrapper {
    width: 100%;
    height: 120px;
    /* réduire hauteur image */
  }

  .card-body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
  }

  .card-body>div:first-child {
    text-align: center;
    /* titre et prix centrés */
  }

  .card-body>div:last-child {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .card-body .btn {
    flex: 1;
    /* boutons prennent largeur égale */
    font-size: 0.85rem;
    padding: 0.3rem 0.5rem;
  }
}
</style>
