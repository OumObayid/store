import { useToast } from "vue-toastification";
import { i18n } from "../main"; // importer l'instance globale

const toast = useToast();

export function Toast(message, type = "success") {
  const currentLocale = i18n.global.locale.value;

  toast(message, {
    type,
    position: currentLocale === "fr" ? "top-right" : "top-left",
    rtl: currentLocale === "ar",
  });
}
