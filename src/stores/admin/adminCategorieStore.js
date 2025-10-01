import { defineStore } from "pinia";
import { adminCategorieService } from "../../services/admin/adminCategorieService";

export const useAdminCategorieStore = defineStore("adminCategorieStore", {
  state: () => ({
    categories: [],
    selectedCategorie: null,
    loading: false,
    error: null,
  }),

  actions: {
    // Charger toutes les catégories
    async fetchAllCategories() {
      this.loading = true;
      try {
        const res = await adminCategorieService.getAllCategoriesAdmin();
        if (res.data.success) this.categories = res.data.dataCat;
      } catch (err) {
        console.error(err);
        this.error = "Erreur lors du chargement des catégories";
      } finally {
        this.loading = false;
      }
    },

    // Charger une catégorie par ID
    async fetchCategorieById(id) {
      try {
        const res = await adminCategorieService.getCategorieByIdAdmin(id);
        this.selectedCategorie = res.data.dataCategorie;
        return this.selectedCategorie;
      } catch (err) {
        console.error(err);
        this.error = "Erreur lors du chargement de la catégorie";
      }
    },

    // CRUD Admin
    async addCategorie(data) {
      try {
        const res = await adminCategorieService.addCategorie(data);
        if (res.data.success) this.categories.push(res.data.categorie);
      } catch (err) {
        console.error(err);
        this.error = "Impossible d'ajouter la catégorie";
      }
    },

    async updateCategorie(data) {
      try {
        const res = await adminCategorieService.updateCategorie(data);
        if (res.data.success) {
          const index = this.categories.findIndex((c) => c.id === data.id);
          if (index !== -1) this.categories[index] = { ...this.categories[index], ...data };
        }
      } catch (err) {
        console.error(err);
        this.error = "Impossible de mettre à jour la catégorie";
      }
    },

    async deleteCategorie(id) {
      try {
        const res = await adminCategorieService.deleteCategorie(id);
        if (res.data.success) this.categories = this.categories.filter((c) => c.id !== id);
      } catch (err) {
        console.error(err);
        this.error = "Impossible de supprimer la catégorie";
      }
    },
  },

  getters: {
    categoryCount: (state) => state.categories.length,
    categoriesWithProductsCount: (state) => (products) => {
      return state.categories.map(cat => ({
        ...cat,
        totalProducts: products.filter(p => p.categorie_id === cat.id).length
      }));
    },
  },
});
