import { defineStore } from "pinia";

export const useCategorieStore = defineStore("categorieStore", {
  state: () => ({
    categories: JSON.parse(localStorage.getItem("categories")) || [],
  }),

  actions: {
    setCategories(categories) {
      this.categories = categories;
      localStorage.setItem("categories", JSON.stringify(this.categories));
    },

    addCategorie(categorie) {
      this.categories.push(categorie);
      localStorage.setItem("categories", JSON.stringify(this.categories));
    },

    updateCategorie(updatedCategorie) {
      const index = this.categories.findIndex((p) => p.id === updatedCategorie.id);
      if (index !== -1) {
        this.categories[index] = { ...this.categories[index], ...updatedCategorie };
        localStorage.setItem("categories", JSON.stringify(this.categories));
      }
    },

    deleteCategorie(id) {
      this.categories = this.categories.filter((p) => p.id !== id);
      localStorage.setItem("categories", JSON.stringify(this.categories));
      
    },

    
  },


});
