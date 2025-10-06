import { ref } from "vue";
import * as cartService from "../services/cartService";

export function useCart() {
  const loading = ref(false);
  const message = ref(null);
  const error = ref(null);
  const cart = ref(null);

  // 🛒 Ajouter un article au panier
  const addCart = async (data) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await cartService.addCart(data);
      if (response.data.success) {
        cart.value = response.data.cart || null;
        message.value = "Article ajouté au panier avec succès.";
      } else {
        error.value = response.data.message || "Erreur lors de l'ajout au panier.";
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // 🧹 Vider le panier
  const clearCart = async (data) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await cartService.clearCart(data);
      if (response.data.success) {
        cart.value = null;
        message.value = "Panier vidé avec succès.";
      } else {
        error.value = response.data.message || "Impossible de vider le panier.";
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // ❌ Supprimer un article du panier
  const deleteCart = async (data) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await cartService.deleteCart(data);
      if (response.data.success) {
        message.value = "Article supprimé du panier.";
      } else {
        error.value = response.data.message || "Erreur lors de la suppression.";
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // 🔍 Récupérer le panier par ID utilisateur
  const getCartById = async (data) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await cartService.getCartById(data);
      if (response.data.success) {
        cart.value = response.data.cart || [];
      } else {
        error.value = response.data.message || "Panier introuvable.";
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // 🔄 Mettre à jour un panier (quantité, produit, etc.)
  const updateCart = async (data) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await cartService.updateCart(data);
      if (response.data.success) {
        message.value = "Panier mis à jour avec succès.";
      } else {
        error.value = response.data.message || "Erreur de mise à jour du panier.";
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // 🏠 Mettre à jour l’adresse de livraison
  const updateCartAddress = async (data) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await cartService.updateCartAddress(data);
      if (response.data.success) {
        message.value = "Adresse de livraison mise à jour.";
      } else {
        error.value = response.data.message || "Erreur lors de la mise à jour de l'adresse.";
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // 💳 Mettre à jour les détails du paiement
  const updatePaymentCartDetails = async (data) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await cartService.updatePaymentCartDetails(data);
      if (response.data.success) {
        message.value = "Détails de paiement mis à jour avec succès.";
      } else {
        error.value = response.data.message || "Erreur lors de la mise à jour du paiement.";
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    // états réactifs
    loading,
    message,
    error,
    cart,

    // fonctions
    addCart,
    clearCart,
    deleteCart,
    getCartById,
    updateCart,
    updateCartAddress,
    updatePaymentCartDetails,
  };
}
