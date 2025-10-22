/*update category*/
<template>
    <div class="container-fluid-md pt-3 ">
        <!-- 🟡 Formulaire -->
        <div class="card shadow-sm border-0 rounded-4 ">
            <div class=" d-flex justify-content-end align-items-center pt-3 me-3">
        <!-- Bouton retour 3D -->
        <router-link to="/admin/categories" class="btn my-btn-outline-gold mx-2">
          <i class="bi bi-arrow-left me-2"></i> {{ $t("back") }}
        </router-link>
      </div>
            <div class="card-body">
                <form @submit.prevent="handleUpdate" class="row g-4">
                    <!-- Nom Français -->
                    <div class="col-md-6">
                        <label class="form-label fw-semibold text-gold">Nom (Français)</label>
                        <input type="text" v-model="category.nom" class="form-control border-gold rounded-4"
                            placeholder="Ex: accessoires" required />
                    </div>

                    <!-- Nom Arabe -->
                    <div class="col-md-6">
                        <label class="form-label fw-semibold text-gold">الاسم (بالعربية)</label>
                        <input type="text" v-model="category.nom_ar" class="form-control border-gold rounded-4 text-end"
                            dir="rtl" placeholder="مثال: اكسسوارات" required />
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
                        <textarea v-model="category.description_ar" class="form-control border-gold rounded-4 text-end"
                            dir="rtl" rows="3" placeholder="اكتب وصف الفئة هنا..."></textarea>
                    </div>

                    <!-- section image -->
                    <div class="d-flex justify-content-center">
                        <!-- Image actuelle -->
                        <div class="text-center">
                            <label class="form-label fw-semibold text-gold">{{ $t("currentImage") }}</label>
                            <div v-if="category.currentImage"
                                class="mb-3  mx-5 d-flex flex-column justify-content-center align-items-center">
                                <img :src="category.currentImage" alt="Image actuelle"
                                    class="img-preview rounded-4 shadow-sm mb-3"
                                    style=" object-fit: contain; object-position: center;" />
                                <!-- Input file caché -->
                                <input ref="fileInput" type="file" accept="image/*" @change="handleImageUpload"
                                    class="d-none" />

                                <!-- Bouton personnalisé -->
                                <MyButton typeNm="button" classNm="py-1" @click="triggerFileInput">
                                    {{ $t('updateImage') }} <!-- Texte traduisible -->
                                </MyButton>
                            </div>
                            <div v-else class="text-muted fst-italic">Aucune image</div>
                        </div>

                        <!-- Nouvelle image -->
                        <div class="text-center">
                            <!-- Aperçu de l'image -->
                            <div v-if="imagePreview" class=" mx-5 text-center">
                                <label class="form-label fw-semibold text-gold d-block">{{ $t('newImageSelected')
                                    }}</label>
                                <img :src="imagePreview" alt="Nouvelle image" class="img-preview rounded-4 shadow-sm"
                                    style=" object-fit: contain; object-position: center;" />

                            </div>
                        </div>

                    </div>


                    <!-- Boutons -->
                    <div class="d-flex justify-content-center mt-4 gap-3">
                        <MyButton typeNm="submit" classNm="outline py-1 px-4">
                            <i class="bi bi-check-circle me-2"></i> {{ $t("update") }}
                        </MyButton>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCategories } from "../../../composables/useCategories";
import MyButton from "../../../components/MyButton.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const route = useRoute();
const fileInput = ref(null);
const imagePreview = ref(null);
const category = ref({
    id: null,
    nom: "",
    nom_ar: "",
    description: "",
    description_ar: "",
    currentImage: "",
    image: null,
    status: "active",
});

// Composable categories
const { categories, error: error_editCategorie, fetchCategories, editCategory } = useCategories();

// 🟡 Charger la catégorie existante au montage
onMounted(async () => {
    if (categories.value.length === 0) {
        await fetchCategories();
    }

    const id = route.params.id;
    const found = categories.value.find((cat) => cat.id == id);

    if (found) {
        category.value = {
            id: found.id,
            nom: found.nom,
            nom_ar: found.nom_ar,
            description: found.description,
            description_ar: found.description_ar,
            currentImage: found.image || "",
            image: null,
            status: found.status || "active",
        };
    } else {
        console.warn(`Catégorie avec l'id ${id} non trouvée.`);
    }
});

// 🟡 Déclenche le clic sur l'input file caché
function triggerFileInput() {
    if (fileInput.value) {
        fileInput.value.click();
    }
}

// 🟡 Gérer la sélection du fichier
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
        category.value.image = file;
        imagePreview.value = URL.createObjectURL(file);
    }
}

// 🟡 Convertir fichier en Base64
function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// 🟡 Soumettre la mise à jour
async function handleUpdate() {
    try {
        let imageToSend = category.value.currentImage;

        // Si une nouvelle image est sélectionnée → convertir en base64
        if (category.value.image instanceof File) {
            imageToSend = await convertToBase64(category.value.image);
        }

        const data = {
            id: category.value.id,
            nom: category.value.nom,
            nom_ar: category.value.nom_ar,
            description: category.value.description,
            description_ar: category.value.description_ar,
            image: imageToSend,
        };


        await editCategory(data);

        if (!error_editCategorie.value) {
            alert(t("categoryUpdatedSuccessfully"));
        } else {
            alert(error_editCategorie.value);
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        alert(t("categoryUpdateError"));
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

.btn-gold:hover {
    background-color: #b9932e;
    color: #fff;
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

/* Responsive */
@media (max-width: 768px) {
    .img-preview {
        width: 120px;
        height: 120px;
    }
}
</style>