// composables/useAuth.js
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import * as authService from "../services/authService";
import { useRouter } from "vue-router";

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

  //   // ----- REGISTER -----
  //   const register = async (data) => {
  //     loading.value = true;
  //     error.value = null;
  //     success.value = false;

  //     try {
  //       const response = await authService.register(data);
  //         if (response.data.success) {

  //         } else {
  //             error.value = response.data.message || "Registration failed";
  //         }
  //     } catch (err) {
  //       error.value = err.response?.data?.message || err.message;
  //     } finally {
  //       loading.value = false;
  //     }
  //   };

  //   // ----- REGISTER TOKEN EMAIL -----
  //   const registerTokenEmail = async (data) => {
  //     loading.value = true;
  //     error.value = null;
  //     success.value = false;

  //     try {
  //       await authService.registerTokenEmail(data);
  //       success.value = true;
  //     } catch (err) {
  //       error.value = err.response?.data?.message || err.message;
  //     } finally {
  //       loading.value = false;
  //     }
  //   };

  //   // ----- VERIFY EMAIL TOKEN -----
  //   const verifieEmailConfirmToken = async (data) => {
  //     loading.value = true;
  //     error.value = null;
  //     success.value = false;

  //     try {
  //       await authService.verifieEmailConfirmToken(data);
  //       success.value = true;
  //     } catch (err) {
  //       error.value = err.response?.data?.message || err.message;
  //     } finally {
  //       loading.value = false;
  //     }
  //   };

  //   // ----- CHECK EMAIL -----
  //   const checkEmail = async (data) => {
  //     loading.value = true;
  //     error.value = null;
  //     success.value = false;

  //     try {
  //       await authService.checkEmail(data);
  //       success.value = true;
  //     } catch (err) {
  //       error.value = err.response?.data?.message || err.message;
  //     } finally {
  //       loading.value = false;
  //     }
  //   };

  //   // ----- REGISTER TOKEN PASSWORD -----
  //   const registerTokenPw = async (data) => {
  //     loading.value = true;
  //     error.value = null;
  //     success.value = false;

  //     try {
  //       await authService.registerTokenPw(data);
  //       success.value = true;
  //     } catch (err) {
  //       error.value = err.response?.data?.message || err.message;
  //     } finally {
  //       loading.value = false;
  //     }
  //   };

  //   // ----- RESET PASSWORD -----
  //   const resetPassword = async (data) => {
  //     loading.value = true;
  //     error.value = null;
  //     success.value = false;

  //     try {
  //       await authService.resetPassword(data);
  //       success.value = true;
  //     } catch (err) {
  //       error.value = err.response?.data?.message || err.message;
  //     } finally {
  //       loading.value = false;
  //     }
  //   };

  // ----- LOGOUT (STORE SEULEMENT) -----
  const logout = () => {
    authStore.removeActiveUser();
    authStore.clearUserInfos() 
    router.push("/login");
  };

  return {
    loading,
    error,
    login,
    // register,
    // registerTokenEmail,
    // verifieEmailConfirmToken,
    // checkEmail,
    // registerTokenPw,
    // resetPassword,
    logout,
  };
}
