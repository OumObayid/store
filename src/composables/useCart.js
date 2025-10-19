import { ref } from "vue";
import * as cartService from "../services/cartService";
import { useCartStore } from "../stores/cartStore";
import { useAuthStore } from "../stores/authStore";

export const useCart = () => {
  const authStore = useAuthStore();
  const cartStore = useCartStore();
  const loading = ref(false);
  const error = ref(null);
  const message = ref("");

  //  Ajouter un produit vers API  si user est connecté; si non vers store
  const addToCartUse = async (data) => {
    //   data recupéré du soit du composant product soit du login est :
    //   {product,quantity}
    // non connecté rendre ce data comme un item {...data.product,quantity:data.quantity} et l'envoyer au store
    // connecté, recupérer userId et envoyer a l'api cette data :
    // {
    //       productId: data.product.id,
    //       userId: authStore.userInfos.id,
    //       quantity: data.quantity,
    //     }
    //  puis envoyer  le retour de l'api  au store

    loading.value = true;
    error.value = null;
    message.value = "";

    try {
      if (authStore.isLoggedIn) {
        //si user est connecté
        const data_api = {
          productId: data.product.id,
          userId: authStore.userInfos.id,
          quantity: Number(data.quantity),
        };
        const response = await cartService.addCart(data_api);
        if (response.data.success && response.data.item) {
          const resp = await cartService.getCartByUser({
            userId: authStore.userInfos.id,
          });
          if (resp.data.success) {
            // 🧩 Mettre à jour le store connecté
            cartStore.setCart(resp.data.items);
          } else
            error.value = response.data.message || "Erreur lors de l’ajout.";
        } else {
          error.value = response.data.message || "Erreur lors de l’ajout.";
        }
      } else {
        //si user est non connecté
        // 🧩 Mettre à jour le store local temporaire
        const product = data.product;
        const item_temporaire = { ...product, quantity: data.quantity };
        cartStore.addToCartTemp(item_temporaire);
      }
    } catch (err) {
      console.error("Erreur useCart.addCart:", err);
      error.value = err.message || "Erreur de connexion au serveur.";
    } finally {
      loading.value = false;
    }
  };

  //  Charger le panier de l’utilisateur depuis API
  const fetchCartByUser = async (userId) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await cartService.getCartByUser(userId);
      if (response.data.success && Array.isArray(response.data.items)) {
        cartStore.setCart(response.data.items);
      } else {
        cartStore.setCart([]);
      }
    } catch (err) {
      console.error("Erreur useCart.fetchCartByUser:", err);
      error.value = "Impossible de charger le panier.";
    } finally {
      loading.value = false;
    }
  };

  //  incremanter la quantité d'un produit du panier (API + store)
  const incrementItemQuantity = async (id, quantity) => {
    loading.value = true;
    error.value = null;
    message.value = "";

    try {
      if (authStore.isLoggedIn) {
        //si user est connecté
        const data = { itemId: id, quantity: Number(quantity) + 1 };
        const response = await cartService.updateCart(data);
        if (response.data.success) {
          cartStore.increaseQuantity(id);
          message.value = "quantité du produit incrémenté  avec success";
        } else error.value = response.data.message;
      } else {
        cartStore.increaseQuantityTemp(id);
      }
    } catch (err) {
      console.error("Erreur suppression article:", err);
    }
  };
  //  decrementer la quantité d'un produit du panier (API + store)
  const decrementItemQuantity = async (id, quantity) => {
    loading.value = true;
    error.value = null;
    message.value = "";

    try {
      if (authStore.isLoggedIn) {
        //si user est connecté
        const data = { itemId: id, quantity: Number(quantity) - 1 };
        const response = await cartService.updateCart(data);
        if (response.data.success) {
          cartStore.decreaseQuantity(id);
          message.value = "quantité du produit incrémenté  avec success";
        } else error.value = response.data.message;
      } else {
        cartStore.decreaseQuantityTemp(id);
      }
    } catch (err) {
      console.error("Erreur suppression article:", err);
    }
  };
  //  Supprimer un produit du panier (API + store)
  const removeCartItem = async (itemId) => {
    try {
      if (authStore.isLoggedIn) {
        const response = await cartService.deleteCart({ itemId });
        if (response.data.success) {
          cartStore.removeFromCart(itemId);
        } else error.value = response.data.message;
      } else cartStore.removeFromCartTemp(itemId);
    } catch (err) {
      console.error("Erreur suppression article:", err);
    }
  };
  //  Vider le panier local (non connecté)
  const clearCartTemp = async () => {
    try {
      cartStore.clearCartTemp();
    } catch (err) {
      console.error("Erreur clearCart:", err);
    }
  };

  //  Vider le panier (API + store) apres validation de la commande
  const clearCart = async (userId) => {
    try {
      const response = await cartService.clearCart({ userId });
      cartStore.clearCart();
    } catch (err) {
      console.error("Erreur clearCart:", err);
    }
  };

  return {
    loading,
    error,
    message,
    addToCartUse,
    fetchCartByUser,
    incrementItemQuantity,
    decrementItemQuantity,
    removeCartItem,
    clearCartTemp,
    clearCart,
  };
};
