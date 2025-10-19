<template>
  <div class="cart-3d content container py-3 ">
    <div v-if="cartStoreItemsX2.length > 0" class=" row py-5 py-md-0">
      <div class="col-lg-8 pb-4">
        <h4 class="text-center mt-4 mb-5 ">
          <i class="bi bi-cart-check-fill me-2"></i> {{ $t("cart") }}
        </h4>
        <div class="row">
          <div v-for="item in cartStoreItemsX2" :key="item.id" class="card  glass-card rounded-4 mb-4 shadow-sm">
            <div class="card-body p-2">
              <div class="row d-flex justify-content-between align-items-center">
                <div class="col-12 col-md-6 d-flex justify-content-between align-items-center mb-3 mb-md-0">
                <!-- Image -->
                <div class="col-4 col-md-2 d-flex justify-content-start justify-content-md-center">
                  <img :src="item.image" class="img-fluid rounded-3 product-img" :alt="item.nom" />
                </div>
                <!-- Infos produit -->
                <div class="col-8 col-md-4">
                  <p class="fw-bold mb-1">{{ locale === 'fr' ? item.nom : item.nom_ar }}</p>
                </div></div>

                <!-- Quantité -->
                <div class="col-4 col-md-3 d-flex justify-content-center align-items-center">
                  <button class="btn bg-secondary text-light btn-sm mx-0"
                    @click="changeQuantity(item.id, 'decrease', item.quantity)">
                    <i class="bi bi-dash-lg" style="font-weight: 900;"></i>
                  </button>
                  <input type="text" v-model="item.quantity" disabled
                    class="form-control form-control-sm text-center mx-2 qty-input"
                    style="width:30px; background-color: transparent; border: none; box-shadow: none; color: inherit;" />

                  <button style="background-color: var(--vert-olive);" class="btn text-light btn-sm mx-0"
                    @click="changeQuantity(item.id, 'increase', item.quantity)">
                    <i class="bi bi-plus-lg" style="font-weight: 900;color:var(--vert-olive-fonce)"></i>
                  </button>
                </div>

                <!-- Prix -->
                <div class="col-4 col-md-2 text-end">
                  <h6 class="mb-0 fw-bold">{{ (Number(item.prix || 0) * Number(item.quantity || 0)).toFixed(2) }} {{
                    $t("dh") }}
                  </h6>

                </div>

                <!-- Supprimer -->
                <div class="col-2 col-md-1 text-end">
                  <button class="btn btn-link text-danger" @click="removeItem(item.id)">

                    <i class="bi bi-trash3-fill fs-5"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <!-- Résumé de la commande -->
      <div class="side col-lg-4 parent-order">
        <div class="card glass-card w-100 shadow-lg p-4 order-summary">
          <h5 class="mb-4 text-center fw-bold">{{ $t('orderSummary') }}</h5>

          <ul class="list-group list-group-flush ">

            <!-- Total produits -->
            <li class="list-group-item d-flex justify-content-between fs-5">
              <span>{{ $t('total') }}</span>
              <strong style="color:var(--vert-olive-fonce)">{{ Number(cartTotalX2).toFixed(2) }} {{ $t('dh') }}</strong>
            </li>

            <!-- 🆕 Frais de livraison ou gratuit -->
            <li v-if="setting" class="list-group-item  fs-6">

              <div class="d-flex justify-content-between" v-if="shippingFee === 0">
                <span>{{ shippingMessage }}</span><span>🎉</span>
              </div>
              <div v-else class="d-flex justify-content-between">
                <span>{{ $t('delivery') }}</span> <strong style="color:var(--vert-olive-fonce)"> {{
                  shippingFee.toFixed(2)
                }}
                  {{ $t('dh') }}</strong>
              </div>
            </li>

            <!-- 🆕 Total final -->
            <li v-if="setting" class="list-group-item d-flex justify-content-between fs-5 fw-bold">
              <span>{{ $t('totalToPay') }}</span>
              <strong style="color:var(--orange)">{{ totalWithShipping.toFixed(2) }} {{ $t('dh') }}</strong>
            </li>

          </ul>

          <!-- Boutons -->
          <MyButton classNm="w-100 py-1" :disabled="isLoggedIn && cartStoreItemsX2.length === 0"
            :onClick="() => router.push(isLoggedIn ? '/order' : Toast($t('messloginToOrder'), 'info'))">
            <i :class="isLoggedIn ? 'bi bi-credit-card me-2' : 'bi bi-box-arrow-in-right me-2'"></i>
            {{ $t('placeOrder')}}
          </MyButton>


          <!-- <MyButton
      :styleNm="{ backgroundColor: 'var(--vert-olive-fonce)' }"
      :onClick="() => router.push('/products')"
      classNm="w-100"
    >
      <i class="bi bi-arrow-left me-2"></i> Continuer mes achats
    </MyButton> -->
        </div>
      </div>


    </div>
    <!-- Panier vide -->
    <div v-else class="text-center py-5 empty-cart">
      <div class="d-flex justify-content-center align-items-center">
        <i style="background-color: var(--orange-clair);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center; color: var(--gold);" class="p-5 bi bi-cart-x display-3"></i>
      </div>

      <p class="h5  mt-5 ">{{ $t('emptyCart') }}</p>
      <p>{{ $t('exploreProducts') }}</p>
      <MyButton @click="() => router.push('/products')" classNm="py-1 mt-5">
        <i class="bi bi-bag me-2 "></i> {{ $t('startShopping') }}
      </MyButton>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useCartStore } from "../../stores/cartStore";
