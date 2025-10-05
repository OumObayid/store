<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import PromoBanner from '../components/PromoBanner.vue'
import { useCartStore } from '../stores/cartStore'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const { logout } = useAuth()

const isLoggedIn = computed(() => authStore.isLoggedIn)
const userInfos = computed(() => authStore.userInfos || {})

const showPromo = ref(true)
const searchQuery = ref('')

const currentLogo = computed(() =>
    locale.value === 'ar'
        ? '/images/logoAr.png'
        : '/images/logoFr.png'
)

const handleSearch = () => {
    if (searchQuery.value.trim() !== '') {
        router.push(`/products/${encodeURIComponent(searchQuery.value.trim())}`)
        searchQuery.value = ''
    }
}

const handleScroll = () => {
    showPromo.value = window.scrollY < 0.1
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)

    const dropdown = document.querySelector('.cart-dropdown')
    const toggleHoverDropdown = () => {
        if (window.innerWidth >= 768 && dropdown) {
            dropdown.addEventListener('mouseenter', () => {
                const menu = dropdown.querySelector('.dropdown-menu')
                menu?.classList.add('show')
            })
            dropdown.addEventListener('mouseleave', () => {
                const menu = dropdown.querySelector('.dropdown-menu')
                menu?.classList.remove('show')
            })
        }
    }
    toggleHoverDropdown()
    window.addEventListener('resize', toggleHoverDropdown)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

function handleLogout() {
    logout()
    router.push('/login')
}
</script>

<template>
    <div class="contain-wrapper">
        <transition name="slide-fade">
            <PromoBanner v-if="showPromo" />
        </transition>

        <nav class="navbar navbar-expand-lg dashboard-header-3d py-md-2 px-md-5"
            :class="{ 'with-promo': showPromo, 'no-promo': !showPromo }">
            <div class="container-fluid align-items-center">

                <!-- 👤 Compte (mobile uniquement) -->
                <div class="position-relative">
                    <a class="nav-link user-3d-btn d-flex align-items-center gap-2 d-md-none" href="#"
                        id="compteDropdownMobile" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i v-if="!isLoggedIn" class="bi bi-person-circle fs-5"></i>
                        <i v-if="isLoggedIn" class="bi bi-person-circle fs-5 text-warning"></i>
                    </a>
                    <ul class="dropdown-menu  user-dropdown-3d d-md-none"
                        aria-labelledby="compteDropdownMobile">
                        <template v-if="!isLoggedIn">
                            <li><router-link class="dropdown-item" to="/login">{{ $t('login') }}</router-link></li>
                            <li><router-link class="dropdown-item" to="/register">{{ $t('register') }}</router-link>
                            </li>
                        </template>
                        <template v-else>
                            <li><router-link class="dropdown-item" to="/dashboard">{{ $t('dashboardHeader')
                            }}</router-link>
                            </li>
                            <li><router-link class="dropdown-item" to="#">{{ $t('myInfos') }}</router-link></li>
                            <li><router-link class="dropdown-item" to="#">{{ $t('myOrders') }}</router-link></li>
                            <li><router-link class="dropdown-item" to="/dashboard/wishlist">{{ $t('wishlist')
                            }}</router-link></li>
                            <li>
                                <hr class="dropdown-divider" />
                            </li>
                            <li><a class="dropdown-item" href="#" @click.prevent="handleLogout">{{ $t('logout') }}</a>
                            </li>
                        </template>
                    </ul>
                </div>

                <!-- 🏷️ Logo -->
                <router-link class="router-logo navbar-brand" to="/">
                    <img :src="currentLogo" alt="Logo" class="logo" />
                </router-link>

                <!-- ☰ Bouton hamburger -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="bi bi-list"></i>
                </button>
            </div>

            <!-- 🔍 Barre de recherche : visible partout, sous la première ligne -->
            <div class="search-bar-wrapper px-3 py-2">
                <div class="search-bar-3d">
                    <input type="text" v-model="searchQuery" :placeholder="$t('search')" @keyup.enter="handleSearch" />
                    <button @click="handleSearch"><i class="bi bi-search"></i></button>
                </div>
            </div>

            <!-- 📜 Menu principal (collapse) -->
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item"><router-link class="nav-link" to="/products">{{ $t('store') }}</router-link>
                    </li>
                    <li class="nav-item"><router-link class="nav-link" to="/categories">{{ $t('collections')
                            }}</router-link></li>
                    <li class="nav-item"><router-link class="nav-link" to="/about">{{ $t('aboutUs') }}</router-link>
                    </li>
                    <li class="nav-item"><router-link class="nav-link" to="/contact">{{ $t('contact') }}</router-link>
                    </li>
                </ul>

                <!-- 🛒 Icônes et compte desktop -->
                <ul class="navbar-nav actions flex-row ms-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown cart-dropdown position-relative">
                        <a class="action-btn position-relative mx-2 dropdown-toggle" href="#" id="cartDropdown"
                            role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-cart"></i>
                            <span v-if="cartStore.cartCount > 0" class="position-absolute badge-cart rounded-pill">
                                {{ cartStore.cartCount }}
                            </span>
                        </a>
                        <ul class="dropdown-menu  p-3 cart-panel" aria-labelledby="cartDropdown">
                            <template v-if="cartStore.carts.length">
                                <li v-for="item in cartStore.carts" :key="item.id"
                                    class="d-flex align-items-center mb-2">
                                    <img :src="item.image" alt="" class="rounded me-2"
                                        style="width: 40px; height: 40px; object-fit: cover;" />
                                    <div class="flex-grow-1">
                                        <p class="mb-0 fw-semibold small">{{ item.nom }}</p>
                                        <p class="mb-0 text-muted small">{{ item.quantity }} × {{ item.prix }} dh</p>
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
                                    <router-link to="/cart" class="btn btn-warning w-100 btn-sm">Voir le
                                        panier</router-link>
                                </li>
                            </template>
                            <template v-else>
                                <li class="text-center text-muted">Votre panier est vide.</li>
                            </template>
                        </ul>
                    </li>

                    <!-- 👤 Compte (desktop) -->
                    <li class="nav-item dropdown d-none d-lg-block">
                        <a class="nav-link user-3d-btn d-flex align-items-center gap-2" href="#" id="compteDropdown"
                            role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i v-if="!isLoggedIn" class="bi bi-person-circle fs-5"></i>
                            <i v-if="isLoggedIn" class="bi bi-person-circle fs-5 text-warning"></i>
                            <span v-if="isLoggedIn">{{ $t('hello') }} {{ userInfos.firstname }}</span>
                        </a>
                        <ul :class="[
                            'dropdown-menu',
                            locale === 'ar' ? 'dropdown-menu-start' : 'dropdown-menu-end',
                            'user-dropdown-3d'
                        ]" aria-labelledby="compteDropdown">
                            <template v-if="!isLoggedIn">
                                <li><router-link class="dropdown-item" to="/login">{{ $t('login') }}</router-link></li>
                                <li><router-link class="dropdown-item" to="/register">{{ $t('register') }}</router-link>
                                </li>
                            </template>
                            <template v-else>
                                <li><router-link class="dropdown-item" to="/dashboard">{{ $t('dashboardHeader')
                                        }}</router-link></li>
                                <li><router-link class="dropdown-item" to="#">{{ $t('myInfos') }}</router-link></li>
                                <li><router-link class="dropdown-item" to="#">{{ $t('myOrders') }}</router-link></li>
                                <li><router-link class="dropdown-item" to="/dashboard/wishlist">{{ $t('wishlist')
                                        }}</router-link></li>
                                <li>
                                    <hr class="dropdown-divider" />
                                </li>
                                <li><a class="dropdown-item" href="#" @click.prevent="handleLogout">{{ $t('logout')
                                        }}</a></li>
                            </template>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<style scoped>
