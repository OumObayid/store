import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const adminProductService = {
  // addProduct(data) {
  //   return axios.post(`${API_URL}/api/admin/products/admAddProduct.php`, data);
  // },

  // deleteProduct(id) {
  //   return axios.post(`${API_URL}/api/admin/products/admDeleteProduct.php`, { id });
  // },

  updateProduct(data) {
    return axios.post(
      `${API_URL}/api/admin/products/admUpdateProduct.php`,
      data
    );
  },

  getAllProductsAdmin() {
    return axios.get(`${API_URL}/api/admin/products/admGetProducts.php`);
  },

  getProductByIdAdmin(id) {
    return axios.post(`${API_URL}/api/admin/products/admGetProductById.php`, {
      id,
    });
  },
};
