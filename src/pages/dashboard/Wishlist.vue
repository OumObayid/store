
<script setup>
import { useWishlistStore } from "../../stores/wishlistStore";
import { storeToRefs } from "pinia";

const wishlistStore = useWishlistStore();

// states
const { wishlist } = storeToRefs(wishlistStore);

// actions
const { removeFromWishlist, clearWishlist } = wishlistStore;
</script>
<template>
  <div class="container my-3">
    <!-- Si vide -->
    <p v-if="!wishlist.length" class="text-center text-muted">
      Aucun produit dans vos favoris.
    </p>

    <!-- Liste des favoris -->
    <div class="row g-4" v-else>
      <div
        v-for="item in wishlist"
        :key="item.id"
        class="col-md-3 col-sm-6"
      >
        <div class="card wishlist-card shadow-sm">
          <!-- Conteneur image -->
          <div class="wishlist-img-wrapper">
            <img
              :src="item.image"
              class="wishlist-img"
              alt="Produit"
            />
          </div>

          <!-- Contenu -->
          <div class="card-body d-flex flex-column">
            <h5 class="card-title text-truncate">{{ item.nom }}</h5>
            <p class="card-text text-muted small">{{ item.prix }} MAD</p>
            <div
              class="mt-auto d-flex justify-content-between align-items-center gap-2"
            >
              <button
                class="btn btn-sm btn-outline-danger"
                @click="removeFromWishlist(item.id)"
              >
                <i class="bi bi-heart-fill"></i> Retirer
              </button>
              <button class="btn btn-sm btn-dark">
                <i class="bi bi-cart"></i> Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bouton vider -->
    <div v-if="wishlist.length" class="text-end mt-4">
      <button class="btn btn-outline-secondary" @click="clearWishlist">
        Vider mes favoris
      </button>
    </div>
  </div>
</template>

<style scoped>
.wishlist-card {
  height: 100%;
  min-height: 380px;
  border-radius: 15px;
  overflow: hidden;
}

.wishlist-img-wrapper {
  width: 100%;
  height: 220px; /* fixe la hauteur */
  overflow: hidden;
}

.wishlist-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.wishlist-img:hover {
  transform: scale(1.2);
}
</style>
