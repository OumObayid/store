// useDirection.js
import { computed } from "vue"
import { useI18n } from "vue-i18n"

export function useDirection() {
  const { locale } = useI18n()

  // RTL ou LTR
  const dir = computed(() => (locale.value === "ar" ? "rtl" : "ltr"))

  // Marge adaptée aux icônes (start en arabe, end en français)
  const iconMargin = computed(() => (locale.value === "ar" ? "ms-2" : "me-2"))

  return {
    dir,
    iconMargin,
    locale
  }
}
