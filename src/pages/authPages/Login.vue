<template>
  <div class="login-page px-4  py-md-2">
    <div class="login-card ">
      <h4
        :style="locale === 'fr' ? { borderLeft: '4px solid var(--bs-warning)' } : { borderRight: '4px solid var(--bs-warning)' }"
        class="title">{{ $t("loginIn") }}</h4>
      <form class="form" @submit.prevent="handleLogin">
        <div class="input-group">
          <input type="email" :placeholder="$t('email')" v-model="email" required />
        </div>
        <div class="input-group">
          <input :type="showPassword ? 'text' : 'password'" :placeholder="$t('Password')" v-model="password" required />
          <span :style="locale === 'fr' ? { right: '1rem' } : { left: '1rem' }" class="toggle" @click="togglePassword">
            <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
          </span>
        </div>
        <MyButton typeNm="submit" :disabled="loading_auth" class="py-1 w-100">
          {{ loading_auth ? $t("loading") : $t("loginIn") }}
        </MyButton>
        <p v-if="error_auth" style="color: red">{{ error_auth }}</p>
        <p class="mt-2">
          <router-link to="forgot-password">{{ $t("forgot_password") }}</router-link>
        </p>
        <p class="mt-2">
          {{ $t("no_account") }}
          <router-link to="/register"> {{ $t("sign_up") }}</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import {  ref } from 'vue'
import { useAuth } from '../../composables/useAuth'
import { useAuthStore } from '../../stores/authStore'
const authStore = useAuthStore()
import { useI18n } from "vue-i18n";
import { useCartStore } from '../../stores/cartStore';
import { storeToRefs } from 'pinia';
import { useCart } from '../../composables/useCart';
import MyButton from '../../components/MyButton.vue';

const { locale } = useI18n();

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const { error: error_auth, loading: loading_auth, login } = useAuth()
const cartStore = useCartStore()
const { items_temp } = storeToRefs(cartStore);
const { addToCartUse, clearCartTemp } = useCart();

async function handleLogin() {
  // préparer les données pour la connexion
  const data = {
    email: email.value,
    password: password.value
  }
  // appeler la fonction de connexion de useAuth
  await login(data);
//en se connectant , ajouter les articles du panier temporaire au panier de l'utilisateur
  if (!error_auth.value) {
    if (items_temp.value.length > 0) {
      for (const item of items_temp.value) {
        const quantity = Number(item.quantity);
        const data = { product: item, quantity };
        await addToCartUse(data);
      }
      await clearCartTemp();
    }
  }
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

  background: #1f1f1f;
  /* gris foncé */
  font-family: 'Poppins', sans-serif;
}

/* Carte claymorphism */
.login-card {
  background: #2c2c2c;
  margin: 30px auto;
  padding: 2.1rem 2rem;
  border-radius: 30px;
  box-shadow:
    8px 8px 16px #191919,
    -8px -8px 16px #404040;
  width: 100%;
  max-width: 400px;
  position: relative;
  color: #fff;
}
@media (max-width: 767px) {
  .login-page {
    padding-top: 4.5rem;
  }
}
/* Titre */
.title {
  background-color: #1f1f1f;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--grey-clear);
  font-weight: 700;
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
  color: var(--grise-clear) !important;
  font-size: 1rem;
  box-shadow: inset 4px 4px 6px #151515,
    inset -4px -4px 6px #292929;
  display: block;
  outline: none;
}
.input-group input::placeholder {
  color: var(--grey-clear);
}
.toggle {
  position: absolute;
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

.form p {
  color: var(--grey-clear);
}

h3 {
  border: none
}
</style>
