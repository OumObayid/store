import { defineStore } from "pinia";

export const useOrderStore = defineStore("order", {
  // 🧾 STATE
  state: () => ({
    orders: JSON.parse(localStorage.getItem("orders")) || [],
  }),

  // 🧭 ACTIONS
  actions: {
    // 🔄 Remplacer toutes les commandes
    setOrders(orders) {
      this.orders = orders || [];
      this.saveToLocalStorage();
    },

    // ➕ Ajouter une commande
    addOrder(order) {
      this.orders.push(order);
      this.saveToLocalStorage();
    },

    // 📝 Mettre à jour une commande
    updateOrder(orderId, updatedData) {
      const index = this.orders.findIndex(
        (o) => Number(o.id) === Number(orderId)
      );
      if (index !== -1) {
        this.orders[index] = { ...this.orders[index], ...updatedData };
        this.saveToLocalStorage();
      }
    },

    // 🗑 Supprimer une commande
    deleteOrder(order_id) {
      this.orders = this.orders.filter(
        (o) => Number(o.order_id) !== Number(order_id)
      );
      this.saveToLocalStorage();
    },
    // 🧹 Vider toutes les commandes
    clearOrders() {
      this.orders = [];
      localStorage.removeItem("orders");
    },
    archiveOrderInStore(order_id) {
      const index = this.orders.findIndex(
        (o) => Number(o.order_id) === Number(order_id)
      ); 
      if (index !== -1) {
        // Mettre à jour localement
        this.orders[index] = {
          ...this.orders[index],
          archived: 1,
        };
        // Mettre aussi à jour le localStorage si tu l'utilises
        localStorage.setItem("orders", JSON.stringify(this.orders));
      }
    },

    // 📥 Charger depuis localStorage (utile si tu veux rafraîchir)
    loadFromLocalStorage() {
      const saved = JSON.parse(localStorage.getItem("orders")) || [];
      this.orders = saved;
    },

    // 💾 Sauvegarder dans localStorage
    saveToLocalStorage() {
      localStorage.setItem("orders", JSON.stringify(this.orders));
    },
  },
  getters: {
    // Somme des commandes payées
    totalRevenue: (state) =>
      state.orders
        .filter((order) => order.status === "completed")
        .reduce((sum, order) => sum + Number(order.total), 0),

    // Nombre total de commandes
    totalOrders: (state) => state.orders.length,
  },
});
