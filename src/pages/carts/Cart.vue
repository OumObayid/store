<template>
  <div class="cart-3d content container">
    <div class=" row">
      <div class="col-lg-8 pb-4">
        <h4 class="text-center mb-5 title-3d">
          <i class="bi bi-cart-check-fill me-2"></i> Mon Panier
        </h4>
        <div class="row">
          <div v-if="cartStore.carts.length > 0">
            <div v-for="item in cartStore.carts" :key="item.id" class="card glass-card rounded-4 mb-4 shadow-sm">
              <div class="card-body p-4">
                <div class="row d-flex justify-content-between align-items-center">
                  <!-- Image -->
                  <div class="col-3 col-md-2">
                    <img :src="item.image" class="img-fluid rounded-3 product-img" :alt="item.nom" />
                  </div>

                  <!-- Infos produit -->
                  <div class="col-5 col-md-4">
                    <p class="fw-bold mb-1">{{ item.nom }}</p>
                    <p class="small text-muted mb-0">
                      <span v-if="item.taille" class="me-2"><i class="bi bi-aspect-ratio"></i> {{ item.taille }}</span>
                      <span v-if="item.couleur"><i class="bi bi-palette"></i> {{ item.couleur }}</span>
                    </p>
                  </div>

                  <!-- Quantité -->
                  <div class="col-4 col-md-3 d-flex justify-content-center align-items-center">
                    <button class="btn bg-secondary text-light btn-sm mx-0" @click="cartStore.decreaseQuantity(item.id)">
                      <i class="bi bi-dash-lg" style="font-weight: 900;"></i>
                    </button>
                    <input type="text" v-model="item.quantity" disabled
                      class="form-control form-control-sm text-center mx-2 qty-input"
                      style="width:30px; background-color: transparent; border: none; box-shadow: none; color: inherit;" />

                    <button class="btn bg-warning text-light btn-sm mx-0" @click="cartStore.increaseQuantity(item.id)">
                      <i class="bi bi-plus-lg" style="font-weight: 900;"></i>
                    </button>
                  </div>

                  <!-- Prix -->
                  <div class="col-4 col-md-2 text-end">
                    <h6 class="mb-0 fw-bold">{{ (item.price * item.quantity).toFixed(2) }} DH</h6>
                  </div>

                  <!-- Supprimer -->
                  <div class="col-2 col-md-1 text-end">
                    <button class="btn btn-link text-danger" @click="cartStore.removeFromCart(item.id)">
                      <i class="bi bi-trash3-fill fs-5"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Panier vide -->
          <div v-else class="text-center py-5 empty-cart">
            <i class="bi bi-cart-x display-3 text-muted"></i>
            <h4 class="text-muted mt-3">Votre panier est vide</h4>
            <router-link to="/products" class="btn btn-3d btn-dark mt-3">
              <i class="bi bi-bag me-2"></i> Continuer mes achats
            </router-link>
          </div>
        </div>
      </div>
      <div class="side col-lg-4  parent-order">
        <div class="card glass-card shadow-lg p-4 order-summary">
          <h5 class="mb-4 text-center fw-bold">Résumé de la commande</h5>
          <ul class="list-group list-group-flush mb-4">
            <li class="list-group-item d-flex justify-content-between">
              <span>Sous-total</span>
              <strong>{{ cartStore.cartTotal.toFixed(2) }} DH</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>Livraison</span>
              <strong>{{ cartStore.deliveryFee === 0 ? 'Gratuite' : cartStore.deliveryFee + ' DH' }}</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between fs-5">
              <span>Total</span>
              <strong>{{ cartStore.finalTotal.toFixed(2) }} DH</strong>
            </li>
          </ul>
          <MyButton :styleNm="{ backgroundColor: 'var(--orange-fonce)' }" classNm="w-100 mb-2" :disabled="cartStore.carts.length === 0"
          :onClick="() => router.push('/order')"
          >
            <i class="bi bi-credit-card me-2"></i> Passer la commande
          </MyButton>
          <MyButton :styleNm="{ backgroundColor: 'var(--vert-olive-fonce)' }" :onClick="() => router.push('/products')"
            classNm=" w-100">
            <i class="bi bi-arrow-left me-2"></i> Continuer mes achats
          </MyButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import MyButton from "../../components/MyButton.vue";
import { useCartStore } from "../../stores/cartStore";
const router = useRouter();
const cartStore = useCartStore();
</script>

<style scoped>
.content {
  padding: 30px 0;
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
  max-height: 90px;
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

.glass-card {
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
</style>
