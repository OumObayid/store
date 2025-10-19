<template>
  <div class="container py-5">
    <h4 :style="locale==='fr' ? {borderLeft: '4px solid var(--bs-warning)'} : {borderRight: '4px solid var(--bs-warning)'} " style="color:var(--gold)" class="text-center mb-4 fw-bold">{{ title }}</h4>
    <div class="product-carousel" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
      <div class="product-track">
        <div v-for="(item, index) in [...items, ...items]" :key="index" class="product-card mb-3 mx-2 shadow-card">
          <div class="product-img-wrapper">
            <img :src="item.image" class="product-img" />
          </div>
          <p class="mt-2 fw-semibold">{{ locale === 'ar' ? item.nom_ar : item.nom }}</p>
          <div class="text-center">
            <MyButton
              classNm="my-3 py-1 px-3"
              :styleNm="{ fontSize:'14px' }"
              :onClick="() => router.push(`/product/${item.id}`)"
            >
              {{ $t("see") }}
            </MyButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import MyButton from './MyButton.vue';
import { useI18n } from 'vue-i18n';

// i18n
const { locale } = useI18n();
const router = useRouter();

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
  width: max-content;
  animation: scroll-ltr 120s linear infinite;
}

.product-carousel[dir="rtl"] .product-track {
  animation: scroll-rtl 120s linear infinite;
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
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes scroll-rtl {
  0% { transform: translateX(0); }
  100% { transform: translateX(50%); }
}

/* Bouton doré */
.btn-gold {
  background: linear-gradient(45deg, #d4af37, #f5d76e);
  color: black;
  border: none;
  padding: 7px 7px;
  font-weight: bold;
  border-radius: 25px;
  transition: all 0.3s ease;
}

/* Quand la souris survole le carrousel, on met l'animation en pause */
.product-carousel:hover .product-track {
  animation-play-state: paused;
}
</style>
