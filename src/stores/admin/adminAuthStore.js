import { defineStore } from "pinia";
import * as adminAuthService from "../../services/admin/auth/adminAuthService";

export const useAdminAuthStore = defineStore("adminAuthStore", {
  state: () => ({
    isLoggedIn: localStorage.getItem("adminLoggedIn") === "true",
    adminInfos: localStorage.getItem("adminInfos")
      ? JSON.parse(localStorage.getItem("adminInfos"))
      : null,
    error: null,
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await adminAuthService.adminLogin({ email, password });
        if (response.data.success) {
          this.isLoggedIn = true;
          this.adminInfos = response.data.admin;
          localStorage.setItem("adminLoggedIn", "true");
          localStorage.setItem("adminInfos", JSON.stringify(response.data.admin));
          return true;
        } else {
          this.error = response.data.message;
          return false;
        }
      } catch (err) {
        this.error = err.message;
        return false;
      }
    },
    logout() {
      this.isLoggedIn = false;
      this.adminInfos = null;
      localStorage.removeItem("adminLoggedIn");
      localStorage.removeItem("adminInfos");
    },
    setAdminInfos(admin) {
      this.adminInfos = admin;
      localStorage.setItem("adminInfos", JSON.stringify(admin));
    },
  },
});
