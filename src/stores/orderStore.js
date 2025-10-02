import { defineStore } from "pinia";
import { getAllOrders, getRecentSales } from "../services/orderService";

export const useOrderStore = defineStore("orderStore", {
  state: () => ({
    orders: [],
    recentSales: [],
  }),

  actions: {
    async fetchOrders() {
      const res = await getAllOrders();
      if (res.data.success && Array.isArray(res.data.orders)) {
        this.orders = res.data.orders.map(order => ({
          ...order,
          total: Number(order.total), // conversion sécurisée
        }));
      } else {
        this.orders = []; // si pas de données
      }
    },
    async fetchRecentSales() {
      const res = await getRecentSales();
      this.recentSales = (res.data.success && Array.isArray(res.data.recentSales)) 
        ? res.data.recentSales 
        : [];
    },
  },

  getters: {
    // Somme des commandes payées
    totalRevenue: (state) =>
      state.orders
        .filter(order => order.status === "Payée")
        .reduce((sum, order) => sum + order.total, 0),

    // Nombre total de commandes
    totalOrders: (state) => state.orders.length,
  },
});
