import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export function getAllCategories() {
  return axios.get(`${API_URL}/api/categories/getCategories.php`);
}
export function addCategorie(data) {
  return axios.post(`${API_URL}/api/categories/addCategorie.php`, data);
}
export function updateCategorie(data) {
  return axios.post(`${API_URL}/api/categories/updateCategorie.php`, data);
}
export function deleteCategorie(data) {
  return axios.post(`${API_URL}/api/categories/deleteCategorie.php`, data);
}
