import { ref } from "vue";
import { useProductStore } from "../stores/productStore";
import * as productService from "../services/productService";

export function useProducts() {
  const loading = ref(false);
  const message = ref(null);
  const error = ref(null);
  const products = ref([]);
  const product = ref(null);

  const productStore = useProductStore();

  // 📦 Récupérer tous les produits
  const getAllProducts = async () => {

    loading.value = true;
    message.value = null;
    error.value = null;
    try {
      const response = await productService.getAllProducts(); //appel au service
      if (response.data.success) {
        products.value = response.data.products || [];
        productStore.setProducts(response.data.products); // 🔁 Mise à jour du store
        message.value = "Produits chargés avec succès.";
      } else {
        error.value =
          response.data.message || "Impossible de charger les produits.";
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // ➕ Ajouter un produit
  const addProduct = async (product) => {
    loading.value = true;
    message.value = null;
    error.value = null;
    try {
      const response = await productService.addProduct(product);
      if (response.data.success) {
        productStore.addProduct(response.data.product); // 🟢 Mise à jour du store
        message.value = "Produit ajouté avec succès.";
      } else {
        error.value =
          response.data.message || "Erreur lors de l'ajout du produit.";
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // ✏️ Mettre à jour un produit
  const updateProduct = async (data) => {
  console.log('data :', data);
    loading.value = true;
    message.value = null;
    error.value = null;
    try {
      const response = await productService.updateProduct(data);
      console.log('response :', response);
      if (response.data.success) {
        const updated = response.data.product;
        productStore.updateProduct(updated); // 🟢 Mise à jour du store
        message.value = "Produit mis à jour avec succès.";
      } else {
        error.value = response.data.message || "Erreur lors de la mise à jour.";
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // ❌ Supprimer un produit
  const deleteProduct = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await productService.removeProduct({id});
      if (response.data.success) {
        productStore.deleteProduct(id); // 🗑️ Suppression du store
      } else {
        error.value =
          response.data.message || "Erreur lors de la suppression du produit.";
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    message,
    error,
    products,
    product,

    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}
