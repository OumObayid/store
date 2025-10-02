<template>
  <div class="container py-5">
    <h2 class="text-center mb-4 fw-bold">{{ title }}</h2>
    <div class="product-carousel">
      <div class="product-track">
        <router-link
          v-for="(item, index) in [...items, ...items]"
          :key="index"
          :to="`/product/${item.id}`"
          class="product-card text-center mx-2 shadow-card"
        >
          <div class="product-img-wrapper">
            <img :src="item.image" class="product-img" />
          </div>
          <p class="mt-2 fw-semibold">{{ item.nom }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.product-carousel {
  overflow: hidden;
  width: 100%;
}

.product-track {
  display: flex;
  gap: 1rem;
  animation: scroll 20s linear infinite;
}

.product-card {
  flex: 0 0 auto;
  width: 12rem;
  border-radius: 0.75rem;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s;
}

.product-card:hover {
  transform: scale(1.05);
}

/* Encadrement et ombre */
.shadow-card {
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  border: 1px solid #eee;
}

/* Image wrapper fixe pour que l'image prenne toute la place */
.product-img-wrapper {
  width: 100%;
  height: 14rem; /* Hauteur fixe pour l’image */
  overflow: hidden;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Texte */
.product-card p {
  padding: 0.5rem;
  margin: 0;
}

/* Animation scroll continue */
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
