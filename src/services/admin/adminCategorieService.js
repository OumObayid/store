import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const adminCategorieService = {
  getAllCategoriesAdmin() {
    return axios.get(`${API_URL}/api/admin/categories/admGetCategories.php`);
  },

  getCategorieByIdAdmin(id) {
    return axios.post(`${API_URL}/api/admin/categories/getCategorieById.php`, { id });
  },

  addCategorie(data) {
    return axios.post(`${API_URL}/api/admin/categories/admAddCategorie.php`, data);
  },

  updateCategorie(data) {
    return axios.post(`${API_URL}/api/admin/categories/updateCategorie.php`, data);
  },

  deleteCategorie(id) {
    return axios.post(`${API_URL}/api/admin/categories/deleteCategorie.php`, { id });
  },
};
