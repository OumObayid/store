<template>
    <div class="sidebar">
        <ul class="list-group">
            <li class="list-group-item">
                <router-link to="/dashboard" class="nav-link">Tableau de bord</router-link>
            </li>
            <li class="list-group-item">
                <router-link to="/dashboard/profile" class="nav-link">Mon Profil</router-link>
            </li>
            <li class="list-group-item">
                <router-link to="/dashboard/my-orders" class="nav-link">Commandes</router-link>
            </li>



            <li class="list-group-item">
                <span @click="handleLogout" class="nav-link">Déconnexion</span>
            </li>

        </ul>

    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
const router = useRouter();
const { logout } = useAuth();
const handleLogout = () => {
    // Appel du service de déconnexion
    logout();
    // Redirection vers la page d'accueil ou de connexion
    router.push('/login');
};
</script>

<style scoped>
.sidebar {
    width: 230px;
    background-color: #f4f4f4;
    border-right: 1px solid #ccc;
    background-color: darkgrey;
    min-height: var(--min-height-body);
    /* Use a CSS variable for min-height */
}
.nav-link {
    color: #333;
    text-decoration: none;
    cursor: pointer;
    font-size: 1.3rem;
}
.nav-link:hover {
    color: white;
}
.list-group-item:hover {
    background-color: #333;
  
}
</style>