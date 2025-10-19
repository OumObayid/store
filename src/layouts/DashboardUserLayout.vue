<template>
  <div class="dashboard-layout">

    <div class="dashboard-container mx-0 px-0">
      <!-- DashboardUserSidebar -->
      <transition name="slide" class="col-md-3">
        <DashboardUserSidebar v-if="!isMobileFullScreen && (isMobile || !isMobileFullScreen)"
          @navigate="handleNavigate" />
      </transition>

      <!-- Main content -->
      <transition name="fade">
        <main class="main" v-if="!showSidebarMobile" :class="{ 'fullscreen-mobile': isMobileFullScreen }">
          <!-- Bouton retour visible uniquement sur mobile -->
          <button v-if="isMobileFullScreen" class="back-btn" @click="backToSidebar">
            <i :class="locale === 'fr' ? 'bi bi-arrow-left' : 'bi bi-arrow-right'"></i> {{ $t('back') }}
          </button>
          <!-- HEADER (Titre de la page + actions) -->
          
          <header  class=" d-flex flex-column ">
            <div class="dashboard-header pb-3">
              <i style="color:var(--gold)" class="dashboard-icon" :class="route.meta.icon"></i>
              <div>
                <div class="h3 dashboard-title">{{ pageTitle }}</div>
                <p class="d-none d-md-block">{{ pageSubtitle }}</p>
              </div>
            </div>
            <hr class="mt-0 pt-0"/>
          </header>
          <div class=" w-100 px-0 mx-0 px-md-3 d-flex justify-content-center">
          <router-view /></div>
        </main>
      </transition>
    </div>

    <!-- Footer (desktop uniquement) -->
    <Footer v-if="!isMobile && !isMobileFullScreen" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import Footer from '../components/Footer.vue'
import DashboardUserSidebar from '../components/DashboardUserSidebar.vue'
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
// Récupérer la route active
const route = useRoute();
const pageTitle = computed(() => t(route.meta.titleKey) || "");
const pageSubtitle = computed(() => t(route.meta.subtitleKey) || "");
const { locale } = useI18n()
const isMobile = ref(false)
const isMobileFullScreen = ref(false)
const showSidebarMobile = ref(false)

const checkScreen = () => {
  isMobile.value = window.innerWidth < 768
  showSidebarMobile.value = isMobile.value
  isMobileFullScreen.value = false
}

const handleNavigate = () => {
  if (isMobile.value) {
    isMobileFullScreen.value = true
    showSidebarMobile.value = false
  }
}

const backToSidebar = () => {
  if (isMobile.value) {
    isMobileFullScreen.value = false
    showSidebarMobile.value = true
  }
}

onMounted(() => {
  checkScreen()
  window.addEventListener('resize', checkScreen)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreen)
})
</script>

<style scoped>
/* Header */
.dashboard-header {
  padding: 2rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.dashboard-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #524e4e;
  display: flex;
  align-items: center;
}

.dashboard-icon {
  font-size: 1.9rem;
  color: rgb(81, 79, 79);
  margin-right: 0.5rem;
}

@media (max-width: 767px) {
  .dashboard-header {
    display: flex;
    justify-content: center;
    padding: 1rem 1rem 0.3rem;
  }

  .dashboard-title {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: #524e4e;
    display: flex;
    align-items: center;
  }

  .dashboard-icon {
    font-size: 1.3rem;
    color: rgb(81, 79, 79);
    margin-right: 0.5rem;
  }
}
.main{
   flex: 1;
}
.dashboard-container {
  display: flex;
  width: 100%;
  
  min-height: calc(100vh - 120px);
}

/* Mobile fullscreen content */
.fullscreen-mobile {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: auto;
  background: #fff;
  z-index: 999;
  padding: 1rem;
}

/* Bouton retour mobile */
.back-btn {
  background: transparent;
  font-weight: bold;
  border: none;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  /* margin-bottom: 1rem; */
  color: var(--gold);
}

/* Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(-100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
