<template>
  <div class="contact-container container py-5">
    <div class="text-center">
      <h3 :style="locale==='fr' ? {borderLeft: '4px solid var(--bs-warning)'} : {borderRight: '4px solid var(--bs-warning)'} " class="text-center mb-4 fw-bold">{{ t("contactform.title") }}</h3>
    </div>

    <form @submit.prevent="handleSubmit" class="contact-form mx-auto">
      <div class="mb-3">
        <label :class="locale === 'ar' ? 'text-end d-block' : ''">{{ t("contactform.fullname") }}</label>
        <input
          v-model="form.name"
          type="text"
          class="form-control"
          :placeholder="t('contactform.fullname_placeholder')"
          required
        />
      </div>

      <div class="mb-3">
        <label :class="locale === 'ar' ? 'text-end d-block' : ''">{{ t("contactform.email") }}</label>
        <input
          v-model="form.email"
          type="email"
          class="form-control"
          :placeholder="t('contactform.email_placeholder')"
          required
        />
      </div>

      <div class="mb-3">
        <label :class="locale === 'ar' ? 'text-end d-block' : ''">{{ t("contactform.subject") }}</label>
        <input
          v-model="form.subject"
          type="text"
          class="form-control"
          :placeholder="t('contactform.subject_placeholder')"
          required
        />
      </div>

      <div class="mb-3">
        <label :class="locale === 'ar' ? 'text-end d-block' : ''">{{ t("contactform.message") }}</label>
        <textarea
          v-model="form.message"
          class="form-control"
          rows="5"
          :placeholder="t('contactform.message_placeholder')"
          required
        ></textarea>
      </div>

      <div class="text-center">
        <MyButton type="submit" class="btn-send">{{ t("contactform.send") }}</MyButton>
      </div>
    </form>
  </div>
</template>


<script setup>
import { reactive } from "vue"
import MyButton from '../../components/MyButton.vue';
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();
const form = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
})

function handleSubmit() {
  if (!form.name || !form.email || !form.message) {
    alert("Veuillez remplir tous les champs obligatoires.")
    return
  }

  console.log("Message envoyé :", { ...form })
  alert("Votre message a été envoyé avec succès ✅")

  // Réinitialisation du formulaire
  form.name = ""
  form.email = ""
  form.subject = ""
  form.message = ""
}
</script>

<style scoped>
.contact-container {
  max-width: 700px;
  text-align: left;
}

h2 {
  color: var(--gold, #d4af37);
  font-size: 2rem;
}

.contact-form {
  background: #fff;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.form-label {
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
}

.form-control {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 15px;
  transition: border-color 0.3s;
}

.form-control:focus {
  border-color: var(--gold, #d4af37);
  box-shadow: 0 0 5px rgba(212, 175, 55, 0.4);
}

.btn-send {
  background: var(--gold, #d4af37);
  border: none;
  color: #000;
  font-weight: 600;
  padding: 10px 30px;
  border-radius: 25px;
  transition: background 0.3s, transform 0.2s;
}

.btn-send:hover {
  background: #c8a932;
  transform: translateY(-2px);
}
.contact-container label{
  font-weight: bold;
}
h3{border:none;}
</style>
