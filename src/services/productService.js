import axios from "axios";
const API_URL= import.meta.env.VITE_API_URL;

export function getAllProducts(){
    return axios.get(`${API_URL}/api/products/getProducts.php`)
}

export function getProductById(data) {
    return axios.post(`${API_URL}/api/products/getProductById.php`, data);
}

export function addProduct(data){
  return axios.post(`${API_URL}/api/Products/addProduct.php`,data);
}

export function updateProduct(data) {
   return axios.post(`${API_URL}/api/Products/updateProduct.php`,data);
}

export function deleteProduct(data){
   return axios.post(`${API_URL}/api/Products/deleteProduct.php`,data);
}
