<template>
  <div>
    <!-- Hero -->
    <section class="hero position-relative">
      <img src="/images/hero.jpg" class="w-100 hero-img" />
      <div
        class="overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-center text-white">
        <h1 class="display-4 fw-bold">{{ $t("heroTitle") }}</h1>
        <p class="lead">{{ $t("heroSubtitle") }}</p>
        <a href="#categories" class="btn btn-gold mt-3">{{ $t("explore") }}</a>
      </div>
    </section>

    <!-- Catégories -->
    <section id="categories" class="py-5 fade-in">
      <div class="container">
        <h2 class="text-center mb-4 fw-bold">{{ $t("discoverCategories") }}</h2>

        <div class="row  g-4">
          <div v-for="(cat, index) in categories" :key="index" class="col-6 col-lg-2 col-md-3 text-center">
            <div class="category-card mx-auto">
              <img :src="cat.image" class="img-fluid rounded-circle border-gold" />
              <p class="mt-2 fw-semibold">{{ cat.nom }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- Section Produits phares -->
    <section class="container my-5">
      <h2 class="text-center mb-4 fw-bold">{{ $t("featuredProducts") }}</h2>
      <div class="row g-4">
        <div v-for="product in products.slice(0, 4)" :key="product.id" class="col-6 col-md-3">
          <div class="card product-card h-100 border-0 shadow-sm">
            <img :src="product.image" class="card-img-top" />
            <div class="card-body text-center">
              <h5 class="card-title">{{ product.nom }}</h5>
              <p class="text-muted">{{ product.prix }} DH</p>
              <a href="#" class="btn btn-gold">{{ $t("buy") }}</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bannière promo -->
    <section class="promo-banner position-relative fade-in">
      <img src="https://images.pexels.com/photos/5926415/pexels-photo-5926415.jpeg" class="w-100 promo-img" />
      <div
        class="overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white text-center">
        <h2 class="fw-bold">{{ $t("promoText") }}</h2>
        <a href="#" class="btn btn-gold mt-3">{{ $t("takeAdvantage") }}</a>
      </div>
    </section>

    <HorizontalCarousel class="fade-in" :items="products" :title="$t('popularProducts')" />

    <section class="services py-5 my-5 fade-in">
    <div class="container">
      <h2 class="text-center mb-5 fw-bold">{{ $t("ourServices") }}</h2>
      <div class="row text-center justify-content-center">
        
        <!-- Service 1 -->
        <div class="col-12 col-sm-6 col-md-3 mb-4">
          <div class="service-card">
            <i class="bi bi-truck fs-1 icon"></i>
            <h5 class="mt-3">{{ $t("freeDelivery") }}</h5>
            <p>{{ $t("freeDeliveryCondition") }}</p>
          </div>
        </div>

        <!-- Service 2 -->
        <div class="col-12 col-sm-6 col-md-3 mb-4">
          <div class="service-card">
            <i class="bi bi-arrow-repeat fs-1 icon"></i>
            <h5 class="mt-3">{{ $t("returns") }}</h5>
            <p>{{ $t("returnsCondition") }}</p>
          </div>
        </div>

        <!-- Service 3 -->
        <div class="col-12 col-sm-6 col-md-3 mb-4">
          <div class="service-card">
            <i class="bi bi-shield-lock fs-1 icon"></i>
            <h5 class="mt-3">{{ $t("securePayment") }}</h5>
            <p>{{ $t("securePaymentCondition") }}</p>
          </div>
        </div>

        <!-- Service 4 -->
        <div class="col-12 col-sm-6 col-md-3 mb-4">
          <div class="service-card">
            <i class="bi bi-card-text fs-1 icon"></i>
            <h5 class="mt-3">{{ $t("loyaltyCard") }}</h5>
            <p>{{ $t("loyaltyCardCondition") }}</p>
          </div>
        </div>

      </div>
    </div>
  </section>
  </div>
</template>

<script setup>
import {useProductStore} from '../../stores/productStore.js';
import HorizontalCarousel from '../../components/HorizontalCarousel.vue';
import { storeToRefs } from 'pinia';
import { useCategorieStore } from '../../stores/categorieStore.js';

const productStore = useProductStore();
const categorieStore = useCategorieStore();

const { products } = storeToRefs(productStore);
const { categories } = storeToRefs(categorieStore);

 </script>

<style scoped>
/* Hero */
.hero-img {
  height: 93vh;
  object-fit: cover;
  filter: brightness(30%); 
}


/* Promo */
.promo-img {
  height: 300px;
  object-fit: cover;
  filter: brightness(60%);
}

/* Bouton doré */
.btn-gold {
  background: linear-gradient(45deg, #d4af37, #f5d76e);
  color: black;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.btn-gold:hover {
  background: linear-gradient(45deg, #f5d76e, #d4af37);
  transform: scale(1.05);
}

/* Catégories */
.category-card img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.category-card:hover img {
  transform: scale(1.05);
}

.border-gold {
  border: 4px solid #d4af37;
}

/* Produits */
.product-card img {
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover img {
  transform: scale(1.05);
}

/* Animation fade-in */
.fade-in {
  animation: fadeInUp 1s ease forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.services {
  background: linear-gradient(135deg, #e9e9434f, #ececec, #cbb52677);
}

.service-card {
  background: rgba(255, 255, 255, 0.2);
  width: 100%;
  height: 100%;
  border-radius: 16px;
  padding: 30px 20px;
  color: #333;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  cursor: pointer;
}

.service-card:hover {
  transform: rotateY(10deg) rotateX(5deg) scale(1.05);
  box-shadow: 0 12px 30px rgba(0,0,0,0.2);
}

.service-card .icon {
  background: linear-gradient(135deg, #ff9a9e, #fad0c4);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

</style>
