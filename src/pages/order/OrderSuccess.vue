<template>
  <div class="order-success container py-5 text-center">
    <!--  Icône de succès -->
    <div class="icon-success my-5 py-md-0 my-md-3 mb-4">
      <i class="bi bi-check "></i>
    </div>

    <!--  Titre -->
    <h4 class="fw-bold mb-3"> {{ $t("orderConfirmed") }} !</h4>

    <!--  Message -->
    <div class="lead mb-4">
      <div> {{ $t("thankYou") }}, <span class="text-primary">{{ userName }}</span> !</div>
      <p>{{ $t("orderValidated") }}</p>
      <p>{{ $t("orderPreparing") }}</p>
      <p>{{ $t("orderTracking") }}</p>
    </div>

    <!--  Boutons -->
    <div class="d-flex justify-content-center gap-3 flex-wrap">
      <MyButton :styleNm="{ backgroundColor: 'var(--orange-fonce)' }" classNm="px-4 py-2" @click="goToOrders">
        <i class="bi bi-card-list me-2"></i> {{ $t("viewMyOrders") }}
      </MyButton>

      <MyButton classNm="px-4 py-2 outline" @click="goToShop">
        <i class="bi bi-bag me-2"></i> {{ $t("continueShopping") }}
      </MyButton>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../../stores/authStore';
import { useRouter } from 'vue-router';
import MyButton from '../../components/MyButton.vue';

const router = useRouter();
const authStore = useAuthStore();

// 🔹 Récupérer le prénom de l'utilisateur pour un message personnalisé
const userName = authStore.userInfos?.firstname || 'Cher client';

// 🔹 Fonctions de navigation
const goToOrders = () => router.push('/dashboard/my-orders');
const goToShop = () => router.push('/');
</script>

<style scoped>
.order-success {
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.icon-success {
  font-size: 4rem;
  background-color: var(--orange-clair);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--gold);
}

.lead {
  font-size: 1.2rem;
  max-width: 480px;
}

button {
  min-width: 180px;
}
</style>
