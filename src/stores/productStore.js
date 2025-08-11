import { defineStore } from 'pinia';

export const useDataStore = defineStore('dataStore', {
  state: () => ({   
    products: [],
  }),

  actions: {   

// ---------------------------------------Gestion des produits
// Obtenir la liste des produits
    setProducts(products) {
      this.products = products;
    },  
    //Ajouter un produit
    addProduct(product) {
      this.products.push(product);
    },
    // Mettre à jour un produit
    updateProduct(updatedProduct) {
      const index = this.products.findIndex(p => p.id === updatedProduct.id);
      if (index !== -1) {
        this.products[index] = { ...this.products[index], ...updatedProduct };
      }
    },
    // Supprimer un produit
    deleteProduct(productId) {
      this.products = this.products.filter(p => p.id !== productId);
    },
  },
 
});
