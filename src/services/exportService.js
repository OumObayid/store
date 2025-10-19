import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

async function downloadFile(endpoint, filename) {
  try {
    const response = await axios.get(`${API_URL}/api/export/${endpoint}`, {
      responseType: "blob", // très important
    });

    const url = window.URL.createObjectURL(response.data);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error("Erreur téléchargement :", error);
  }
}

export function exportOrdersService() {
  return downloadFile("export_orders.php", "commandes.xlsx");
}

export function exportProductsService() {
  return downloadFile("export_products.php", "produits.csv");
}

export function exportCategoriesService() {
  return downloadFile("export_categories.php", "categories.csv");
}
