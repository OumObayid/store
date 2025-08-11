import { defineStore } from 'pinia';

export const useDataStore = defineStore('productStore', {
  state: () => ({   
    products: [],
  }),

  actions: {   

// ---------------------------------------Gestion des produits
    setProducts(products) {
      this.products = products;
    },  
    addProduct(product) {
      this.products.push(product);
    },
    updateProduct(updatedProduct) {
      const index = this.products.findIndex(p => p.id === updatedProduct.id);
      if (index !== -1) {
        this.products[index] = { ...this.products[index], ...updatedProduct };
      }
    },
    deleteProduct(productId) {
      this.products = this.products.filter(p => p.id !== productId);
    },
  },
 
});
