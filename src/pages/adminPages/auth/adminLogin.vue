<template>
  <div class="login-wrapper">
    <div class="login-card">
      <div class="logo-container">
        <!-- <img src="/images/admin-logo.png" alt="Logo Admin" class="logo" /> -->
        <h1 class="title">Admin Panel</h1>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <input v-model="email" type="email" placeholder="Email" required />
          <span class="icon"><i class="bi bi-envelope-fill"></i></span>
        </div>

        <div class="input-group">
          <input v-model="password" type="password" placeholder="Mot de passe" required />
          <span class="icon"><i class="bi bi-lock-fill"></i></span>
        </div>

        <button type="submit" class="btn-login">
          Se connecter
        </button>

        <p v-if="error" class="error-msg">{{ error }}</p>
      </form>

      <div class="footer-text">
        <small>© 2025 MonSite. Tous droits réservés.</small>
      </div>
    </div>
  </div>
</template>

<!-- <script setup>
import { onMounted, ref } from "vue";
import { useAdminAuth } from "../../../composables/admin/useAdminAuth";
import { useAdminAuthStore } from "../../../stores/admin/adminAuthStore";

const email = ref("");
const password = ref("");
const error = ref(null);
const adminStore = useAdminAuthStore();


const { loading, login } = useAdminAuth();

async function handleLogin() {
  await login({ email: email.value, password: password.value });
}

onMounted(() => {
  if (adminStore.isLoggedIn) {
    router.push('/admin');
  }
});

</script> -->
<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAdminAuth } from "../../../composables/admin/useAdminAuth";
import { useAdminAuthStore } from "../../../stores/admin/adminAuthStore";

const email = ref("");
const password = ref("");
const error = ref(null);
const router = useRouter(); // <-- router manquant

const adminStore = useAdminAuthStore();
const { loading, login } = useAdminAuth();

async function handleLogin() {
  error.value = null; // réinitialiser l'erreur

  const success = await login({ email: email.value, password: password.value });

  if (!success) {
    // récupérer l'erreur du store
    error.value = adminStore.error || "Erreur de connexion.";
  }
  // si success, la redirection est déjà gérée dans le composable
}

// redirection si déjà connecté
onMounted(() => {
  if (adminStore.isLoggedIn) {
    router.push("/admin");
  }
});
</script>


<style scoped>
/* ---------------------------- */
/* Wrapper */
.login-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
  padding: 1rem;
  font-family: 'Poppins', sans-serif;
}

/* Card */
.login-card {
  background: #1f1f1f;
  padding: 3rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 15px 40px rgba(0,0,0,0.7);
  width: 100%;
  max-width: 400px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* Logo */
.logo-container {
  margin-bottom: 2rem;
}
.logo {
  width: 60px;
  height: 60px;
  margin-bottom: 0.5rem;
}
.title {
  color: #FFD700;
  font-weight: 700;
  letter-spacing: 1px;
}

/* Form */
.login-form .input-group {
  position: relative;
  margin-bottom: 1.5rem;
}
.login-form input {
  width: 100%;
  padding: 0.8rem 2.5rem 0.8rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #FFD700;
  background: #2a2a2a;
  color: #fff;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}
.login-form input:focus {
  border-color: #FFC107;
  outline: none;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

/* Icon inside input */
.input-group .icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #FFD700;
}

/* Button */
.btn-login {
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 0.5rem;
  background: linear-gradient(90deg, #FFD700, #FFC107);
  color: #1a1a1a;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn-login:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

/* Error message */
.error-msg {
  color: #ff4d4f;
  margin-top: 1rem;
}

/* Footer */
.footer-text {
  margin-top: 2rem;
  color: #aaa;
  font-size: 0.75rem;
}
</style>
