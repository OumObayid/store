import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createI18n } from 'vue-i18n'
// Import de la traduction arabe
import ar from './locales/ar.json'
import fr from './locales/fr.json'

//  Import Toast

import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";


// Créer une instance Pinia
const pinia = createPinia()

// Création d’i18n
const i18n = createI18n({
  legacy: false, // ⚠ désactive la legacy API
  locale: 'fr', // ton site reste en français par défaut
 fallbackLocale: 'fr',  // si une traduction manque
  messages: {
    fr,
    ar
  }
})


// Options Toast
const toastOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
}

 
createApp(App)
.use(pinia)
.use(router)
.use(i18n)
.use(Toast, toastOptions)
.mount('#app')
