<template>
  <div class="language-toggle d-flex align-items-center">
    <button
      v-for="(lang, key) in languages"
      :key="key"
      class="lang-btn"
      :class="{ active: $i18n.locale === key }"
      @click="setLang(key)"
    >
      <img :src="lang.flag" class="flag" />
      <span>{{ lang.name }}</span>
    </button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n({ useScope: 'global' })

const languages = {
  fr: { short: 'FR', name: 'Français', flag: 'https://flagcdn.com/w20/fr.png' },
  ar: { short: 'AR', name: 'العربية', flag: 'https://flagcdn.com/w20/ma.png' },
}

function setLang(lang) {
  locale.value = lang
  document.dir = lang === 'ar' ? 'rtl' : 'ltr'
}
</script>

<style scoped>
.language-toggle {
  gap: 6px;
  background: rgba(255, 255, 255, 0.1);
  padding: 0px;
  border-radius: 30px;
}

.lang-btn {
  border: none;
  background: transparent;
  color: white;
  font-weight: 600;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
    background-color: rgba(197, 192, 118, 0.466);

}

.lang-btn.active {
  background-color: var(--gold-clear); 
  color: #000;
  
}

.lang-btn:not(.active):hover {
  background-color: rgba(242, 236, 150, 0.291);
}

.flag {
  width: 18px;
  height: 13px;
  object-fit: cover;
  border-radius: 2px;
}
</style>
