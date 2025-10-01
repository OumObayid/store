import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Récupérer les ventes par ville
export async function fetchCitySales() {
  try {
    const response = await axios.get(`${API_URL}/api/export/city_sales.php`);
    return response.data; // tableau [{ city, total }]
  } catch (error) {
    console.error("Erreur fetch city data:", error);
    return [];
  }
}
