<script setup>
// Simulations pour démo
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import PromoBanner from '../components/PromoBanner.vue';
import { onUnmounted } from 'vue';

import { useCartStore } from "../stores/cartStore";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const currentLogo = computed(() =>
  locale.value === "ar"
    ? "/images/logoAr.png"
    : "/images/logoFr.png"
);

const cartStore = useCartStore();

const { logout } = useAuth();
const router = useRouter();
const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isLoggedIn);
const userInfos = computed(() => authStore.userInfos || {});
const showPromo = ref(true);

const searchQuery = ref('')
const handleSearch = () => {
  if (searchQuery.value.trim() !== '') {
    // redirige vers /products/:query
    router.push(`/products/${encodeURIComponent(searchQuery.value.trim())}`)
    searchQuery.value = '' // facultatif : vide le champ après recherche
  }
}
// Gestion du scroll
const handleScroll = () => {
  showPromo.value = window.scrollY < 0.1 // après 80px de scroll, cache promo
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  const dropdown = document.querySelector(".cart-dropdown");

  const toggleHoverDropdown = (e) => {
    if (window.innerWidth >= 768) {
      dropdown.addEventListener("mouseenter", () => {
        const menu = dropdown.querySelector(".dropdown-menu");
        menu.classList.add("show");
      });

      dropdown.addEventListener("mouseleave", () => {
        const menu = dropdown.querySelector(".dropdown-menu");
        menu.classList.remove("show");
      });
    }
  }

  toggleHoverDropdown();
  window.addEventListener("resize", toggleHoverDropdown);
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener("resize", () => { });
})

// Déconnexion
function handleLogout() {
  logout();
  router.push('/login');
}
</script>


<template>
  <div class="contain-wrapper">
    <transition name="slide-fade">
      <PromoBanner v-if="showPromo" />
    </transition>

    <nav class=" navbar navbar-expand-lg dashboard-header-3d"
      :class="{ 'with-promo': showPromo, 'no-promo': !showPromo }">
      <div class="container-fluid">
        <router-link class="router-logo navbar-brand flex-grow-1" to="/">
          <img :src="currentLogo" alt="Logo" class="logo" />
        </router-link>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <i class="bi bi-list"></i>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">

            <li class="nav-item">
              <router-link class="nav-link" to="/products">
                {{ $t("store") }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/categories">
                {{ $t("collections") }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">
                {{ $t("aboutUs") }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/contact">
                {{ $t("contact") }}
              </router-link>
            </li>
          </ul>

          <div class="search-bar-3d d-none d-lg-flex ">
            <input class="mx-0" type="text" v-model="searchQuery" :placeholder="$t('search')"
              @keyup.enter="handleSearch" />
            <button @click="handleSearch()"><i class="bi bi-search "></i></button>
          </div>

          <ul class="navbar-nav actions flex-row ms-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown cart-dropdown position-relative">
              <!-- Icône panier -->
              <a class="action-btn position-relative mx-2 dropdown-toggle" href="#" id="cartDropdown" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-cart"></i>

                <!-- Badge Bootstrap plus petit -->
                <span v-if="cartStore.cartCount > 0" class="position-absolute badge-cart    rounded-pill  ">
                  {{ cartStore.cartCount }}
                  <span class="visually-hidden">articles dans le panier</span>
                </span>
              </a>


              <!-- Panel du panier -->
              <ul class="dropdown-menu  p-3 cart-panel" aria-labelledby="cartDropdown">
                <template v-if="cartStore.carts.length">
                  <li v-for="item in cartStore.carts" :key="item.id" class="d-flex align-items-center mb-2">
                    <img :src="item.image" alt="" class="rounded me-2"
                      style="width: 40px; height: 40px; object-fit: cover;" />
                    <div class="flex-grow-1">
                      <p class="mb-0 fw-semibold small">{{ item.nom }}</p>
                      <p class="mb-0 text-muted small">
                        {{ item.quantity }} × {{ item.prix }} dh
                      </p>
                    </div>
                  </li>

                  <li>
                    <hr class="dropdown-divider" />
                  </li>

                  <li class="d-flex justify-content-between fw-bold">
                    <span>Sous-total :</span>
                    <span>{{ cartStore.cartTotal }} dh</span>
                  </li>

                  <li class="mt-2">
                    <router-link to="/cart" class="btn btn-warning w-100 btn-sm">
                      Voir le panier
                    </router-link>
                  </li>
                </template>

                <template v-else>
                  <li class="text-center text-muted">Votre panier est vide.</li>
                </template>
              </ul>
            </li>


            <li class="nav-item dropdown">
              <a class="nav-link user-3d-btn d-flex align-items-center gap-2" href="#" id="compteDropdown" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-person-circle fs-5"></i>
                <span class="d-none d-md-block" v-if="isLoggedIn">{{ $t("hello") }} {{ userInfos.firstname }}</span>
              </a>

              <ul :class="[
                'dropdown-menu',
                locale === 'ar' ? 'dropdown-menu-start' : 'dropdown-menu-end',
                'user-dropdown-3d'
              ]" aria-labelledby="compteDropdown">
                <template v-if="!isLoggedIn">
                  <li>
                    <router-link class="dropdown-item" to="/login">{{ $t("login") }}</router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" to="/register">{{ $t("register")
                    }}</router-link>
                  </li>
                </template>
                <template v-else>
                  <li>
                    <router-link class="dropdown-item" to="/dashboard">{{ $t("dashboardHeader")
                    }}</router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" to="#">{{ $t("myInfos")
                    }}</router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" to="#">{{ $t("myOrders")
                    }}</router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" to="/dashboard/wishlist">{{ $t("wishlist")
                    }}</router-link>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" @click.prevent="handleLogout">{{ $t("logout")
                    }}</a>
                  </li>
                </template>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>




