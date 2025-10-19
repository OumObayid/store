import axios from "axios";
const API_URL= import.meta.env.VITE_API_URL;

export function getAllProducts(){
    return axios.get(`${API_URL}/api/products/getProducts.php`)
}


export function addProduct(data){
    return axios.post(`${API_URL}/api/products/addProduct.php`, data);
}

export function updateProduct(data){
    return axios.post(`${API_URL}/api/products/updateProduct.php`, data);
}
export function removeProduct(data){
    return axios.post(`${API_URL}/api/products/removeProduct.php`, data);
}
