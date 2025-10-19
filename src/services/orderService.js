import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export function getAllOrders() {
  return axios.get(`${API_URL}/api/orders/getAllOrders.php`);
}

export function addOrder(data) {
  return axios.post(`${API_URL}/api/orders/addOrder.php`, data);
}

export function updateOrder(data) {
  return axios.post(`${API_URL}/api/orders/updateOrder.php`, data);
}

export function deleteOrder(data) {
  return axios.post(`${API_URL}/api/orders/deleteOrder.php`, data);
}

export function getOrdersByUser(data) {
  return axios.post(`${API_URL}/api/orders/getOrdersByUser.php`, data);
}

export function getRecentSales() {
  return axios.get(`${API_URL}/api/orders/getRecentSales.php`);
}

export function archiveOrderInApi(data) {
  return axios.post(`${API_URL}/api/orders/archiveOrderInApi.php`,data);
}

