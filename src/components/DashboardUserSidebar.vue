<template>
    <div class="sidebar d-flex flex-column justify-content-between">
        <ul class="list-group">
            <li class="list-group-item" :class="{ active: $route.path === '/dashboard' }">
                <router-link to="/dashboard" class="nav-link">
                    <i class="bi bi-speedometer2 mx-2" :class="iconMargin" ></i> {{ $t("dashboard") }}
                </router-link>
            </li>
            <li class="list-group-item" :class="{ active: $route.path === '/dashboard/profile' }">
                <router-link to="/dashboard/profile" class="nav-link">
                    <i class="bi bi-person-circle mx-2" :class="iconMargin"></i>{{ $t("profile") }}
                </router-link>
            </li>
            <li class="list-group-item" :class="{ active: $route.path === '/dashboard/orders' }">
                <router-link to="/dashboard/orders" class="nav-link">
                    <i class="bi bi-bag-check mx-2" :class="iconMargin"></i> {{ $t("orders") }}
                </router-link>
            </li>
            <li class="list-group-item" :class="{ active: $route.path === '/dashboard/wishlist' }">
                <router-link to="/dashboard/wishlist" class="nav-link">
                    <i class="bi bi-heart mx-2" :class="iconMargin"></i> {{ $t("wishlist") }}
                </router-link>
            </li>
            <!-- Bouton déconnexion en bas -->
            <!-- <div class="logout-section">
                <span @click="handleLogout" class="nav-link logout">
                    <i class="bi bi-box-arrow-right mx-2" :class="iconMargin"></i> {{ $t("logout") }}
                </span>
            </div> -->
        </ul>


    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';


const router = useRouter();
const { logout } = useAuth();

const handleLogout = () => {
    logout();
    router.push('/login');
};
</script>

<style scoped>

.sidebar {
    position: sticky;        /* reste collé au scroll mais ne chevauche pas */
    top: 80px;    
    left: 0;
    width: 230px;
    background: linear-gradient(180deg, #2f2f2f, #1e1e1e);
    border-right: 1px solid #444;
    color: white;
    min-height: 100vh;
    padding-top: 4rem ;
    display: flex;
    flex-direction: column;
}

.list-group-item {
    background: transparent;
    border: none;
    padding: 12px 20px;
    transition: all 0.3s ease;
}

.list-group-item.active,
.list-group-item:hover {
    background:var(--gold);
    border-radius: 8px;
}

.nav-link {
    color: white;
    font-size: 1.1rem;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: 0.3s;
}

.nav-link:hover {
    color: #000;
}

.logout-section {
    margin-top: auto;
    padding: 1rem;
}

.logout {
    color:var(--gold);
    font-weight: bold;
    cursor: pointer;
}

.logout:hover {
    color: white;
}
</style>
