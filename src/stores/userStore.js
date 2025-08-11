import { defineStore } from "pinia";

export const useCartStore = defineStore("userStore", {
  state: () => ({
   users:[],
  }),

  actions: {
    setUsers(users) {
      this.users = users;
    },  
    addUser(user) {
      this.users.push(user);
    },
    updateUser(updatedUser) {
      const index = this.users.findIndex(p => p.id === updatedUser.id);
      if (index !== -1) {
        this.users[index] = { ...this.users[index], ...updatedUser };
      }
    },
    deleteUser(userId) {
      this.users = this.users.filter(u => u.id !== userId);
    },
    
  },
});