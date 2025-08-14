<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <!-- Logo -->
            <router-link class="navbar-brand fw-bold" to="/">
                <img src="/images/logo.png" alt="Logo" class="me-2" style="height: 40px;">
            </router-link>

            <!-- Bouton mobile -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Menu -->
            <div class="collapse navbar-collapse" id="mainNavbar">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0"> <!-- ms-auto pour aligner à droite -->
                    <!-- Produits -->
                    <li class="nav-item">
                        <router-link class="nav-link" to="/products">Produits</router-link>
                    </li>
                    <!-- Catégories -->
                    <li class="nav-item">
                        <router-link class="nav-link" to="/categories">Catégories</router-link>
                    </li>
                    <!-- Contact -->
                    <li class="nav-item">
                        <router-link class="nav-link" to="/contact">Contact</router-link>
                    </li>

                    <!-- Si l'utilisateur n'est pas connecté -->
                    <template v-if="!isLoggedIn">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/login">Connexion</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/register">Inscription</router-link>
                        </li>
                    </template>

                    <!-- Si l'utilisateur est connecté -->
                    <template v-else>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle " href="#" id="compteDropdown" role="button"
                                data-bs-toggle="dropdown">
                                {{ userInfos.firstname || 'Compte' }}
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="compteDropdown">
                                <li><router-link class="dropdown-item" to="/dashboard">Dashboard</router-link></li>
                                <li><router-link class="dropdown-item" to="/mes-infos">Mes infos</router-link></li>
                                <li><router-link class="dropdown-item" to="/mes-commandes">Mes commandes</router-link>
                                </li>
                                <li><router-link class="dropdown-item" to="/mes-favoris">Mes favoris</router-link></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><a class="dropdown-item" href="#" @click.prevent="handleLogout">Déconnexion</a></li>
                            </ul>
                        </li>
                    </template>

                    <!-- Icône panier -->
                  <li class="nav-item ms-3 d-flex align-items-center">
  <router-link class="nav-link p-0 position-relative" to="/panier">
    <!-- Icône du panier -->
    <i class="bi bi-cart fs-4 text-white"></i>

    <!-- Badge positionné correctement par rapport à l'icône -->
    <span v-if="cartCount > 0"
          class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger fs-7"
          style="font-size: 0.65rem; padding: 0.25em 0.4em;">
      {{ cartCount }}
    </span>
  </router-link>
</li>



                </ul>
            </div>
        </div>
    </nav>

</template>

<script setup>
// Simulations pour démo
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';

const { logout } = useAuth();
const router = useRouter();
const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isLoggedIn);
const userInfos = computed(() => authStore.userInfos || {});
const cartCount = ref(2)

function handleLogout() {
    logout();
    router.push('/login');
}
</script>
