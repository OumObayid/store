// stores/authStore.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
    userInfos: localStorage.getItem("userInfos")
      ? JSON.parse(localStorage.getItem("userInfos"))
      : null,
  }),
  actions: {
    setActiveUser() {
      this.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", "true");
    },
    removeActiveUser() {
      this.isLoggedIn = false;
      localStorage.removeItem("isLoggedIn");
    },

    // --------------------------------Gestion des informations utilisateur
    setUserInfos(user) {
      this.userInfos = user;
      localStorage.setItem("userInfos", JSON.stringify(user));
    },
    updateUserAddressInStore(data) {
      // mieux vaut un nom clair
      if (data.address !== undefined) {
        this.userInfos = { ...this.userInfos, address: data.address };
        localStorage.setItem("userInfos", JSON.stringify(this.userInfos));
      }
    },
    clearUserInfos() {
      this.userInfos = null;
      localStorage.removeItem("userInfos");
    },
  },
});
// This store manages the authentication state of the user
// It uses Pinia for state management and persists the login state in localStorage
