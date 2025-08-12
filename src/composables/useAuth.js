// composables/useAuth.js
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import * as authService from "../services/authService";
import { useRouter } from "vue-router";
import { useToken } from "./useToken";

export function useAuth() {
  const loading = ref(false);
  const error = ref(null);

  const router = useRouter();
  const authStore = useAuthStore();

  // ----- LOGIN -----
  const login = async (data) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await authService.login(data);
      if (response.data.success) {
        authStore.setActiveUser();
        authStore.setUserInfos(response.data.user);
        router.push("/dashboard");
      } else {
        error.value = response.data.message || "Login failed";
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const register = async (data) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await authService.register(data);
      if (response.data.success) {
        const { token, generateToken } = useToken();
        generateToken();
        const tokenData = {
          token: token,
          email: data.email,
        };
        const response = await authService.registerTokenEmail(tokenData);
        if(response.data.success){
          
        }
        else error.value=response.data.message

      }
      else error.value=response.data.message

    } catch (error) {
      error.value=error.message
    } finally {
      loading.value = false;
    }
  };

  // ----- LOGOUT (STORE SEULEMENT) -----
  const logout = () => {
    authStore.removeActiveUser();
    authStore.clearUserInfos();
    router.push("/login");
  };

  return {
    loading,
    error,
    login,
    register,
    // registerTokenEmail,
    // verifieEmailConfirmToken,
    // checkEmail,
    // registerTokenPw,
    // resetPassword,
    logout,
  };
}
