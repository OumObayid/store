<template>
    <div class="checkout container py-5">
        <h2 class="text-center mb-5 fw-bold">
            <i class="bi bi-credit-card me-2"></i> Paiement
        </h2>

        <div class="row">
            <!-- 📍 Adresse de livraison -->
            <div class="col-lg-6 mb-4">
                <div class="card shadow-sm px-4 bg-body-tertiary py-2 mb-4">
                    <div class="d-flex justify-content-between fw-bold fs-5 ">
                        <span>Adresse de livraison</span>
                    </div>
                </div>
                <div class="card shadow-sm p-4">
                    <form @submit.prevent="isEditing ? updateAddress() : addAddress()">
                        <div class="mb-3">
                            <input v-model="addressForm.address" type="text" class="form-control" :disabled="!isEditing"
                                :class="{ 'bg-transparent': !isEditing }" placeholder="Ex : Rue Hassan II, Casablanca"
                                required />
                        </div>
                        <div class="d-flex justify-content-end">
                            <MyButton typeNm="button" @click="toggleEdit" v-if="!isEditing">
                                <i class="bi bi-pencil-square me-2"></i> Modifier
                            </MyButton>

                            <MyButton v-else typeNm="submit">
                                <i class="bi bi-check-circle me-2"></i>
                                {{ hasAddress ? "Mettre à jour" : "Ajouter" }}
                            </MyButton>
                        </div>
                    </form>
                </div>
            </div>

            <!-- 💳 Paiement -->
            <div class="col-lg-6">
                <div class="card shadow-sm px-4 bg-body-tertiary py-2 mb-4" v-if="cartStore.carts.length > 0">
                    <div class="d-flex justify-content-between fw-bold fs-5 ">
                        <span>Total à payer:</span>
                        <span style="color:var(--orange-fonce)">{{ finalTotal.toFixed(2) }} DH</span>
                    </div>
                </div>
                <div v-else class="card shadow-sm px-4 text-center text-muted py-3 mb-4">
                    <i class="bi bi-cart-x fs-3"></i>
                    <p>Votre panier est vide</p>
                </div>

                <!-- 🪪 Carte interactive -->
                <div class="mb-4 d-flex justify-content-center">
                    <CreditCard :number="form.numberCard" :name="form.nameOnCard" :expiry="form.expiry" :cvc="form.cvc"
                        :focused="focusedField" :mask="false" />
                </div>

                <form @submit.prevent="handleSubmit" class="card shadow-sm p-4">
                    <div class="mb-3">
                        <label class="form-label fw-semibold">Nom sur la carte</label>
                        <input v-model="form.nameOnCard" type="text" class="form-control"
                            placeholder="Ex : Oumaima El Obayid" @focus="focusedField = 'name'"
                            @blur="focusedField = ''" required />
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold">Numéro de carte</label>
                        <input v-model="form.numberCard" type="text" class="form-control"
                            placeholder="XXXX XXXX XXXX XXXX" maxlength="19" @input="formatCardInput"
                            @focus="focusedField = 'number'" @blur="focusedField = ''" required />

                    </div>

                    <div class="row">
                        <div class="col-6 mb-3">
                            <label class="form-label fw-semibold">Expiration</label>
                            <input v-model="form.expiry" type="text" class="form-control" placeholder="MM/AA"
                                maxlength="5" @input="formatExpiryInput" @focus="focusedField = 'expiry'"
                                @blur="focusedField = ''" required />

                        </div>
                        <div class="col-6 mb-3">
                            <label class="form-label fw-semibold">CVC</label>
                            <input v-model="form.cvc" type="text" class="form-control" placeholder="123" maxlength="4"
                                @focus="focusedField = 'cvc'" @blur="focusedField = ''" required />
                        </div>
                    </div>

                    <div class="mt-3">
                        <MyButton typeNm="submit" classNm="w-100 py-2">
                            <i class="bi bi-lock-fill me-2"></i> Payer
                        </MyButton>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, computed, ref, onMounted } from "vue";
