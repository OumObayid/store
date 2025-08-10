import axios from "axios";

const API_URL= import.meta.env.VITE_API_URL;

export function addCart(data){
   return axios.post(`${API_URL}/api/carts/addCart.php`,data)
}

export function ClearCat(data){
     return axios.post(`${API_URL}/api/carts/ClearCat.php`,data)

}
export function deleteCart(data){
     return axios.post(`${API_URL}/api/carts/deleteCart.php`,data)

}
export function getCartById(data){
     return axios.post(`${API_URL}/api/carts/getCartById.php`,data)

}
export function updateCart(data){
     return axios.post(`${API_URL}/api/carts/updateCart.php`,data)

}
export function updateCartAddress(data){
     return axios.post(`${API_URL}/api/carts/updateCartAddress.php`,data)

}
export function updatePaymentCartDetails(data){
     return axios.post(`${API_URL}/api/carts/updatePaymentCartDetails.php`,data)

}