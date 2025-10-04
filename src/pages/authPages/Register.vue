<template>
    <div class="register-page">
        <div class="register-card">
            <h3 :style="locale==='fr' ? {borderLeft: '4px solid var(--bs-warning)'} : {borderRight: '4px solid var(--bs-warning)'} " class="title">{{ t('create_account') }}</h3>

            <!-- Message succès -->
            <template v-if="message">
                <div class="alert alert-success" role="alert">
                    {{ message }}
                </div>
                <div class="text-center mb-3">
                    {{ t('please_login') }} :
                    <router-link to="/login" class="link">{{ t('loginIn') }}</router-link>
                </div>

                <!-- Message erreur -->
                <div v-if="error" class="alert alert-danger" role="alert">
                    {{ error }}
                </div>
            </template>

            <!-- Formulaire -->
            <template v-if="!message">
                <form class="form" @submit.prevent="hundleRegister">
                    <div class="row">
                        <!-- Prénom -->
                        <div class="col-md-6 mb-3">
                            <input type="text" v-model="firstname" class="form-control custom-input"
                                :placeholder="t('firstname')" required />
                        </div>

                        <!-- Nom -->
                        <div class="col-md-6 mb-3">
                            <input type="text" v-model="lastname" class="form-control custom-input"
                                :placeholder="t('lastname')" required />
                        </div>
                    </div>

                    <div class="row">
                        <!-- Email -->
                        <div class="col-md-6 mb-3">
                            <input type="email" v-model="email" class="form-control custom-input"
                                :placeholder="t('email')" required />
                        </div>

                        <!-- Téléphone -->
                        <div class="col-md-6 mb-3">
                            <input :dir="locale === 'ar' ? 'rtl' : 'ltr'" type="tel" v-model="tel"
                                class="form-control custom-input" :placeholder="t('tel')" required />
                        </div>
                    </div>

                    <div class="row">
                        <!-- Mot de passe -->
                        <div class="col-md-12 mb-3 position-relative">
                            <input :type="showPassword ? 'text' : 'password'" v-model="password"
                                class="form-control custom-input" :placeholder="t('Password')" required />
                            <span :style="locale === 'fr' ? { right: '1.7rem' } : { left: '1.7rem' }" class="toggle"
                                @click="togglePassword">
                                <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                            </span>
                        </div>
                    </div>

                    <!-- Bouton -->
                    <button type="submit" class="btn-submit w-100" :disabled="loading">
                        {{ loading ? t('loading') : t('sign_up') }}
                    </button>
                    <p v-if="error" style="color: red">{{ error }}</p>
                    <p class="inscr mt-2">
                        {{ t('have_account') }}
                        <router-link to="/login">{{ t('loginIn') }}</router-link>
                    </p>
                </form>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuth } from "../../composables/useAuth";
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const { t } = useI18n();
const { message, loading, error, register } = useAuth();

const firstname = ref("");
const lastname = ref("");
const email = ref("");
const tel = ref("");
const password = ref("");
const showPassword = ref(false);

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

const hundleRegister = async () => {
    const data = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        tel: tel.value,
        password: password.value,
    };
    register(data);
};
</script>

<style scoped>
/* Fond général */
.register-page {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1f1f1f;
    font-family: "Poppins", sans-serif;
}

/* Carte */
.register-card {
    background: #2c2c2c;
    margin: 35px auto 3rem;
    padding: 2rem 2rem 0.5rem;
    border-radius: 30px;
    box-shadow: 8px 8px 16px #191919, -8px -8px 16px #404040;
    width: 100%;
    max-width: 600px;
    color: #fff;
}

/* Titre */
.title {
    background-color: #1f1f1f;
    text-align: center;
    margin-bottom: 2rem;
    color: var(--grey-fonce);
    font-weight: 700;
    font-size: 1.8rem;
    border: none;
}

/* Inputs */
.custom-input {
    background: #1f1f1f;
    border: none;
    border-radius: 50px !important;
    padding: 0.8rem 1rem;
    color: #fff;
    font-size: 1rem;
    box-shadow: inset 4px 4px 6px #151515, inset -4px -4px 6px #292929;
}

.custom-input:focus {
    outline: none;
    box-shadow: inset 2px 2px 4px #151515, inset -2px -2px 4px #292929,
        0 0 0 2px #f4db4e;
}

/* Placeholders visibles */
.custom-input::placeholder {
    color: #7e7d7d;
    opacity: 1;
}

/* Toggle mot de passe */
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
    padding: 0.8rem;
    margin-top: 1rem;
    border: none;
    border-radius: 20px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    background: linear-gradient(145deg, #ffd700, #ffec99);
    color: #1f1f1f;
    box-shadow: 4px 4px 6px #191919, -4px -4px 6px #404040;
    transition: 0.3s;
}

.btn-submit:hover {
    background: linear-gradient(145deg, #ffec99, #ffd700);
}

/* Liens */
.link {
    color: #f4db4e;
    text-decoration: none;
}

.link:hover {
    text-decoration: underline;
}

.form p {
    color: #7e7d7d;
}
h3{
    border:none;
}
</style>
