<template>
  <div class="language-switcher dropdown">
    <button class="btn  d-flex align-items-center" type="button"
            id="languageDropdown" data-bs-toggle="dropdown" aria-expanded="false">
      <!-- <i class="bi bi-globe "></i> -->
      <img :src="languages[$i18n.locale].flag" class="flag "/>
      <!-- <span>{{ languages[$i18n.locale].name }}</span> -->
    </button>

    <ul class="dropdown-menu dropdown-menu-end shadow-sm">
      <li v-for="(lang, key) in languages" :key="key">
        <a class="dropdown-item d-flex align-items-center" href="#" @click.prevent="setLang(key)">
          <img :src="lang.flag" class="flag icon"/>
          <span>{{ lang.name }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n({ useScope: 'global' })

const languages = {
  fr: { name: 'Français', flag: 'https://flagcdn.com/w20/fr.png' },
  ar: { name: 'العربية', flag: 'https://flagcdn.com/w20/ma.png' },
}

function setLang(lang) {
  locale.value = lang
  document.dir = lang === 'ar' ? 'rtl' : 'ltr'
}
</script>

<style scoped>


/* Bouton moderne / glass effect */

.language-switcher .btn {
    color: white;   
    display: flex;
    align-items: center;
    gap: 6px;  /* espace entre drapeau et texte */
    /* background: rgba(255, 255, 255, 0.15);  */
    /* border-radius: 20px;  */
    padding: 5px 10px;
    font-size: 14px;
    transition: background 0.3s;
}

/* .language-switcher .btn:hover {
    background: rgba(255, 255, 255, 0.3);
} */
.language-switcher .dropdown-menu {
  border-radius: 12px;
  padding: 0;
  min-width: 160px;
  overflow: hidden;
  background: rgba(30,30,30,0.95);
  color: #fff;
}

.language-switcher .dropdown-item {
  display: flex;
  align-items: center;
  padding: 10px 14px;
  transition: background 0.2s, color 0.2s;
  color: #fff;
}

.language-switcher .dropdown-item:hover {
  background: rgba(255, 215, 0, 0.15);
  color: #ffd700;
}

.flag {
  width: 20px;
  height: 15px;
  object-fit: cover;
  border-radius: 2px;
}

.bi-globe {
  font-size: 18px;
}
</style>
