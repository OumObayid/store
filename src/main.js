import { computed, createApp, watch } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createI18n } from "vue-i18n";
// Import de la traduction arabe
import ar from "./locales/ar.json";
import fr from "./locales/fr.json";

//  Import Toast

import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

// Créer une instance Pinia
const pinia = createPinia();

// Création d’i18n
export const i18n = createI18n({
  legacy: false, // ⚠ désactive la legacy API
  locale: "fr", // ton site reste en français par défaut
  fallbackLocale: "fr", // si une traduction manque
  messages: {
    fr,
    ar,
  },
});
// ⚡ Options globales Toast
const toastOptions = {
  position: "top-right", // Position: top-right, top-center, bottom-left...
  timeout: 3000, // Durée d'affichage en ms
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  icon: true,
  rtl: false, // Passe à true si tu utilises l'arabe (rtl)
  transition: "Vue-Toastification__fade",
  maxToasts: 5,
  newestOnTop: true,
  toastClassName: "my-toast",
  bodyClassName: "my-toast-body",
};

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(i18n);
app.use(Toast, toastOptions);
//  Watcher sur la langue
// 🧠 Computed qui suit la langue active
const currentLocale = computed(() => i18n.global.locale.value)
watch(currentLocale, (newLocale) => {
  toastOptions.position = newLocale === 'fr' ? 'top-right' : 'top-left'
  toastOptions.rtl = newLocale === 'ar'
})

app.mount('#app')