import { useCartStore } from "../../stores/cartStore";
import { useRouter } from "vue-router";
import CreditCard from '../../components/CreditCard.vue'; // Chemin vers ton composant CreditCard
import { useAuthStore } from "../../stores/authStore";
import MyButton from "../../components/MyButton.vue";

const router = useRouter();
const cartStore = useCartStore();
const authStore = useAuthStore(); // ✅ ici tu appelles la fonction Pinia

const userInfos = computed(() => authStore.userInfos || {})


// ✅ Détection si l'utilisateur a déjà une adresse
const hasAddress = computed(() => !!userInfos.value.address);

// 📬 Formulaire d’adresse
const addressForm = reactive({
    address: ""
});

const isEditing = ref(false);

// 🔄 Initialisation selon si l'adresse existe
onMounted(() => {
    if (hasAddress.value) {
        addressForm.address = userInfos.value.address || "";
        isEditing.value = false;
    } else {
        isEditing.value = true;
    }
});

// ✏️ Permet de passer en mode édition
const toggleEdit = () => {
    isEditing.value = true;
};

// ➕ Ajouter une nouvelle adresse
const addAddress = async () => {
    console.log("➕ Adresse ajoutée :", addressForm);
    // TODO : appel API pour ajouter l’adresse
    // await userService.addAddress(addressForm);
    // await authStore.setUserInfos({ ...userInfos.value, ...addressForm });
    isEditing.value = false;
};

// 🔁 Mettre à jour une adresse existante
const updateAddress = async () => {
    console.log("♻️ Adresse mise à jour :", addressForm);
    // TODO : appel API pour mettre à jour l’adresse
    // await userService.updateAddress(addressForm);
    // await authStore.setUserInfos({ ...userInfos.value, ...addressForm });
    isEditing.value = false;
};

// -------------------section card
const form = reactive({
    nameOnCard: "",
    numberCard: "",
    expiry: "",
    cvc: "",
});

// suivi du champ focus pour le flip
const focusedField = ref('');

const deliveryFee = cartStore.deliveryFee;
const finalTotal = computed(() => cartStore.cartTotal + deliveryFee);

const formatCardInput = (e) => {
    let value = e.target.value;

    // Supprimer tout caractère non numérique
    value = value.replace(/\D/g, "");

    // Limiter à 16 chiffres
    value = value.slice(0, 16);

    // Ajouter un espace toutes les 4 chiffres
    value = value.replace(/(.{4})/g, "$1 ").trim();

    // Mettre à jour le modèle
    form.numberCard = value;
};
const formatExpiryInput = (e) => {
    let value = e.target.value;

    // Supprimer tout sauf les chiffres
    value = value.replace(/\D/g, "");

    // Ajouter le slash automatiquement après le mois
    if (value.length > 2) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }

    // Limiter à 5 caractères (MM/AA)
    value = value.slice(0, 5);

    // Validation basique du mois
    const [month, year] = value.split("/");
    if (month && (+month < 1 || +month > 12)) {
        value = ""; // réinitialiser si mois invalide
    }

    // Vérifier que l’année n’est pas antérieure à l’année actuelle
    if (year && year.length === 2) {
        const currentYear = new Date().getFullYear() % 100;
        if (+year < currentYear) {
            value = value.slice(0, 3); // garde MM/ uniquement
        }
    }

    // Mettre à jour le modèle
    form.expiry = value;
};

const handleSubmit = () => {
    console.log("Paiement soumis :", form);
    // TODO:
    // - Valider le formulaire
    // - Envoyer au backend (Stripe/ autre API)
    // - Mettre à jour le store utilisateur
    // - Vider le panier
    // - Rediriger vers la page de succès
    // cartStore.clearCart();
    // router.push("/checkout-success");
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
