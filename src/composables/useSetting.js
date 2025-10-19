// composables/useSettings.js
import { ref } from "vue";
import * as settingService from "../services/settingService";

export function useSetting() {
  const setting = ref(null);
  const loading = ref(false);
  const error = ref(null);

  // Récupérer les paramètres
  const getSetting = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await settingService.getSetting();
      if (response.data.success) {
        setting.value = response.data.setting;
      } else {
        error.value = response.data.message || "Erreur lors de la récupération";
      }
    } catch (err) {
      error.value = err.message || "Erreur réseau";
    } finally {
      loading.value = false;
    }
  };

  // Mettre à jour les paramètres
  const updateSetting = async (data) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await settingService.updateSetting(data);
      console.log('response in useSetting:', response);
      if (response.data.success) {
        setting.value = { ...setting.value, ...data }; // mise à jour locale
      } else {
        error.value = response.data.message || "Erreur lors de la mise à jour";
      }
      return response.data;
    } catch (err) {
      error.value = err.message || "Erreur réseau";
      return { success: false, message: error.value };
    } finally {
      loading.value = false;
    }
  };

  return {
    setting,
    loading,
    error,
    getSetting,
    updateSetting,
  };
}
