// services/adminAuthService.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // ex: http://localhost/backend

// Connexion admin
export function adminLogin(data) {
  return axios.post(`${API_URL}/api/admin/auth/adminLogin.php`, data);
}

// // Récupérer tous les admins
// export function getAdmins() {
//   return axios.get(`${API_URL}/api/admin/getAdmins.php`);
// }

// // Récupérer un admin par ID
// export function getAdminById(id) {
//   return axios.get(`${API_URL}/api/admin/getAdmin.php?id=${id}`);
// }

// // Ajouter un admin
// export function addAdmin(data) {
//   return axios.post(`${API_URL}/api/admin/adminRegister.php`, data);
// }

// // Mettre à jour un admin
// export function updateAdmin(data) {
//   return axios.put(`${API_URL}/api/admin/updateAdmin.php`, data);
// }

// // Supprimer un admin
// export function deleteAdmin(id) {
//   return axios.delete(`${API_URL}/api/admin/deleteAdmin.php`, {
//     data: { id }
//   });
// }
