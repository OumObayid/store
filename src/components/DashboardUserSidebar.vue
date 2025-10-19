<template>
    <div class="sidebar d-flex flex-column justify-content-start">
        <!-- Header mobile -->
        <div v-if="isMobile" class="sidebar-header ">
            <!-- Header principal (desktop uniquement) -->

            <Header />

        </div>

        <!-- Menu -->
        <ul class="list-group">
            <li class="list-group-item" :class="{ active: $route.path === '/dashboard' }">
                <router-link to="/dashboard" class="nav-link" @click.native="navigate">
                    <i class="bi bi-speedometer2 mx-2"></i> {{ $t("dashboard.title") }}
                    <span v-if="locale === 'fr'" class="selected"></span>
                    <span v-if="locale === 'ar'" class="selected2"></span>
                </router-link>
            </li>
            <li class="list-group-item" :class="{ active: $route.path === '/dashboard/profile' }">
                <router-link to="/dashboard/profile" class="nav-link" @click.native="navigate">
                    <i class="bi bi-person-circle mx-2"></i>{{ $t("myprofile") }}
                    <span v-if="locale === 'fr'" class="selected"></span>
                    <span v-if="locale === 'ar'" class="selected2"></span>
                </router-link>
            </li>
            <li class="list-group-item" :class="{ active: $route.path === '/dashboard/my-orders' }">
                <router-link to="/dashboard/my-orders" class="nav-link" @click.native="navigate">
                    <i class="bi bi-bag-check mx-2"></i> {{ $t("myorders") }}
                    <span v-if="locale === 'fr'" class="selected"></span>
                    <span v-if="locale === 'ar'" class="selected2"></span> </router-link>
            </li>
          
            <li class="list-group-item" :class="{ active: $route.path === '/dashboard/wishlist' }">
                <router-link to="/dashboard/wishlist" class="nav-link" @click.native="navigate">
                    <i class="bi bi-heart mx-2"></i> {{ $t("mywishlist") }}
                    <span v-if="locale === 'fr'" class="selected"></span>
                    <span v-if="locale === 'ar'" class="selected2"></span> </router-link>
            </li>
            <hr class="text-secondary mx-3">

            <li class="list-group-item">
                <a class="nav-link" href="#" @click.prevent="handleLogout"><i class="bi bi-unlock mx-2"></i>
                    {{ $t('logout')
                    }}
                    <span v-if="locale === 'fr'" class="selected"></span>
                    <span v-if="locale === 'ar'" class="selected2"></span>

                </a>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Header from './Header.vue'
import { useAuth } from '../composables/useAuth'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const { logout } = useAuth()
const emit = defineEmits(['navigate'])

const isMobile = ref(false)

const navigate = () => emit('navigate')

const checkScreen = () => {
    isMobile.value = window.innerWidth < 768
}

onMounted(() => {
    checkScreen()
    window.addEventListener('resize', checkScreen)
})
onBeforeUnmount(() => {
    window.removeEventListener('resize', checkScreen)
})

function handleLogout() {
    logout()
    router.push('/login')
}
</script>

<style scoped>
.sidebar {
    position: sticky;
    top: 40px !important;
    left: 0;
    width: 230px !important;
    background: linear-gradient(180deg, #2f2f2f, #1e1e1e);
    color: white;
    min-height: 100vh;
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    z-index: 80;
}

/* Mobile plein écran */
@media (max-width: 768px) {
    .sidebar {
        position: fixed;
        top: 55px;
        left: 0;
        width: 100% !important;
        min-height: 100vh;
        padding-top: 20px;
        background: linear-gradient(180deg, #ffffff, var(--gold));
    }

    .sidebar-header {
        width: 100% !important;

        color: white;
        display: flex;
        align-items: center;
        padding: 0;
        font-weight: bold;
        font-size: 1.2rem;
    }
}

.list-group-item {
    background: transparent;
    border: none;
    padding: 12px 20px;
    transition: all 0.3s ease;
}


.list-group-item:hover {
    background: #65636361;
}
.list-group-item.active {
    background: var(--gold);
}
.nav-link {
    color: white;
    font-size: 0.9rem;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: 0.3s;
}

.nav-link:hover {
    color: #fff !important;
}

@media (max-width: 768px) {

    .list-group-item.active,
    .list-group-item:hover {
        background: var(--gold);
        /* background: #a6686861; */
    }

    .nav-link {
        color: rgb(5, 5, 5);
        font-weight: bold;
    }
}



.list-group-item:hover .selected,
.list-group-item:hover .selected2,
.list-group-item.active .selected,
.list-group-item.active .selected2 {
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    line-height: 1.42857;
    font-family: "Open Sans", sans-serif;
    list-style: none;
    font-weight: 300;
    text-shadow: none;
    font-size: 14px;
    color: #fff;
    box-sizing: border-box;
    display: block;
    position: absolute;
    top: 12px;
    background: 0 0;
    width: 0;
    height: 0;
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;

}

.list-group-item:hover .selected,
.list-group-item.active .selected {
    border-right: 12px solid #fff;
    float: right;
    right: 0;
}

.list-group-item:hover .selected2,
.list-group-item.active .selected2 {
    border-left: 12px solid #fff;
    float: left;
    left: 0;
}

@media (max-width: 768px) {

    .list-group-item:hover .selected,
    .list-group-item:hover .selected2,
    .list-group-item.active .selected,
    .list-group-item.active .selected2 {
        color: #f0e0ab;
    }

    .list-group-item:hover .selected,
    .list-group-item.active .selected {
        border-right: 12px solid #f0e0ab;

    }

    .list-group-item:hover .selected2,
    .list-group-item.active .selected2 {
        border-left: 12px solid #f0e0ab;
    }
}
</style>
