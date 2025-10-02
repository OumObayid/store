// composables/useAdminAuth.js
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAdminAuthStore } from "../../stores/admin/adminAuthStore";
import * as adminAuthService from "../../services/admin/auth/adminAuthService";

export function useAdminAuth() {
  const loading = ref(false);
  const error = ref(null);
  const router = useRouter();
  const adminStore = useAdminAuthStore();

  // ----- LOGIN -----
  const login = async (data) => {
    loading.value = true;
    error.value = null;

    const success = await adminStore.login(data.email, data.password);
    if (success) {
      router.push("/admin"); // redirection dashboard
    } else {
      error.value = adminStore.error || "Erreur de connexion.";
    }

    loading.value = false;
  };

  // ----- LOGOUT -----
  const logout = () => {
    adminStore.logout();
    router.push("/admin/login");
  };

  // ----- GET LIST -----
  const fetchAdmins = async () => {
    try {
      const response = await adminAuthService.getAdmins();
      return response.data.admins || [];
    } catch (err) {
      error.value = err.message;
      return [];
    }
  };

  return {
    loading,
    error,
    login,
    logout,
    fetchAdmins,
  };
}
