<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <!-- Logo -->
      <router-link class="navbar-brand fw-bold" to="/">
        <img src="https://via.placeholder.com/40" alt="Logo" class="me-2" style="height: 40px;">
        Theme Store
      </router-link>

      <!-- Bouton mobile -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menu -->
      <div class="collapse navbar-collapse" id="mainNavbar">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <!-- Produits -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="produitsDropdown" role="button" data-bs-toggle="dropdown">
              Produits
            </a>
            <ul class="dropdown-menu" aria-labelledby="produitsDropdown">
              <li><router-link class="dropdown-item" to="/produits">Liste des produits</router-link></li>
              <li><router-link class="dropdown-item" to="/categories">Produits par catégorie</router-link></li>
            </ul>
          </li>

          <!-- Contact -->
          <li class="nav-item">
            <router-link class="nav-link" to="/contact">Contact</router-link>
          </li>
        </ul>

        <!-- Droite : Connexion / Compte + Panier -->
        <ul class="navbar-nav ms-auto">
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
              <a class="nav-link dropdown-toggle" href="#" id="compteDropdown" role="button" data-bs-toggle="dropdown">
                {{ userName }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="compteDropdown">
                <li><router-link class="dropdown-item" to="/dashboard">Dashboard</router-link></li>
                <li><router-link class="dropdown-item" to="/mes-infos">Mes infos</router-link></li>
                <li><router-link class="dropdown-item" to="/mes-commandes">Mes commandes</router-link></li>
                <li><router-link class="dropdown-item" to="/mes-favoris">Mes favoris</router-link></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#" @click.prevent="logout">Déconnexion</a></li>
              </ul>
            </li>
          </template>

          <!-- Icône panier -->
          <li class="nav-item ms-3">
            <router-link class="nav-link position-relative" to="/panier">
              <i class="bi bi-cart3 fs-5"></i>
              <span v-if="cartCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
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
import { ref } from 'vue'

const isLoggedIn = ref(false) // change en true pour voir le menu "compte"
const userName = ref('Mustapha')
const cartCount = ref(2)

const logout = () => {
  alert('Déconnexion effectuée !')
  isLoggedIn.value = false
}
</script>
