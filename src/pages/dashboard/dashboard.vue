<template>
    <div>
        <h1>Dashboard</h1>
            <p>token: {{ token }}</p>
            <p v-if="isLoggedIn">Vous êtes connecté.</p>
            <p>Bonjour: {{ userInfos.firstname }}</p>
            <p>Votre email: {{ userInfos.email }}</p>
            <button @click="handlLogout">se deconnecter</button>
      
    </div>
</template>

<script setup>
import { useAuthStore } from '../../stores/authStore'
import { useAuth } from '../../composables/useAuth'
import { useToken } from '../../composables/useToken';
import { onMounted } from 'vue';

const {token, generateToken}=useToken();

const authStore = useAuthStore();
const { isLoggedIn, userInfos } = authStore;
const { logout } = useAuth()

onMounted(()=>{
    generateToken()
})

const handlLogout = () => {
    logout();
}
</script>
