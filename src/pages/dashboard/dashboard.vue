<template>
    <div>
        <h1>Dashboard</h1>
        
            <p v-if="isLoggedIn">Vous êtes connecté.</p>
            <p>Bonjour: {{ userInfos.firstname }}</p>
            <p>Votre email: {{ userInfos.email }}</p>
            <button @click="handlLogout">se deconnecter</button>
      
    </div>
</template>

<script setup>
import { useAuthStore } from '../../stores/authStore'
import { useAuth } from '../../composables/useAuth'
const authStore = useAuthStore();
const { isLoggedIn, userInfos } = authStore;
const { logout } = useAuth()

const handlLogout = () => {
    logout();
}
</script>
