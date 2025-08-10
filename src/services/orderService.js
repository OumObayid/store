import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export function getAllOrders() {
  return axios.get(`${API_URL}/api/orders/getAllOrders.php`);
}

export function getOrderById(data) {
  return axios.post(`${API_URL}/api/orders/getOrderById.php`, data);
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

export function getOrderByStatus(data) {
  return axios.post(`${API_URL}/api/orders/getOrderByStatus.php`, data);
}

export function getOrdersByDate(data) {
  return axios.post(`${API_URL}/api/orders/getOrdersByDate.php`, data);
}

export function getOrdersByDate(data) {
  return axios.post(`${API_URL}/api/orders/getOrdersByDate.php`, data);
}

export function getOrdersByProduct(data) {
  return axios.post(`${API_URL}/api/orders/getOrdersByProduct.php`, data);
}
