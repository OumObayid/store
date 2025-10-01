import { defineStore } from "pinia";

export const useCartStore = defineStore("cartStore", {
  state: () => ({
    carts: JSON.parse(localStorage.getItem("cart")) || [],
  }),

  getters: {
    // Nombre total d'articles
    cartCount: (state) =>
      state.carts.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0),

    // Sous-total
    cartTotal: (state) =>
      state.carts.reduce(
        (acc, item) => acc + Number(item.prix || 0) * Number(item.quantity || 0),
        0
      ),

    // Frais de livraison
    deliveryFee: (state) =>
      state.cartTotal >= 500 ? 0 : state.cartTotal > 0 ? 50 : 0,

    // Total final
    finalTotal: (state) =>
      state.cartTotal >= 500 ? state.cartTotal : state.cartTotal + 50,

    // Vérifie si le produit est déjà dans le panier
    isInCart: (state) => (productId) =>
      state.carts.some((item) => item.id === productId),
  },

  actions: {
    // Sauvegarde dans localStorage
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.carts));
    },

    // Ajouter un produit au panier
   addToCart(product, selectedSize = null, selectedColor = null, quantity = 1) {
  const existing = this.carts.find(
    (i) => i.id === product.id && i.taille === selectedSize && i.couleur === selectedColor
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    this.carts.push({
      ...product,
      quantity,
      prix: Number(product.prix) || 0,
      taille: selectedSize,
      couleur: selectedColor,
    });
  }
  this.saveCart();
},


    // Supprimer un produit
    removeFromCart(productId) {
      this.carts = this.carts.filter((i) => i.id !== productId);
      this.saveCart();
    },

    // Vider le panier
    clearCart() {
      this.carts = [];
      this.saveCart();
    },

    // Augmenter la quantité
    increaseQuantity(productId) {
      const item = this.carts.find((i) => i.id === productId);
      if (item) item.quantity += 1;
      this.saveCart();
    },

    // Diminuer la quantité
    decreaseQuantity(productId) {
      const item = this.carts.find((i) => i.id === productId);
      if (item && item.quantity > 1) item.quantity -= 1;
      this.saveCart();
    },

    // Définir une quantité spécifique
    setQuantity(productId, quantity) {
      const item = this.carts.find((i) => i.id === productId);
      if (item) {
        const q = parseInt(quantity);
        item.quantity = q > 0 ? q : 1;
        this.saveCart();
      }
    },
  },
});
