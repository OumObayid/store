import { defineStore } from "pinia";

export const useCategorieStore = defineStore("categorieStore", {
  state: () => ({
    categories: [],
  }),

  actions: {
    setCategories(categories) {
      this.categories = categories;
    },
    addCategorie(categorie) {
      this.categories.push(categorie);
    },
    updateCategorie(updatedCategorie) {
      const index = this.categories.findIndex((p) => p.id === updatedCategorie.id);
      if (index !== -1) {
        this.categories[index] = { ...this.categories[index], ...updatedCategorie };
      }
    },
    deleteCategorie(categorieId) {
      this.categories = this.categories.filter((p) => p.id !== categorieId);
    },
  },
});
