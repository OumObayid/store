// composables/useAuth.js
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import * as authService from "../services/authService";
import * as emailService from "../services/emailService";
import { useRouter } from "vue-router";
import { useToken } from "./useToken";
import { useEmailTemplate } from "./useEmailTemplate";
import { useResetPwTemplate } from "./useResetPwTemplate";

export function useAuth() {
  const loading = ref(false);
  const message = ref(null);
  const error = ref(null);
  const emailPwToken = ref(null);

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
        const role = response.data.user.role;
        if (role === "admin" || role === "superAdmin") {
          router.push("/admin");
        } else {
          router.push("/dashboard"); // Rediriger vers la page d'accueil ou une autre page appropriée
        }
      } else {
        error.value = response.data.message || "Login failed";
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // ----- --------------REGISTER -----
  //Inscription et envoie de link
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
  //Réception de link
  const verifieEmailConfirmToken = async (data) => {
    loading.value = true; // ✅ Début du chargement
    try {
      const response = await authService.verifieEmailConfirmToken(data);
      if (response.data.success) {
        message.value =
          "Votre adresse e-mail a été confirmée avec succès. Vous pouvez maintenant vous connecter.";
      } else {
        error.value = response.data.message;
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  //----------------FIN REGISTER------------------

  //----------------FORGOUT PASSWORD--------------
  //Envoie de link
  const verifiEmailResetPw = async (data) => {
    loading.value = true;
    try {
      const response = await authService.checkEmail(data);
      if (response.data.success) {
        const { token, generateToken } = useToken();
        generateToken();
        const dataToken = {
          token: token.value,
          email: data.email,
        };
        const response = await authService.registerTokenPw(dataToken);
        if (response.data.success) {
          const resetLink = `${API_URL}/reset-password?token=${token.value}`;
          const { messageEmail, getResetPasswordEmailTemplate } =
            useResetPwTemplate();
          getResetPasswordEmailTemplate(resetLink);
          const dataEmail = {
            to: data.email,
            subject: "Réinitialisation De Votre Mot De Passe",
            message: messageEmail.value,
          };

          const response = await emailService.sendConfirmationEmail(dataEmail);

          if (response.data.success) {
            message.value = `Une demande de réinitialisation de mot de passe a été effectuée.
Un email contenant un lien de réinitialisation vous a été envoyé.
Veuillez cliquer sur ce lien pour définir un nouveau mot de passe.
Si vous ne trouvez pas l’email, vérifiez votre dossier Spam ou Courrier indésirable.`;
          } else {
            error.value = response.data.message;
          }
        } else {
          error.value = response.data.message;
          console.log("error.value :", error.value);
        }
      } else {
        error.value = response.data.message;
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  //Reception du token du lien Vérification
  const verifiePwConfirmToken = async (data) => {
    loading.value = true; // ✅ Début du chargement
    try {
      const response = await authService.verifiePwConfirmToken(data);
      if (response.data.success) {
        emailPwToken.value = response.data.dataEmail; // ✅ Stockage du token dans emailPwToken
      } else {
        if (response.data.cas === 1) {
          //Token manquant.
          console.log("response.data.cas :", response.data.cas);
          error.value = "Token manquant. Veuillez vous authentifier.";
        } else if (response.data.cas === 2) {
          //Token invalide.
          error.value = "Token invalide. Veuillez vérifier le lien.";
        } else if (response.data.cas === 3) {
          //Token expiré.
          error.value =
            "Token expiré. Veuillez demander un nouveau lien de vérification.";
        } else {
          //Autre erreur.
          error.value = response.data.message || "Une erreur s'est produite.";
        }
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  //Mise a jour du mot de passe
  const resetPassword = async (data) => {
    loading.value = true;
    try {
      const response = await authService.resetPassword(data);
      if (response.data.success) {
        message.value =
          "Mot de passe modifié avec succès. Vous pouvez maintenant vous reconnecter.";
      } else {
        error.value = response.data.message;
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Modifier le mot de passe
  const updatePasswordUser = async (data) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await authService.updatePassword(data);
      if (!response.data.success) error.value = response.data.message;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  //----------------FIN FORGOUT PASSWORD-----------

  // ----- LOGOUT (STORE SEULEMENT) -----
  const logout = () => {
    authStore.removeActiveUser();
    authStore.clearUserInfos();
    router.push("/login");
  };

  //Mettre à jour les informations d'un utilisateur
  const updateUserInfos = async (data) => {
    loading.value = true;
    error.value = null;
    message.value = null;

    try {
      const response = await authService.updateUser(data);
      console.log("response :", response);
      if (response.data.success) {
        authStore.setUserInfos(response.data.user);
        message.value = response.data.message;
      } else {
        error.value = response.data.message;
      }
    } catch (err) {
      error.value =
        err.message || "Erreur réseau lors de la mise à jour de l'utilisateur.";
    } finally {
      loading.value = false;
    }
  };
  // -------------------Modifier l'adresse utilisateur-------------------
  const updateAddressUser = async (data) => {
    console.log("data :", data);
    loading.value = true;
    error.value = null;
    message.value = null;
    try {
      const response = await authService.updateUserAddress(data);
      if (response.data.success) {
        // Mettre à jour l'utilisateur dans le store
        authStore.updateUserAddressInStore(data);
        message.value =
          response.data.message || "Adresse mise à jour avec succès.";
      } else {
        error.value =
          response.data.message ||
          "Erreur lors de la mise à jour de l'adresse.";
      }
    } catch (err) {
      error.value =
        err.message || "Erreur réseau lors de la mise à jour de l'adresse.";
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    message,
    error,
    emailPwToken,
    login,
    register, //lors du l'envoie de l'email de confirmation (register)
    verifieEmailConfirmToken, // lors de réception du link (register)
    updatePasswordUser, //modifie le mot de passe de user ou admin
    verifiEmailResetPw, //lors du l'envoie de l'email de confirmation (ForgoutPassword)
    verifiePwConfirmToken, //Vérifie token reçu du link (ForgoutPassword)
    resetPassword, ////Mise à jour du mot de passe (ForgoutPassword)
    updateUserInfos, //Mettre à jour les informations d'un utilisateur
    logout,
    updateAddressUser,
  };
}
