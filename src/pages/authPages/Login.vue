<template>
  <div class="login-page">
    <div class="login-card">
      <h2 class="title">Connexion</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <input type="email" placeholder="Email" v-model="email" required />
        </div>
        <div class="input-group">
          <input :type="showPassword ? 'text' : 'password'" placeholder="Mot de passe" v-model="password" required />
          <span class="toggle" @click="togglePassword">{{ showPassword ? '🙈' : '👁️' }}</span>
        </div>
        <button type="submit" :disabled="loading" class="btn-submit">
          {{ loading ? "Chargement..." : "Se connecter" }}
        </button>       
        <p v-if="error" style="color: red">{{ error }}</p>
        <p class="forgot"><router-link to="forgot-password">Mot de passe oublié ?</router-link></p>
        <p class="mt-2"><router-link to="/register">Pas encore de compte ? Inscrivez-vous</router-link></p>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../../composables/useAuth'
import { useAuthStore } from '../../stores/authStore'
const authStore = useAuthStore()


const email = ref('')
const password = ref('')
const showPassword = ref(false)
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

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<style scoped>
/* Fond général */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #1f1f1f;
  /* gris foncé */
  font-family: 'Poppins', sans-serif;
}

/* Carte claymorphism */
.login-card {
  background: #2c2c2c;
  /* un peu plus clair que le fond */
  padding: 3rem 2rem;
  border-radius: 30px;
  box-shadow:
    8px 8px 16px #191919,
    -8px -8px 16px #404040;
  width: 100%;
  max-width: 400px;
  position: relative;
  color: #fff;
}

/* Titre */
.title {
  text-align: center;
  margin-bottom: 2rem;
  color: #f4db4e;
  /* jaune moutarde */
  font-weight: 700;
  font-size: 1.8rem;
}

/* Input group */
.input-group {
  position: relative;
  margin-bottom: 1.5rem;
}

.input-group input {
  width: 100%;
  padding: 0.8rem 3rem 0.8rem 1rem;
  /* plus de padding-right pour l'icône */
  border-radius: 50px !important;
  /* forme pillule */
  border: none;
  background: #1f1f1f;
  color: #fff;
  font-size: 1rem;
  box-shadow: inset 4px 4px 6px #151515,
    inset -4px -4px 6px #292929;
  display: block;
  outline: none;
}

.toggle {
  position: absolute;
  right: 1rem;
  /* bien à l'intérieur du padding-right */
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #ffd700;
  font-size: 1.2rem;
  user-select: none;
}



/* Bouton */
.btn-submit {
  width: 100%;
  padding: 0.8rem;
  margin-top: 1rem;
  border: none;
  border-radius: 20px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  background: linear-gradient(145deg, #ffd700, #ffec99);
  color: #1f1f1f;
  box-shadow: 4px 4px 6px #191919,
    -4px -4px 6px #404040;
  transition: 0.3s;
}

.btn-submit:hover {
  background: linear-gradient(145deg, #ffec99, #ffd700);
}

/* Lien mot de passe oublié */
.forgot {
  text-align: center;
  margin-top: 1rem;
}

.forgot a {
  color: #f4db4e;
  text-decoration: none;
}

.forgot a:hover {
  text-decoration: underline;
}
</style>
