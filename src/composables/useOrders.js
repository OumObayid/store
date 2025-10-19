import { ref } from "vue";
import { useOrderStore } from "../stores/orderStore";
import {
  getAllOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  getOrdersByUser,
  archiveOrderInApi,
} from "../services/orderService";

export function useOrders() {
  const orderStore = useOrderStore();
  const loading = ref(false);
  const error = ref(null);

  // 📥 Charger toutes les commandes
  const fetchAllOrders = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await getAllOrders();
      if (response.data.success) {
        orderStore.setOrders(response.data.orders);
      } else {
        error.value = response.data.message;
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // ➕ Ajouter une commande
  const createOrder = async (orderData) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await addOrder(orderData);
      if (response.data.success) {
        orderStore.addOrder(response.data.order); // ajoute au store
      } else {
        error.value = response.data.message;
      }
      return response.data;
    } catch (err) {
      error.value = err.message;
      return { success: false, message: err.message };
    } finally {
      loading.value = false;
    }
  };

  // ✏️ Modifier une commande
  const editOrder = async (orderData) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await updateOrder(orderData);
      if (response.data.success) {
        orderStore.updateOrder(orderData.id, orderData);
      } else {
        error.value = response.data.message;
      }
      return response.data;
    } catch (err) {
      error.value = err.message;
      return { success: false, message: err.message };
    } finally {
      loading.value = false;
    }
  };
  //  Supprimer une commande
  const removeOrder = async (order_id) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await deleteOrder({ order_id }); // appel au service
      if (response.data.success) {
        orderStore.deleteOrder(order_id);
      } else error.value = response.data.message;
    } catch (err) {
      error.value =
        err.message || "Erreur lors de la suppression de la commande";
    } finally {
      loading.value = false;
    }
  };

  // 👤 Récupérer les commandes d’un utilisateur
  const fetchOrdersByUser = async (userId) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await getOrdersByUser({ user_id: userId });
      if (response.data.success) {
        orderStore.orders = response.data.data;
        orderStore.saveToLocalStorage();
      } else {
        error.value = response.data.message;
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  const archiveOrder = async (order_id) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await archiveOrderInApi({ order_id });
      if (response.data.success) {
        orderStore.archiveOrderInStore(order_id);
      } else error.value = response.data.message;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    orderStore,
    fetchAllOrders,
    createOrder,
    editOrder,
    removeOrder,
    fetchOrdersByUser,
    archiveOrder,
  };
}
