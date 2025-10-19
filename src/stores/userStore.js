import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: JSON.parse(localStorage.getItem("users")) || [], // Charger depuis localStorage au démarrage
  }),

  actions: {
    // 🧭 Définir tous les utilisateurs
    setUsers(users) {
      this.users = users;
      localStorage.setItem("users", JSON.stringify(this.users));
    },

    // 🧹 Supprimer un utilisateur
    deleteUser(userId) {
      this.users = this.users.filter((u) => u.id !== userId);
      localStorage.setItem("users", JSON.stringify(this.users));
    },

    // 🔁 Mettre à jour le rôle d'un utilisateur
    updateRoleUser(data) {
      const { id, role } = data;
      const index = this.users.findIndex((u) => u.id === id);

      if (index !== -1) {
        this.users[index] = {
          ...this.users[index],
          role: role,
        };
        localStorage.setItem("users", JSON.stringify(this.users));
      }
    },
  },
});
