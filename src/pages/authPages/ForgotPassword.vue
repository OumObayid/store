<template>
  <div class="container mt-5" style="max-width: 500px;">
    <div class="card shadow-sm border-0 rounded-4">
      <div class="card-body p-4">
        <h4 class="mb-3 text-center">Mot de passe oublié</h4>
        <!-- Message de succès -->
        <div v-if="message" class="alert alert-success text-center" role="alert">
          {{ message }}
        </div>

        <!-- Message d'erreur -->
        <div v-if="error" class="alert alert-danger text-center" role="alert">
          {{ error }}
        </div>

        <template v-if="!message && !error" >
          <p class="text-muted text-center">
            Entrez votre adresse e-mail pour recevoir un lien de réinitialisation.
          </p>

          <form @submit.prevent="handleForgotPassword">
            <div class="mb-3">
              <label for="email" class="form-label">Adresse e-mail</label>
              <input v-model.trim="email" type="email" class="form-control" id="email" placeholder="exemple@email.com"
                required />
            </div>

            <button class="btn btn-primary w-100" type="submit" :disabled="loading">
              <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
              Envoyer le lien
            </button>
          </form>
        </template>

      </div>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue';
import { useAuth } from '../../composables/useAuth';

const email = ref()
const { message, error, loading, verifiEmailResetPw } = useAuth();



const handleForgotPassword = (() => {

  const data = {
    email: email.value
  }
  verifiEmailResetPw(data);

})



</script>

<style lang="scss" scoped></style>