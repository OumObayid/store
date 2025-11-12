<template>
  <div class="promo-banner">
    <div class="container-fluid">
      <ul class="promo-list">
        <!-- Service client -->
        <li>
          <router-link to="/contact" class="action-btn" title="Service client">
            <i class="bi bi-headset service-icon"></i>
            <span class="service-text">{{ $t("customerService") }}</span>
          </router-link>
        </li>

        <!-- Texte livraison -->
        <li class="promo-text d-none d-md-block">
          <!--  Affiche la valeur uniquement si setting est chargé -->
          <template v-if="setting && setting.seuil_gratuite">
            {{ $t("PromoFreeDelivery") }} {{ setting.seuil_gratuite }}
            {{ $t("dh") }}
            <span
              :style="{
                fontSize: '18px',
                display: 'inline-block',
                transform: locale === 'fr' ? 'scaleX(-1)' : 'scaleX(1)',
              }"
            >
              🚚
            </span>
          </template>
          <router-link to="/products" class="arrow-link">
            <i
              :class="[
                'mx-2',
                locale === 'ar'
                  ? 'bi bi-arrow-left-circle'
                  : 'bi bi-arrow-right-circle',
              ]"
            ></i>
          </router-link>
        </li>

        <!-- Sélecteur de langue -->
        <li class="lang-switcher">
          <LanguageSwitcher />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useSetting } from "../composables/useSetting";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const { setting, getSetting } = useSetting();

onMounted(async () => {
  await getSetting();
});
</script>

<style scoped>
.promo-banner {
  background: var(--gold); /* doré */
  color: white;
  font-size: 14px;
  padding: 4px 0;
  z-index: 100px !important;
}

.promo-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  font-weight: 500;
  text-decoration: none;
}

.service-icon {
  font-size: 20px;
}

.service-text {
  font-size: 14px;
}

.promo-text {
  font-weight: bold;
  text-align: center;
  flex-grow: 1;
}

.arrow-link {
  color: white;
  font-size: 18px;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.arrow-link:hover {
  transform: translateX(5px);
}

.lang-switcher {
  display: flex;
  align-items: center;
}
</style>
