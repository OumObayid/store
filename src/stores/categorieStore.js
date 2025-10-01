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

   getters: {
  categoryCount: (state) => state.categories.length,

  // Prends products comme argument
  categoriesWithProductsCount: (state) => (products) => {
    return state.categories.map(cat => ({
      ...cat,
      totalProducts: products.filter(p => p.categorie_id === cat.id).length
    }));
  },
},


});
