<template >
  <div class="checkout container py-5">
    <h4 class="text-center mb-5 mt-5 mt-md-0 fw-bold">
      <i class="bi bi-credit-card me-2"></i> {{ $t('payment') }}
    </h4>

    <div v-if="carts && carts.length > 0" class="row">
      <!-- 💳 Paiement -->
      <div class="col-lg-6">
        <!-- 🪪 Carte interactive -->
        <div class="mb-4 d-flex justify-content-center">
          <CreditCard :number="form.numberCard" :name="form.nameOnCard" :expiry="form.expiry" :cvc="form.cvc"
            :focused="focusedField" :mask="false" />
        </div>

        <form @submit.prevent="handleSubmit" class="card shadow-sm p-4">
          <div class="mb-3">
            <label class="form-label fw-semibold">{{ $t('cardName') }}</label>
            <input v-model="form.nameOnCard" type="text" class="form-control" placeholder="Ex : Oumaima El Obayid"
              @focus="focusedField = 'name'" @blur="focusedField = ''" required />
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold">{{ $t('cardNumber') }}</label>
            <input v-model="form.numberCard" type="text" class="form-control" placeholder="XXXX XXXX XXXX XXXX"
              maxlength="19" @input="formatCardInput" @focus="focusedField = 'number'" @blur="focusedField = ''"
              required />
          </div>

          <div class="row">
            <div class="col-6 mb-3">
              <label class="form-label fw-semibold">{{ $t('expiryDate') }}</label>
              <input v-model="form.expiry" type="text" class="form-control" placeholder="MM/AA" maxlength="5"
                @input="formatExpiryInput" @focus="focusedField = 'expiry'" @blur="focusedField = ''" required />
            </div>
            <div class="col-6 mb-3">
              <label class="form-label fw-semibold">{{ $t('cvv') }}</label>
              <input v-model="form.cvc" type="text" class="form-control" placeholder="123" maxlength="4"
                @focus="focusedField = 'cvc'" @blur="focusedField = ''" required />
            </div>
          </div>

          <div class="mt-3">
            <MyButton typeNm="submit" classNm="w-100 py-1">
              <i class="bi bi-lock-fill me-2"></i> {{ $t('payNow') }}
            </MyButton>
          </div>
        </form>
      </div>
      <!-- 📍 Adresse de livraison -->
      <div class="col-lg-6 mb-4">
        <!-- 🧾 Récapitulatif des montants -->
        <div class="card shadow-sm px-4 bg-body-tertiary py-2 mb-4">
          <div class="h5">{{ $t('amountToPay') }}</div>
          <hr class="my-1" />
          <div class="d-flex justify-content-between  mb-2">
            <span>{{ $t('subTotal') }} :</span>
            <span style="color: var(--vert-olive-fonce)" class="fw-bold">{{ subTotal.toFixed(2) }} {{ $t('dh') }}</span>
          </div>
          <div class="d-flex justify-content-between  mb-2">
            <span>{{ shippingMessage }} :</span>
            <span>
              <span class="fw-bold" v-if="deliveryFee === 0">🎉</span>
              <span class="fw-bold" style="color: var(--vert-olive-fonce)" v-else>{{ deliveryFee.toFixed(2) }} {{
                $t('dh') }}</span>
            </span>
          </div>
          <div class="d-flex justify-content-between fw-bold fs-5 border-top pt-2">
            <span>{{ $t('totalToPay') }} :</span>
            <span style="color: var(--orange)">{{ finalTotal.toFixed(2) }} {{ $t('dh') }}</span>
          </div>
        </div>
        <div class="card shadow-sm p-3">
          <div class="h5">{{ $t('deliveryAddress') }}</div>
          <form @submit.prevent="isEditing ? updateAddress() : addAddress()">
            <div class="mb-3 row">
              <div class="col-12"> <input v-model="addressForm.address" type="text" class=" form-control"
                  :disabled="!isEditing" 
                  placeholder="Ex : Rue Hassan II, Casablanca" required /></div>
              <div class="col-12 pt-4">
                <MyButton classNm="py-1" typeNm="button" @click="toggleEdit" v-if="!isEditing">
                  <i class="bi bi-pencil-square  col-md-4"></i> {{ $t('edit') }}
                </MyButton>
                <MyButton classNm="py-1" v-else typeNm="submit" @click="handleSaveAddAddress">
                  <i class="bi bi-check-circle col-md-4"></i>
                  {{ hasAddress ? $t('save') : $t('add') }}
                </MyButton>
                

              </div>

            </div>
            <div class="d-flex justify-content-end">



            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-else class="card shadow-sm px-4 text-center text-muted py-3 mb-4">
      <i class="bi bi-cart-x fs-3"></i>
      <p>{{ $t('cartEmpty') }}</p>
    </div>
  </div>
</template>


