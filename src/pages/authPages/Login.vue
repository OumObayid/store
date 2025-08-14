<template>
  <form @submit.prevent="handleLogin">
    <div>
      <label for="email">Email :</label>
      <input type="email" id="email" v-model="email" required />
    </div>
    <div>
      <label for="password">Mot de passe :</label>
      <input type="password" id="password" v-model="password" required />
    </div>
    <button type="submit" :disabled="loading">
      {{ loading ? "Connexion..." : "Se connecter" }}
    </button>
    <p v-if="error" style="color: red">{{ error }}</p>
    <router-link to="forgot-password">Mot de passe oublié</router-link>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../../composables/useAuth'
import { useAuthStore } from '../../stores/authStore'

const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const { loading, error, login } = useAuth()

async function handleLogin() { 
    // préparer les données pour la connexion
  const data = {
    email: email.value,
    password: password.value
  }
    // appeler la fonction de connexion de useAuth 
  await login(data)

}


</script>
