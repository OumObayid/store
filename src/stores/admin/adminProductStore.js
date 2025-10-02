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

    // async fetchProductById(id) {
    //   try {
    //     const res = await adminProductService.getProductByIdAdmin(id);
    //     this.selectedProduct = res.data.dataProduct;
    //     return this.selectedProduct;
    //   } catch (err) {
    //     console.error(err);
    //     this.error = "Erreur lors du chargement du produit";
    //   }
    // },
    async fetchProductById(id) {
      this.loading = true;
      try {
        const res = await adminProductService.getProductByIdAdmin(id);
        if (res.data.success) {
          const product = res.data.dataProduct;

          // Galerie
          product.images_galerie = res.data.images_galerie || [];

          this.selectedProduct = product;
          return this.selectedProduct;
        } else {
          this.error = res.data.message || "Produit introuvable";
        }
      } catch (err) {
        console.error(err);
        this.error = "Erreur lors du chargement du produit";
      } finally {
        this.loading = false;
      }
    },

    // async addProduct(productData) {
    //   try {
    //     const res = await adminProductService.addProduct(productData);
    //     if (res.data.success) this.products.push(res.data.product);
    //   } catch (err) {
    //     console.error(err);
    //     this.error = "Impossible d'ajouter le produit";
    //   }
    // },

    // async updateProduct(productData) {
    //   try {
    //     const res = await adminProductService.updateProduct(productData);
    //     if (res.data.success) {
    //       const index = this.products.findIndex((p) => p.id === productData.id);
    //       if (index !== -1) this.products[index] = { ...this.products[index], ...productData };
    //     }
    //   } catch (err) {
    //     console.error(err);
    //     this.error = "Impossible de mettre à jour le produit";
    //   }
    // },
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
