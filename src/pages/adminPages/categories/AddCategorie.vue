<template>
  <div class="container-fluid-md pt-3">
    <!-- Formulaire -->
    <div class="card shadow-sm border-0 rounded-4 ">
      <div class=" d-flex justify-content-end align-items-center pt-3 me-3">
        <!-- Bouton retour 3D -->
        <router-link to="/admin/categories" class="btn my-btn-outline-gold ">
          <i class="bi bi-arrow-left me-2"></i> {{$t("back")}}
        </router-link>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleSubmit" class="row g-4">
          <!-- Nom Français -->
          <div class="col-md-6">
            <label class="form-label fw-semibold text-gold">Nom (Français)</label>
            <input type="text" v-model="category.nom" class="form-control border-gold rounded-4"
              placeholder="Ex: accessoires" required />
          </div>

          <!-- Nom Arabe -->
          <div class="col-md-6">
            <label class="form-label fw-semibold text-gold">الاسم (بالعربية)</label>
            <input type="text" v-model="category.nom_ar" class="form-control border-gold rounded-4 text-end" dir="rtl"
              placeholder="مثال:اكسسوارات" required />
          </div>

          <!-- Description FR -->
          <div class="col-md-6">
            <label class="form-label fw-semibold text-gold">Description (Français)</label>
            <textarea v-model="category.description" class="form-control border-gold rounded-4" rows="3"
              placeholder="Décrivez la catégorie..."></textarea>
          </div>

          <!-- Description AR -->
          <div class="col-md-6">
            <label class="form-label fw-semibold text-gold">الوصف (بالعربية)</label>
            <textarea v-model="category.description_ar" class="form-control border-gold rounded-4 text-end" dir="rtl"
              rows="3" placeholder="اكتب وصف الفئة هنا..."></textarea>
          </div>

          <!-- Image -->
          <div class=" d-flex flex-column align-items-center">
            <label class="form-label fw-semibold text-gold">{{ $t("categoryImage") }}</label>

            <!-- input file caché -->
            <input ref="fileInput" type="file" accept="image/*" class="d-none" @change="handleImageUpload" />

            <!-- bouton personnalisé -->
            <MyButton typeNm="button" classNm="outline py-1" @click="triggerFileInput">
              <i class="bi bi-upload me-2"></i> {{ $t("chooseImage") }}
            </MyButton>

            <!-- nom du fichier -->
            <p v-if="category.image" class="text-muted small mt-2">
              {{ category.image.name }}
            </p>

            <!-- aperçu de l'image -->
            <div v-if="imagePreview" class="mt-3 text-center">
              <img :src="imagePreview" alt="Aperçu de l’image" class="img-preview rounded-4 shadow-sm" />
            </div>
          </div>



          <!-- Boutons -->
          <div class="col-12 d-flex justify-content-end mt-4 gap-3">
            <MyButton typeNm="reset" classNm="py-1 px-4" @click="resetForm">
              <i class="bi bi-x-circle me-2"></i> {{ $t("cancel") }}
            </MyButton>
            <MyButton typeNm="submit" classNm="py-1 px-4">
              <i class="bi bi-check-circle me-2"></i> {{ $t("save") }}
            </MyButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCategories } from "../../../composables/useCategories";
import MyButton from "../../../components/MyButton.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const category = ref({
  nom: "",
  nom_ar: "",
  description: "",
  description_ar: "",
  image: null, // en base64
  status: "active",
});

const { createCategory, error_createCategorie } = useCategories();

const fileInput = ref(null);
const fileName = ref(null);
const imagePreview = ref(null);

// Déclenche l'input file caché
function triggerFileInput() {
  fileInput.value?.click();
}

// Convertir une image en base64
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Gérer l'upload de l'image
async function handleImageUpload(e) {
  const file = e.target.files[0];
  if (file) {
    fileName.value = file.name;
    imagePreview.value = URL.createObjectURL(file);
    try {
      const base64 = await convertToBase64(file);
      category.value.image = base64;
    } catch (err) {
      console.error("Erreur conversion base64 :", err);
    }
  }
}

// Soumission
async function handleSubmit() {
    // Vérification des champs requis
  if (
    !category.value.nom ||
    !category.value.nom_ar ||
    !category.value.description ||
    !category.value.description_ar ||
    !category.value.image
  ) {
    alert(t("fillAllFields"));
    return;
  }
  const data = {
    nom: category.value.nom,
    nom_ar: category.value.nom_ar,
    description: category.value.description,
    description_ar: category.value.description_ar,
    image: category.value.image,
  };

  await createCategory(data);

  if (!error_createCategorie) {
    alert(t("categoryCreatedSuccessfully"));
    category.value = {
      nom: "",
      nom_ar: "",
      description: "",
      description_ar: "",
      image: null,     
    };
    fileName.value = null;
    imagePreview.value = null;
  } else {
    alert(t("categoryCreationError"));
  }
}
</script>


<style scoped>
.text-gold {
  color: #d4af37;
}

.border-gold {
  border-color: #d4af37 !important;
}

.btn-gold {
  background-color: #d4af37;
  color: #000;
  transition: 0.3s;
  border: none;
}

.img-preview {
  width: 180px;
  height: 180px;
  object-fit: cover;
  border: 3px solid #d4af37;
  transition: transform 0.3s ease;
}

.img-preview:hover {
  transform: scale(1.05);
}

/* Animation douce du formulaire */
.card {
  animation: fadeInUp 0.6s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .img-preview {
    width: 120px;
    height: 120px;
  }
}
</style>
