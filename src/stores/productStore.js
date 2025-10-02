import { defineStore } from "pinia";
import { getProductById } from "../services/productService";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: [],
    selectedProduct: null, // pour la page détail de vitrine
  }),

  actions: {
   
    setProducts(products) {
      this.products = products;
    },
    async fetchProductById(id) {
      // Vérifie si déjà présent dans le store
      let product = this.products.find((p) => p.id === id);
      if (!product) {
        const res = await getProductById({ id });
        product = res.data.dataProduct;
        if (product) this.products.push(product);
      }
      this.selectedProduct = product;
      return product;
    },
  },
});