<script setup>
import { reactive, computed, ref, onMounted } from "vue";
import { useCartStore } from "../../stores/cartStore";
import { useRouter } from "vue-router";
import CreditCard from '../../components/CreditCard.vue';
import { useAuthStore } from "../../stores/authStore";
import MyButton from "../../components/MyButton.vue";
import { useOrders } from "../../composables/useOrders";
import { useCart } from "../../composables/useCart";
import { useAuth } from "../../composables/useAuth";
import { useSetting } from "../../composables/useSetting";
import { useI18n } from "vue-i18n";
import { Toast } from "../../utils/Toast";
const router = useRouter();
const cartStore = useCartStore();
const authStore = useAuthStore();
const { t } = useI18n();
// ======================= 🧍 INFOS UTILISATEUR =======================
const userInfos = computed(() => authStore.userInfos || {});
const hasAddress = computed(() => !!userInfos.value.address);

const addressForm = reactive({ address: "" });
const isEditing = ref(false);

const { setting, getSetting } = useSetting();
const { updateAddressUser , error:error_updateAddressUser } = useAuth();

onMounted(async () => {
  await getSetting();
  if (hasAddress.value) {
    addressForm.address = userInfos.value.address || "";
    isEditing.value = false;
  } else {
    isEditing.value = true;
  }

});

const toggleEdit = () => (isEditing.value = true);
const addAddress = async () => {
  console.log("➕ Adresse ajoutée :", addressForm);
  isEditing.value = false;
};
const updateAddress = async () => (isEditing.value = false);

async function handleSaveAddAddress() {
    const data = { userId: userInfos.value.id, address: addressForm.address };
    await updateAddressUser(data);
    if (error_updateAddressUser.value) {
    console.log('error_updateAddressUser :', error_updateAddressUser);
      Toast(t("error_updateAddressUser"), "error");
      return;
    }
    Toast(t("updateAddress"), "success");
    isEditing.value = false; 
}

// ======================= 💳 FORMULAIRE PAIEMENT =======================
const form = reactive({
  nameOnCard: "",
  numberCard: "",
  expiry: "",
  cvc: "",
});
const focusedField = ref("");

// ======================= 🚚 CALCUL LIVRAISON ET TOTAL =======================
const carts = computed(() => cartStore.items || []);

// 🧮 Sous-total
const subTotal = computed(() =>
  carts.value.reduce((acc, item) => acc + item.prix * item.quantity, 0)
);

// ⚙️ Paramètres depuis `setting.value`
const fraisLivraison = computed(() => parseFloat(setting.value?.frais_livraison) || 0);
const seuilGratuite = computed(() => parseFloat(setting.value?.seuil_gratuite) || 0);
const livraisonGratuiteActive = computed(() => setting.value?.livraison_gratuite == 1);

// 🚚 Calcul des frais de livraison
const deliveryFee = computed(() => {
  if (livraisonGratuiteActive.value && subTotal.value >= seuilGratuite.value) {
    return 0;
  }
  return fraisLivraison.value;
});

// 🧾 Total final à payer
const finalTotal = computed(() => subTotal.value + deliveryFee.value);

const shippingMessage = computed(() => {
  if (!setting.value) return "";
  if (deliveryFee.value === 0) {
    return t('freeDelivery');
  } else {
    return t('deliveryFees');
  }
});

// ======================= 🧮 FORMAT DES CHAMPS =======================
const formatCardInput = (e) => {
  let value = e.target.value.replace(/\D/g, "").slice(0, 16);
  form.numberCard = value.replace(/(.{4})/g, "$1 ").trim();
};

const formatExpiryInput = (e) => {
  let value = e.target.value.replace(/\D/g, "").slice(0, 4);
  if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
  const [month, year] = value.split("/");
  if (month && (+month < 1 || +month > 12)) value = "";
  form.expiry = value;
};

// ======================= ✅ VALIDATION ET ENVOI =======================
const { createOrder } = useOrders();
const { clearCart } = useCart();

const handleSubmit = async () => {
  if (!form.nameOnCard || !form.numberCard || !form.expiry || !form.cvc) {
    Toast(t("fillAllFields"), "info");
    return;
  }

  const order = {
    user_id: userInfos.value.id,
    total: finalTotal.value,
    items: carts.value.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.prix
    }))
  };

  try {
    await createOrder(order);
    await clearCart(authStore.userInfos.id);
    router.push("/order-success");
  } catch (err) {
    console.error("Erreur lors de la création de la commande :", err);
  }
};
</script>



<style scoped>
input:focus,
textarea:focus,
select:focus {
  border-color: var(--gold) !important;
  box-shadow: 0 0 0 0.2rem rgba(255, 215, 0, 0.25) !important;
}

.card {
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.9);
}

button.btn-dark:hover {
  background-color: var(--gold);
  border-color: var(--gold);
  color: #111;
}

.credit-card {
  transform: scale(0.9);
  transition: 0.3s ease;
}
</style>
