import { defineStore } from "pinia";

// --- Fonctions utilitaires --- //
const loadCartFromLocalStorage = (key) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

export const useCartStore = defineStore("cartStore", {
  // =========================================================
  // 🟦 STATE
  // =========================================================
  state: () => ({
    items: loadCartFromLocalStorage("cartItems"), // panier connecté
    items_temp: loadCartFromLocalStorage("cartItemsTemp"), // panier temporaire (non connecté)
    address: null, // adresse de livraison
  }),

  // =========================================================
  // 🟩 GETTERS
  // =========================================================
  getters: {
    // --- Panier connecté ---
    cartCount: (state) =>
      state.items.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0),

    cartTotal: (state) =>
      state.items.reduce(
        (acc, item) =>
          acc + Number(item.prix || 0) * Number(item.quantity || 0),
        0
      ),

    getItemTotal: () => (item) =>
      (Number(item.prix || 0) * Number(item.quantity || 0)).toFixed(2),

    // --- Panier temporaire ---
    cartCountTemp: (state) =>
      state.items_temp.reduce(
        (acc, item) => acc + (Number(item.quantity) || 0),
        0
      ),

    // total du panier temporaire
    // total du panier temporaire
    cartTotalTemp: (state) =>
      state.items_temp.reduce(
        (acc, item) =>
          acc +
          (item?.prix ? Number(item.prix) : 0) *
            (item?.quantity ? Number(item.quantity) : 0),
        0
      ),

    // total pour un article temporaire
    getItemTotalTemp: () => (item) =>
      (Number(item.prix || 0) * Number(item.quantity || 0)).toFixed(2),
  },

  // =========================================================
  // 🟨 ACTIONS
  // =========================================================
  actions: {
    // --- Panier connecté --- //
    addToCart(item) {
      const existing = this.items.find((i) => i.product_id === item.product_id);
      if (existing) {
        existing.quantity += Number(item.quantity) || 1;
      } else {
        this.items.push({
          ...item,
          quantity: Number(item.quantity) || 1,
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(this.items));
    },

    removeFromCart(itemId) {
      this.items = this.items.filter((i) => i.id !== itemId);
      localStorage.setItem("cartItems", JSON.stringify(this.items));
    },

    clearCart() {
      this.items = [];
      localStorage.setItem("cartItems", JSON.stringify(this.items));
    },

    increaseQuantity(id) {
      const item = this.items.find((i) => i.id === id);
      if (item) item.quantity++;
      localStorage.setItem("cartItems", JSON.stringify(this.items));
    },

    decreaseQuantity(id) {
      const item = this.items.find((i) => i.id === id);
      if (item && item.quantity > 1) item.quantity--;
      localStorage.setItem("cartItems", JSON.stringify(this.items));
    },

    setCart(cartItems) {
      this.items = Array.isArray(cartItems) ? cartItems : [];
      localStorage.setItem("cartItems", JSON.stringify(this.items));
    },

    setAddress(addr) {
      this.address = addr;
    },

    // --- Panier temporaire --- //
    addToCartTemp(data) {
      const existing = this.items_temp.find((i) => i.id === data.id);
      if (existing) {
        existing.quantity += data.quantity || 1;
      } else {
        this.items_temp.push(data);
      }
      localStorage.setItem("cartItemsTemp", JSON.stringify(this.items_temp));
    },

    increaseQuantityTemp(id) {
      const item = this.items_temp.find((i) => String(i.id) === String(id));
      if (item) item.quantity++;
      localStorage.setItem("cartItemsTemp", JSON.stringify(this.items_temp));
    },

    decreaseQuantityTemp(id) {
      const item = this.items_temp.find((i) => String(i.id) === String(id));
      if (item && item.quantity > 1) item.quantity--;
      localStorage.setItem("cartItemsTemp", JSON.stringify(this.items_temp));
    },

    removeFromCartTemp(itemId) {
      this.items_temp = this.items_temp.filter((i) => i.id !== itemId);
      localStorage.setItem("cartItemsTemp", JSON.stringify(this.items_temp));
    },

    clearCartTemp() {
      this.items_temp = [];
      localStorage.setItem("cartItemsTemp", JSON.stringify(this.items_temp));
    },
  },
});
