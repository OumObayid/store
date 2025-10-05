import { defineStore } from "pinia";
import { adminProductService } from "../../services/admin/adminProductService";

export const useAdminProductStore = defineStore("adminProductStore", {
  state: () => ({
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchAllProducts() {
      this.loading = true;
      try {
        const res = await adminProductService.getAllProductsAdmin();
        this.products = res.data.products || [];
      } catch (err) {
        console.error(err);
        this.error = "Erreur lors du chargement des produits";
      } finally {
        this.loading = false;
      }
    },

      async fetchProductById(id) {
      this.loading = true;
      try {
        const res = await adminProductService.getProductByIdAdmin(id);
        if (res.data.success && res.data.product) {
          this.selectedProduct = res.data.product;
          return this.selectedProduct;
        } else {
          this.error = res.data.message || "Produit introuvable";
          return null;
        }
      } catch (err) {
        console.error(err);
        this.error = "Erreur lors du chargement du produit";
        return null;
      } finally {
        this.loading = false;
      }
    },

  async updateProduct(formData) {
      try {
        const res = await adminProductService.updateProduct(formData);
        return res.data;
      } catch (err) {
        console.error(err);
        this.error = "Impossible de mettre à jour le produit";
        return { success: false };
      }
    },

    async deleteGalleryImage(imageId) {
  try {
    const res = await adminProductService.deleteGalleryImage(imageId);
    return res.data;
  } catch (err) {
    console.error("Erreur suppression image :", err);
    return { success: false };
  }
},


    // async deleteProduct(id) {
    //   try {
    //     const res = await adminProductService.deleteProduct(id);
    //     if (res.data.success) this.products = this.products.filter((p) => p.id !== id);
    //   } catch (err) {
    //     console.error(err);
    //     this.error = "Impossible de supprimer le produit";
    //   }
    // },
  },
});