</template>


<style scoped>
/* Reset et conteneur de base de la navbar */

.dashboard-header-3d {
  color: var(--grey-clear) !important;
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  padding: 5px 20px;
  background: #1f1f1f;
  transition: top 0.3s ease;
  font-family: "Poppins", sans-serif;

  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5);
}

.dashboard-header-3d .container-fluid {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.dashboard-header-3d.with-promo {
  top: 46px;
}

.dashboard-header-3d.no-promo {
  top: 0;
}

/* Bouton du 'hamburger' menu */
.navbar-toggler {
  border: none;
  color: var(--gold);
}

.navbar-toggler:focus {
  box-shadow: none;
}

.navbar-toggler-icon {
  color: var(--gold);
}

.navbar-toggler i {
  color: var(--grey-clear);
  font-size: 1.5rem;
}

/* Logo */
.logo {
  max-height: 40px;
  width: auto;
  object-fit: contain;
}

/* Menu de navigation (grand écran) */
.navbar-nav .nav-link {
  color: var(--grey-clear);
  font-weight: 500;
  transition: 0.3s;
  padding: 0.5rem 1rem;
}

.navbar-nav .nav-link:hover {
  color: var(--gold);
}

/* Menu de navigation (petit écran) */
@media (max-width: 991.98px) {
  .dashboard-header-3d {
    height: auto;
    padding: 10px 20px;
  }

  .navbar-collapse {
    background: linear-gradient(145deg, #2f2f2f, #1e1e1e);
    border-radius: 12px;
    margin-top: 10px;
    padding: 1rem;
    box-shadow: 6px 6px 12px #1a1a1a, -6px -6-6px 12px #3a3a3a;
  }

  .navbar-nav {
    flex-direction: column;
  }

  .search-bar-3d {
    display: flex !important;
    width: 100%;
    margin-top: 1rem;
  }

  .actions {
    margin-top: 1rem;
  }
}

/* Barre de recherche */
.search-bar-3d {
  display: flex;
  align-items: center;
  background: #2a2a2a;
  border-radius: 30px;
  padding: 0.3rem 0.6rem;
  box-shadow: inset 2px 2px 5px #1a1a1a, inset -2px -2px 5px #3a3a3a;
  /* Nouvel ajout: Ajuste la largeur */
  max-width: 200px;
  width: 100%;
}

.search-bar-3d input {
  flex: 1;
  border: none;
  outline: none;
  padding: 0.5rem 0.2rem 0.5rem 1rem;
  background: transparent;
  color: var(--grey-clear);
  font-size: 1rem;

}

.search-bar-3d input::placeholder {
  color: var(--grey-clear);
}



.search-bar-3d button {
  background: transparent;
  color: var(--grey-clear);
  border: none;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;
}

.search-bar-3d button:hover {
  color: var(--gold);
}

/* Actions */
.actions {
  gap: 12px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.actions li {
  display: flex;
  align-items: center;
}

/* Boutons actions */
.action-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.3rem;
  color: var(--grey-clear);
  transition: 0.3s;
}

.action-btn:hover {
  color: var(--gold);
}

/* Dropdown du panier */
.cart-dropdown .dropdown-menu {
  position: absolute;
  min-width: 280px;
  max-height: 400px;
  overflow-y: auto;
  background: #2a2a2a;
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  /* Position sous l'icône */
  top: calc(100% + 8px);
  left: 200px;

  /* Effet d'apparition */
  opacity: 0;
  transform: translateY(-10px);
  /* remonte depuis le haut */
  transition: all 0.3s ease;
  pointer-events: none;
  /* empêche interaction quand caché */
}

/* Texte */
.cart-dropdown .dropdown-menu li {
  color: #fff;
}

.cart-dropdown .dropdown-menu li p {
  color: var(--grey-clear);
}

/* Badge panier */
.badge-cart {
  background-color: var(--orange-fonce);
  color: white !important;
  position: absolute;
  top: 4px;
  right: -3px;
  color: var(--gold);
  font-size: .65rem;
  font-weight: bold;
  padding: 1px 6px;


}

.dropdown-toggle::after {
  display: none !important;
}

/* Utilisateur */
.user-3d-btn {
  border-radius: 50px;
  padding: 0.4rem 0.8rem;
  color: var(--grey-clear);
  transition: 0.3s;
}

.user-3d-btn:hover {
  color: var(--gold);
}

/* Dropdown */
.user-dropdown-3d {
  background: linear-gradient(145deg, #2a2a2a, #1e1e1e);
  border-radius: 12px;
  box-shadow: 6px 6px 12px #1a1a1a, -6px -6px 12px #3a3a3a;
  border: none;
  padding: 0.5rem 0;
}

.user-dropdown-3d .dropdown-item {
  color: var(--gold);
  padding: 0.6rem 1.5rem !important;
  transition: all 0.2s;
}

.user-dropdown-3d .dropdown-item:hover {
  background: var(--gold);
  color: #ffffff;
  border-radius: 8px;
}

.contain-wrapper {
  padding-bottom: 60px;
  background: #1f1f1f;
}

/* Transition slide + fade pour PromoBanner */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 1;
  transform: translateY(-100%);
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>