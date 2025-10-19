import { ref } from "vue";
import { useCategorieStore } from "../stores/categorieStore";
import {
  getAllCategories,  
  addCategorie,
  updateCategorie,
  deleteCategorie,
} from "../services/categorieService";

export function useCategories() {
  const categories = ref([]);
  const loading = ref(false);
  const message = ref(null);
  const error = ref(null);

  const categorieStore = useCategorieStore();

  // 🟢 Charger toutes les catégories
  const fetchCategories = async () => {
    loading.value = true;
    message.value = null;
    error.value = null;
    try {
      const response = await getAllCategories(); //appel au service
      if (response.data.success) {
        categories.value = response.data.dataCat;
        // 🔄 MAJ store
        categorieStore.setCategories(response.data.dataCat); //MAJ du store
        message.value = response.data.message;
      } else {
        error.value = response.data.message;
      }
    } catch (err) {
      error.value = err.message || "Erreur lors du chargement des catégories";
    } finally {
      loading.value = false;
    }
  };

  // 🟡 Ajouter une catégorie
  const createCategory = async (data) => {
    loading.value = true;
    message.value = null;
    error.value = null;
    try {
      const response = await addCategorie(data); //appel service
      if (response.data.success) {
        categorieStore.addCategorie(response.data.dataCat); // MAJ store
        message.value = response.data.message || "catégorie ajouté avec succes";
      } else {
        error.value = response.data.message;
      }
    } catch (err) {
      error.value = err.message || "Erreur lors de l’ajout de la catégorie";
    } finally {
      loading.value = false;
    }
  };

  // 🟠 Mettre à jour une catégorie
  const editCategory = async (data) => {
  console.log('data :', data);
    loading.value = true;
    message.value = null;
    error.value = null;
    try {
      const response = await updateCategorie(data); //appel service
      if (response.data.success) {
        categorieStore.updateCategorie(response.data.dataCat); //  MAJ store
        message.value= response.data.message;
      } else {
        error.value = response.data.message;
      }
    } catch (err) {
      error.value =
        err.message || "Erreur lors de la mise à jour de la catégorie";
    } finally {
      loading.value = false;
    }
  };

  //  Supprimer une catégorie
  const removeCategory = async (id) => {
    loading.value = true;
    message.value = null;
    error.value = null;
    try {
      const response = await deleteCategorie({ id }); // appel au service
      if(response.data.success){          
      categorieStore.deleteCategorie(id);// MAJ store
     message.value= response.data.message;
      } else  error.value = response.data.message;   

    } catch (err) {
      error.value =
        err.message || "Erreur lors de la suppression de la catégorie";
    } finally {
      loading.value = false;
    }
  };

  return {
    // state
    categories,
    loading,
    message,
    error,

    // actions
    fetchCategories,
    createCategory,
    editCategory,
    removeCategory,
  };
}
