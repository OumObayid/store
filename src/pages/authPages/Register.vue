<template>
    <div class="container py-5">
        <div class="row justify-content-center">           
                <div class="card shadow-sm border-0">
                    <div class="card-body p-4">
                        <h3 class="text-center mb-4">Créer un compte</h3>
                        <template v-if="message">
                            <!-- Message de succès -->
                            <div class="alert alert-success" role="alert">
                                {{ message }}

                            </div>
                            <div>Veuillez vous connectez à travers ce lien:  <router-link to="/login">login</router-link>
                            </div>

                            <!-- Message d'erreur -->
                            <div v-if="error" class="alert alert-danger" role="alert">
                                {{ error }}
                            </div>
                        </template>
                        <template v-if="!message">
                            <form @submit.prevent="hundleRegister">
                                <!-- Prénom -->
                                <div class="mb-3">
                                    <label class="form-label">Prénom</label>
                                    <input type="text" v-model="firstname" class="form-control"
                                        placeholder="Votre prénom" required>
                                </div>

                                <!-- Nom -->
                                <div class="mb-3">
                                    <label class="form-label">Nom</label>
                                    <input type="text" v-model="lastname" class="form-control" placeholder="Votre nom"
                                        required>
                                </div>

                                <!-- Email -->
                                <div class="mb-3">
                                    <label class="form-label">Email</label>
                                    <input type="email" v-model="email" class="form-control"
                                        placeholder="exemple@mail.com" required>
                                </div>

                                <!-- Téléphone -->
                                <div class="mb-3">
                                    <label class="form-label">Téléphone</label>
                                    <input type="tel" v-model="tel" class="form-control" placeholder="06 12 34 56 78"
                                        required>
                                </div>

                                <!-- Mot de passe -->
                                <div class="mb-3">
                                    <label class="form-label">Mot de passe</label>
                                    <input type="password" v-model="password" class="form-control"
                                        placeholder="********" required>
                                </div>

                                <!-- Bouton -->
                                <button type="submit" class="btn btn-primary w-100" :disabled="loading">
                                    <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                                    S'inscrire
                                </button>
                            </form>
                        </template>


                    </div>
                </div>
           
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../../composables/useAuth'

const { message, loading, error, register } = useAuth();

const firstname = ref('')
const lastname = ref('')
const email = ref('')
const tel = ref('')
const password = ref('')



const hundleRegister = async () => {
    const data = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        tel: tel.value,
        password: password.value,
    }

    register(data);
}

</script>
