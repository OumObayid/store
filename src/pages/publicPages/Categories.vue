<template>

  <!-- Catégories -->
  <section id="categories" class="py-5 fade-in">
    <div class="container p-5 p-md-0">
      <h4 :style="locale==='fr' ? {borderLeft: '4px solid var(--bs-warning)'} : {borderRight: '4px solid var(--bs-warning)'} " class="text-center mb-4 fw-bold">{{ $t("discoverCollections") }}</h4>
      <div class="row  g-4">
        <div v-for="(cat, index) in categories" :key="index" class="col-12 col-md-4 text-center my-5">
          <router-link :to="`/categorie/${cat.id}`">
            <div class="category-card mx-auto">
              <img :src="cat.image" class="img-fluid rounded-circle border-gold" />
              <p class="mt-2 fw-semibold">{{ locale === 'ar' ? cat.nom_ar : cat.nom }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>

</template>

<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCategorieStore } from '../../stores/categorieStore';
import { useI18n } from 'vue-i18n'; // <- i18n

// i18n
const { locale } = useI18n();
const categoriesStore = useCategorieStore();
const { categories } = storeToRefs(categoriesStore);

onMounted(() => {
  console.log('categories :', categories.value);
});
</script>

<style scoped lang="css">
h2 {
  font-size: 1.1rem;
  margin-top: 0.8rem;
  color: #333;
}

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

.category-card img {
  width: 320px;
  height: 320px;
  object-fit: cover;
  transition: transform 0.3s ease;
}
@media (max-width: 767px) {
  .category-card img {
    width: 200px;
    height: 200px;
  }
}
.category-card:hover img {
  transform: scale(1.05);
}

.border-gold {
  border: 4px solid #d4af37;
}
h3,h4{
  border:none;
}
</style>