import { computed, onMounted, ref } from "vue";
import { useAuthStore } from "../../stores/authStore";
import { storeToRefs } from "pinia";
import { useCart } from "../../composables/useCart";

// 🆕 import du composable setting
import { useSetting } from "../../composables/useSetting";
import { useI18n } from "vue-i18n";
import MyButton from "../../components/MyButton.vue";
import { Toast } from '../../utils/Toast'
const router = useRouter();
const { isLoggedIn } = storeToRefs(useAuthStore());
const cartStore = useCartStore();
const { incrementItemQuantity, decrementItemQuantity, removeCartItem, error: error_delete } = useCart();

// 🆕 Récupération des setting
const { setting, getSetting } = useSetting();
const { t, locale } = useI18n();

// ⚙️ Charger les paramètres de livraison dès le montage
onMounted(async () => {
  await getSetting();
});

// Panier selon l'état de connexion
const cartStoreItemsX2 = computed(() => {
  return isLoggedIn.value
    ? cartStore.items       // panier connecté
    : cartStore.items_temp;  // panier temporaire
});

const cartTotalX2 = computed(() => {
  return isLoggedIn.value
    ? cartStore.cartTotal       // panier connecté
    : cartStore.cartTotalTemp;  // panier temporaire
});

// 🧮 Calcul des frais de livraison
const shippingFee = computed(() => {
  if (!setting.value) return 0;

  const frais = Number(setting.value.frais_livraison || 0);
  const seuil = Number(setting.value.seuil_gratuite || 0);
  const gratuite = Number(setting.value.livraison_gratuite || 0);

  if (gratuite === 1 && cartTotalX2.value >= seuil) {
    return 0; // Livraison gratuite au-dessus du seuil
  }
  return frais; // Sinon frais fixes
});

// 🧮 Total général (produits + livraison)
const totalWithShipping = computed(() => {
  return Number(cartTotalX2.value) + Number(shippingFee.value);
});

// 🧮 Message d'information
const shippingMessage = computed(() => {
  if (!setting.value) return "";
  if (shippingFee.value === 0) {
    return t("freeDelivery");
  } else {
    return `t("deliveryFees") : ${shippingFee.value.toFixed(2)} {{ $t('dh') }}`;
  }
});

// ⚙️ Gestion des quantités
const changeQuantity = (id, action, quantity) => {
  if (action === "increase") incrementItemQuantity(id, quantity);
  if (action === "decrease") decrementItemQuantity(id, quantity);
};

const removeItem = async (itemId) => {
  await removeCartItem(itemId);
  if (error_delete.value) {
    Toast(t("itemDeletedError"), 'error'); // Affiche une alerte en cas d'erreur

  } else {
    Toast(t("itemDeletedSuccess"), 'success'); // Affiche une alerte en cas de succès
  }
};
</script>


<style scoped>
.content {
  padding: 30px 0 auto;
}

.glass-card {
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.glass-card h5 {
  color: var(--gold)
}

.product-img {
  max-height: 120px !important;
  max-width: 120px !important;
  object-fit: contain;
}

.qty-input {
  max-width: 60px;
  border-radius: 10px;
}

.empty-cart {
  background: rgba(245, 245, 245, 0.8);
  border-radius: 16px;
}

.side {
  display: flex;
  align-items: center;
  justify-content: center;
  position: -webkit-sticky;
  position: sticky;
  top: calc(var(--navbar--banner-height));
  height: 345px;
  color: #fff;
}
</style>
