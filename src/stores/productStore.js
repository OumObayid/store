import { defineStore } from "pinia";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: [],
  }),

  actions: {
    setProducts(products) {
      this.products = products;
    },

    addProduct(product) {
      this.products.push(product);
    },

    updateProduct(updatedProduct) {
      const index = this.products.findIndex((p) => Number(p.id) === Number(updatedProduct.id));
      if (index !== -1) {
        this.products[index] = { ...this.products[index], ...updatedProduct };
      }
    },

    deleteProduct(productId) {
      this.products = this.products.filter((p) => p.id !== productId);
    },

  },
});
