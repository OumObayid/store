<template>
  <div class="container pb-5 my-2">
    <!-- ✅ Si des commandes existent -->
    <div v-if="myorders && myorders.length > 0" class="row gy-4 ">
      <div v-for="order in myorders" :key="order.order_id" class="col-12 ">
        <div class="card shadow-sm h-100">
          <div class="card-body">

            <!-- 🧾 En-tête commande -->
            <div class="row mb-2 align-items-center">
              <div class="col-12 col-md-6">
                <span class="fw-semibold text-secondary">
                  {{ $t('orderNumber') }} : <span style="color:var(--orange-fonce); font-weight: bold;">{{
                    order.order_id }}</span>
                </span>
              </div>
              <div class="col-12 col-md-6 text-md-center mt-2 mt-md-0 ">
                <span class="badge " :class="{
                  'bg-warning text-dark': order.status === 'pending',
                  'bg-success': order.status === 'completed',
                  'bg-danger': order.status === 'cancelled'
                }">
                  {{ $t(order.status) }}
                </span>
              </div>
            </div>

            <!-- 📅 Date -->
            <div class="row mb-3">
              <div class="col-12">
                <p class="mb-1 text-muted small">
                  <i class="bi bi-calendar mx-2"></i>
                  {{ formatDate(order.created_at) }}
                </p>
              </div>
            </div>

            <!-- 🛍️ Liste des produits -->
            <ul class="list-unstyled mt-3 mb-3 small">
              <li v-for="(item, index) in order.items" :key="index" class="border-bottom py-2">
                <div class="row align-items-center g-2">
                  <!-- 🖼️ Image -->
                  <div class="col-3 col-sm-2 col-md-1">
                    <img :src="'data:image/jpeg;base64,' + item.image" alt="Produit"
                      class="product-img rounded img-fluid" />
                  </div>

                  <!-- 📝 Infos produit -->
                  <div class="col-9 col-sm-6 col-md-7 text-end">
                    <div class="fw-semibold text-truncate text-md-center">
                      {{ locale === 'fr' ? item.nom : item.nom_ar }}
                    </div>
                    <div class="text-muted text-md-center">
                      {{ item.quantity }} × {{ Number(item.prix).toFixed(2) }} {{ $t('dh') }}
                    </div>
                  </div>

                  <!-- 🛒 Bouton -->
                  <div class="col-12 col-sm-4 col-md-4 text-sm-end mb-4 mb-md-0 mt-2 mt-sm-0" :class="locale === 'fr' ? 'text-md-end' : 'text-md-start'">
                    <MyButton :onClick="() => router.push(`/product/${item.product_id}`)" classNm="py-1">
                      <i class="bi bi-bag-plus me-1"></i>
                      {{ $t('reorder') }}
                    </MyButton>
                  </div>
                </div>
              </li>
            </ul>

            <!-- 💰 Total -->
            <div class="row fw-bold mt-3">
              <div class="col-6">
                <span>{{ $t('total') }} :</span>
              </div>
              <div class="col-6 text-end">
                <span style="color: var(--orange-fonce)">
                  {{ Number(order.total).toFixed(2) }} {{ $t('dh')}}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ❌ Si aucune commande -->
    <div v-else class="text-center text-muted py-5">
      <i class="bi bi-bag-x fs-1 mb-3 d-block"></i>
      <p>Vous n’avez encore passé aucune commande.</p>
      <MyButton :onClick="() => router.push('/products')" class="btn btn-dark mt-2">
        <i class="bi bi-shop me-2"></i> Commencer vos achats
      </MyButton>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import MyButton from "../../components/MyButton.vue";
import { useOrderStore } from "../../stores/orderStore";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { computed, onMounted } from "vue";
import { useAuthStore } from "../../stores/authStore";
const { locale } = useI18n();
const router = useRouter();
const authStore = useAuthStore()
const orderStore = useOrderStore();
const { orders } = storeToRefs(orderStore);
const userInfos = computed(() => authStore.userInfos || {})
const myorders = computed(() => orders.value.filter(order => order.user_id === userInfos.value.id));
onMounted(() => {
console.log('myorders :', myorders.value); // plein

});

// 🗓️ Formatage de la date
const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString(locale.value, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<style scoped>
.card {
  border-radius: 16px;
  transition: 0.2s ease;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.badge {
  font-size: 0.8rem;
}

.product-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  flex-shrink: 0;
}

.btn-outline-dark {
  white-space: nowrap;
}
</style>
