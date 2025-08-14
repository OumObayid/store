<template>
    <h3 class="mb-4 text-center">Réinitialiser le mot de passe</h3>
    <!-- Message de succès -->
    <div v-if="message" class="alert alert-success text-center" role="alert">
        {{ message }}
    </div>

    <!-- Message d'erreur -->
    <div v-if="error" class="alert alert-danger text-center" role="alert">
        {{ error }}
    </div>


    <template v-if="emailPwToken && !message">
        <form  @submit.prevent="hundleResetPw" id="resetPasswordForm">
            <!-- Nouveau mot de passe -->
            <div class="mb-3">
                <label for="newPassword" class="form-label">Nouveau mot de passe</label>
                <input v-model="password" type="password" class="form-control" id="newPassword" name="newPassword"
                    required minlength="6" placeholder="Entrez votre nouveau mot de passe">
            </div>

            <!-- Confirmer le mot de passe -->
            <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirmer le mot de passe</label>
                <input v-model="confirmPassword" type="password" class="form-control" id="confirmPassword"
                    name="confirmPassword" required minlength="6" placeholder="Confirmez votre mot de passe">
            </div>

            <!-- Bouton -->
            <button :disabled="loading" type="submit" class="btn btn-primary w-100">Mettre à jour</button>
        </form>
    </template>




</template>

<script setup>

import { onMounted } from 'vue';
import { useAuth } from '../../composables/useAuth';
import { useRoute } from 'vue-router'
import { ref } from 'vue';

const { message, error, loading, emailPwToken, verifiePwConfirmToken, resetPassword } = useAuth();

const route = useRoute()
const token = route.query.token
const password = ref("")
const confirmPassword = ref("")

onMounted(() => {
    const dataToken = {
        token: token
    }
    verifiePwConfirmToken(dataToken);
});

const hundleResetPw = () => {

  
    if (password.value !== confirmPassword.value) {
        alert("Les mots de passe ne correspondent pas.");
        return;
    }   
    const data = {
        email: emailPwToken.value,
        password: password.value
    }
    resetPassword(data);
}



</script>

<style lang="scss" scoped></style>