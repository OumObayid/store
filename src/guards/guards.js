// src/router/guards.js
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/authStore";

// Guard pour les pages admin
export function AdminGuard(to, from, next) {
  const authStore = useAuthStore();
  const {isLoggedIn,userInfos} = storeToRefs(authStore);
  const role = userInfos?.value?.role;

  if (!isLoggedIn) {
  console.log('isLoggedIn :', isLoggedIn);
    next("/login"); // Non connecté → page login
  } else if (role !== "admin" && role !== "superAdmin") {
    next("/"); // Rôle non autorisé → redirige
  } else {
    next(); // Autorisé
  }
}

// Guard pour les pages user connectées
export function UserGuard(to, from, next) {
   const authStore = useAuthStore();
  const {isLoggedIn,userInfos} = storeToRefs(authStore);
  const role = userInfos?.value.role;


  if (!isLoggedIn) {
  console.log('isLoggedIn :', isLoggedIn);
    next("/login");
  } else if (role !== "user") {
    next("/"); // Rôle non autorisé
  } else {
    next();
  }
}
