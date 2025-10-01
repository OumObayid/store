import { ref } from "vue";
import { useAdminProductStore } from "../../stores/admin/adminProductStore";

export function useAdminProduct() {
  const productStore = useAdminProductStore();
  const selectedProduct = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const fetchProductById = async (id) => {
    loading.value = true;
    error.value = null;

    const product = await productStore.fetchProductById(id);
    if (product) selectedProduct.value = product;
    else error.value = productStore.error;

    loading.value = false;
  };

  return { selectedProduct, loading, error, fetchProductById };
}