/* =========================
   NAVBAR PRINCIPALE
========================= */


.dashboard-header-3d {
    color: var(--grey-clear) !important;
    position: fixed;
    top: 0;
    z-index: 10;
    width: 100%;
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

/* =========================
   HAMBURGER
========================= */
.navbar-toggler {
    border: none;
    color: var(--gold);
}

.navbar-toggler:focus {
    box-shadow: none;
}

.navbar-toggler i {
    color: var(--grey-clear);
    font-size: 1.5rem;
}

/* =========================
   LOGO
========================= */
.router-logo {
    flex: 0 0 auto;
    width: auto;
    display: flex;
    align-items: center;
}

.logo {
    max-height: 40px;
    width: auto;
    object-fit: contain;
}

/* =========================
   MENUS
========================= */
.navbar-nav .nav-link {
    color: var(--grey-clear);
    font-weight: 500;
    transition: 0.3s;
    padding: 0.5rem 1rem;
}

.navbar-nav .nav-link:hover {
    color: var(--gold);
}

/* =========================
   RESPONSIVE NAVBAR (mobile)
========================= */
@media (max-width: 991.98px) {
    .dashboard-header-3d {
        height: auto;
    }

    .navbar-collapse {
        background: linear-gradient(145deg, #2f2f2f, #1e1e1e);
        border-radius: 12px;
        margin-top: 10px;
        padding: 1rem;
        box-shadow: 6px 6px 12px #1a1a1a, -6px -6px 12px #3a3a3a;
    }

    .navbar-nav {
        flex-direction: column;
    }

    .actions {
        margin-top: 1rem;
    }
}

/* =========================
   BARRE DE RECHERCHE
========================= */
.search-bar-wrapper {
    width: 100%;
    text-align: center;
}

.search-bar-3d {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #2a2a2a;
    border-radius: 30px;
    padding: 0.3rem 0.6rem;
    box-shadow: inset 2px 2px 5px #1a1a1a, inset -2px -2px 5px #3a3a3a;
    margin: 0 auto;
    transition: all 0.3s ease;
}

.search-bar-3d input {
    flex: 1;
    background: transparent;
    border: none;
    color: white;
    padding: 0.3rem 0.6rem;
    outline: none;
}

.search-bar-3d button {
    background: transparent;
    border: none;
    color: var(--gold);
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s;
}

.search-bar-3d button:hover {
    color: var(--grey-clear);
}

/* Desktop : centrée et petite */
@media (min-width: 992px) {
    .search-bar-3d {
        max-width: 260px;
    }

    .container-fluid.align-items-center,
    .search-bar-wrapper.px-3.py-2 {
        width: auto !important;
    }
}

/* Mobile : pleine largeur */
@media (max-width: 991.98px) {
    .search-bar-3d {
        width: 100%;
        max-width: 100%;
        margin-top: 8px;
    }
}

/* =========================
   ACTIONS (panier, utilisateur)
========================= */
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

/* =========================
   PANIER (dropdown)
========================= */

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
    font-size: .65rem;
    font-weight: bold;
    padding: 1px 6px;
}

/* =========================
   UTILISATEUR (dropdown)
========================= */
.dropdown-toggle::after {
    display: none !important;
}

.user-3d-btn {
    border-radius: 50px;
    padding: 0.4rem 0.8rem;
    color: var(--grey-clear);
    transition: 0.3s;
}

.user-3d-btn:hover {
    color: var(--gold);
}

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

/* =========================
   PROMO & CONTAINER GLOBAL
========================= */
.contain-wrapper {
    padding-bottom: 60px;
    background: #1f1f1f;
}

/* =========================
   TRANSITION PROMOBANNER
========================= */
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