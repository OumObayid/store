<template>
  <div v-if="categorie" class="container py-5">
    <div class="row g-4 align-items-center ">
      <!-- Image à gauche -->
      <div class="col-lg-4">
        <div class="category-card text-start">
          <img :src="categorie.image" :alt="categorie.nom" class="img-fluid rounded-circle border-gold" />
        </div>
      </div>

      <!-- Nom et description à droite -->
      <div class="col-lg-8 d-flex flex-column justify-content-between align-items-center">
        <h2 class="px-5 fw-bold mb-3 w-50">{{ categorie.nom }}</h2>
        <p class="text-muted fs-5">{{ categorie.description }}</p>
      </div>
    </div>

    <hr class="my-5" />

    <!-- Carousel CSS continu -->
    <div v-if="categorieProducts.length" class="products-carousel">
      <h3>{{ $t("Products-in-this-category") }}</h3>

      <div class="carousel-track">
        <!-- Doublage pour défilement continu -->
        <div class="product-card" v-for="(prod, index) in [...categorieProducts, ...categorieProducts]"
          :key="prod.id + '-' + index">
          <img :src="prod.image" :alt="prod.nom" />
          <h6>{{ prod.nom }}</h6>
          <p>{{ prod.prix }} DH</p>
          <div class="text-center">
            <MyButton classNm="mt-3 py-1 " :styleNm="{ fontSize: '14px' }"
              :onClick="() => router.push(`/product/${prod.id}`)">
              {{ $t("see") }}
            </MyButton>
          </div>

        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-5">
    <p>Catégorie introuvable...</p>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useCategorieStore } from "../../stores/categorieStore";
import { useProductStore } from "../../stores/productStore";
import MyButton from "../../components/MyButton.vue";

const route = useRoute();
const router = useRouter();

const categoriesStore = useCategorieStore();
const { categories } = storeToRefs(categoriesStore);

const categorie = computed(() =>
  categories.value.find((cat) => String(cat.id) === String(route.params.id))
);

const productsStore = useProductStore();
const { products } = storeToRefs(productsStore);
const categorieProducts = computed(() =>
  products.value.filter((prod) => String(prod.categorie_id) === String(route.params.id))
);

onMounted(() => {
  console.log("Categorie :", categorie.value);
  console.log("Produits :", categorieProducts.value);
});
</script>

<style scoped>
/* Base catégorie */
h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  color: #555;
}

.category-card img {
  width: 240px;
  height: 240px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.category-card:hover img {
  transform: scale(1.05);
}

.border-gold {
  border: 4px solid #d4af37;
}

/* Carousel CSS continu */
.products-carousel {
  overflow: hidden;
  margin-top: 2rem;
}

.carousel-track {
  display: flex;
  gap: 1rem;
  width: max-content;
  /* largeur totale du track */
  animation: scroll 50s linear infinite;
}

.products-carousel:hover .carousel-track {
  animation-play-state: paused;
  /* pause au survol */
}

.product-card {
  flex: 0 0 auto;
  width: 200px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 320px;
  /* hauteur fixe pour aligner toutes les cards */
}

.product-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

/* Animation scroll */
@keyframes scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}
</style>
