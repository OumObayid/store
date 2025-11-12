<!-- ---------tous les droits sont réservés à Oumaima El Obayid----------- -->
<template>
  <!-- Bouton avec les props dynamiques -->
  <button
    class="btnn"
    :class="classNm"
    :style="styleNm"
    :type="typeNm"
    :title="titleNm"
    @click="onClick"
  >
    <slot></slot> <!-- Contenu enfant -->
  </button>
</template>

<script setup>
// Déclaration des props comme en React
defineProps({
  classNm: { type: String, default: "" },
  styleNm: { type: [String, Object], default: "" },
  typeNm: { type: String, default: "button" }, // button, submit, reset
  titleNm: { type: String, default: "" },
  onClick: { type: Function, default: null }
})
</script>

<style >
/* --------button with class btnn */
.btnn {
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 15px;
  border: none;
  background: var(--gold);
  border: 2px solid var(--gold);
  font-size: 16px;
  font-weight: 700;
  color: var(--orange-clair);
  box-shadow: 0 5px 0px 0px var(--gold3);
  transition: all 1s;
}

.btnn:hover {
  box-shadow: none;
  transform: translateY(5px);
  transition: all 0.1s linear;
  color: white !important;
}

.btnn:focus {
  outline: transparent;
}

.btnn:active {
  background: var(--dore-clear);
}
/* button outline */
.outline {
  border: 2px solid var(--gold);
  color: var(--gold3) !important;
  border-radius: 14px;
  padding: 0.6rem 1.1rem;
  background: transparent;
}

.outline:hover {
  background: var(--gold);
  color: #ffffff;
}
</style>


<!-- exemple d'utilisation:
<MyButton
  classNm="extra-class"
  :styleNm="{ backgroundColor: 'red' }"
  typeNm="submit"
  titleNm="Cliquez ici"
  :onClick="() => alert('Clic sur le bouton !')"
>
  Voir le produit
</MyButton> -->
