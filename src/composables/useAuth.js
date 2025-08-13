// composables/useAuth.js
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import * as authService from "../services/authService";
import * as emailService from "../services/emailService";
import { useRouter } from "vue-router";
import { useToken } from "./useToken";
import { useEmailTemplate } from "./useEmailTemplate";

export function useAuth() {
  const loading = ref(false);
  const message = ref("");
  const error = ref(null);

  const router = useRouter();
  const authStore = useAuthStore();

  const API_URL = import.meta.env.VITE_SITE_URL;

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

  // ----- REGISTER -----
  const register = async (data) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await authService.register(data);
      if (response.data.success) {
        const { token, generateToken } = useToken();
        generateToken();
        const tokenData = {
          token: token.value,
          email: data.email,
        };
        const response = await authService.registerTokenEmail(tokenData);
        if (response.data.success) {
          const to = data.email;
          const subject = "Confirmation de Votre Email";
          const registerLink = `${API_URL}/verify-email?token=${token.value}`;
          const { messageEmail, getConfirmationEmailTemplate } =
            useEmailTemplate();
          getConfirmationEmailTemplate(registerLink);
          const emailData = {
            to: to,
            subject: subject,
            message: messageEmail.value,
          };
          const response = await emailService.sendConfirmationEmail(emailData);
          if (response.data.success) {
            message.value = `Merci pour votre inscription !
             Un email de confirmation vous a été envoyé.
             Veuillez cliquer sur le lien de vérification présent dans cet email pour activer votre compte.
             Si vous ne trouvez pas l’email, pensez à vérifier votre dossier Spam ou Courrier indésirable.`;
          } else {
            error.value = response.data.message;
          }
        } else error.value = response.data.message;
      } else error.value = response.data.message;
    } catch (error) {
      error.value = error.message;
    } finally {
      loading.value = false;
    }
  };

  const verifieEmailConfirmToken = async (data) => {
     loading.value = true; // ✅ Début du chargement
    try {
      const response = await authService.verifieEmailConfirmToken(data);
      console.log('data comps :', data);
      if (response.data.success) {
        message.value="Votre adresse e-mail a été confirmée avec succès. Vous pouvez maintenant vous connecter."
      } else {
        error.value = response.data.message;
      }
    } catch (err) {
      error.value = err.message;
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
    message,
    error,
    login,
    register,
    // registerTokenEmail,
    verifieEmailConfirmToken,
    // checkEmail,
    // registerTokenPw,
    // resetPassword,
    logout,
  };
}
