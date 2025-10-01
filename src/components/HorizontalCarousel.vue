<template>
  <div class="container position-relative py-5">
    <h2 class="text-center mb-4 fw-bold">{{ title }}</h2>
    <div ref="scrollContainer" class="d-flex overflow-hidden product-list">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="product-card text-center mx-2"
      >
        <img :src="item.image" class="img-fluid product-img rounded shadow-sm" />
        <p class="mt-2 fw-semibold">{{ item.nom }}</p>
      </div>
    </div>

    <button class="carousel-btn left" @click="scrollLeft">‹</button>
    <button class="carousel-btn right" @click="scrollRight">›</button>
  </div>
</template>


<script setup>
import { ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  scrollAmount: {
    type: Number,
    default: 300
  },
   title: {          // ← ajoute cette ligne
    type: String,
    default: ''     // si tu ne passes rien, ça reste vide
  }
})


const scrollContainer = ref(null)

const scrollRight = () => {
  scrollContainer.value.scrollBy({ left: props.scrollAmount, behavior: 'smooth' })
}

const scrollLeft = () => {
  scrollContainer.value.scrollBy({ left: -props.scrollAmount, behavior: 'smooth' })
}
</script>

<style scoped>
.product-list {
  scroll-behavior: smooth;
}

/* Fixe la taille des cartes */
.product-card {
  flex: 0 0 auto;
  width: 12rem;
  height: 19rem;
  transition: transform 0.3s;
}
.product-card:hover {
  transform: scale(1.05);
}

/* Images fixes, centrées et recadrées */
.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Flèches */
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: white;           /* Fond clair */
  border: 1px solid #ccc;      /* Bordure douce */
  color: #333;                 /* Couleur flèche */
  font-size: 1.5rem;           /* Plus petit et élégant */
  width: 40px;
  height: 40px;
  line-height: 36px;
  text-align: center;
  cursor: pointer;
  border-radius: 50%;          /* Rond */
  box-shadow: 0 2px 8px rgba(0,0,0,0.3); /* Ombre légère */
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s;
  z-index: 10;
}

/* Change l'effet au survol de la flèche */
.carousel-btn:hover {
  background: #d4af37;         /* Couleur dorée au survol */
  color: white;
  transform: translateY(-50%) scale(1.1);
}

/* Position */
.carousel-btn.left { left: -20px; }  /* Décalage léger */
.carousel-btn.right { right: -20px; }

/* Affiche les flèches quand la souris survole le container */
div:hover > .carousel-btn { opacity: 1; }
</style>
