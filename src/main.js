import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import 'bootstrap-icons/font/bootstrap-icons.css';
// Créer une instance Pinia
const pinia = createPinia()
 
createApp(App)
.use(pinia)
.use(router)
.mount('#app')
