<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="app-layout">
    <Header />
    <main class="app-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* pleine hauteur */
}

.app-content {
  flex: 1; /* prend tout l’espace disponible entre header et footer */
}
</style>
