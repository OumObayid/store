<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCategorieStore } from "../../../stores/categorieStore";
import { useProducts } from "../../../composables/useProducts";
import { storeToRefs } from "pinia";
import MyButton from "../../../components/MyButton.vue";
import { useI18n } from "vue-i18n";
import { showConfirmDialog } from "../../../utils/showConfirmDialog";

const {t} = useI18n();

// Stores et router
const categoryStore = useCategorieStore();
const { categories } = storeToRefs(categoryStore)

// composable 
const { error: error_addProduct, addProduct } = useProducts()
// Produit à ajouter
const product = ref({
    nom: "",
    nom_ar: "",
    description: "",
    description_ar: "",
    prix: 0,
    stock: 0,
    stock_mini: 0,
    categorie_id: "",
    image: "",   // image principale en base64
    images: [],  // galerie en base64
});

// Conversion d'un fichier en base64
const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
    });

// Gestion de l’image principale
const handleMainImage = async (e) => {
    const file = e.target.files[0];
    if (file) product.value.image = await fileToBase64(file);
};

// Gestion de la galerie
const handleGallery = async (e) => {
    const files = Array.from(e.target.files);
    const base64Images = await Promise.all(files.map(f => fileToBase64(f)));
    product.value.images.push(...base64Images);
};

// Supprimer une image de la galerie
const removeGalleryImage = async (index) => {
    const confirmed = await showConfirmDialog({
        title: t("deleteImage"),
        text: t("areYouSureDeleteImage?"),
        confirmButtonText: t("yes"),
        cancelButtonText: t("cancel"),
        icon:'question'
    });
    if (confirmed) {
    product.value.images.splice(index, 1);
    }
    else {
        console.log("suppression annulée");
    }
};

// Soumission du formulaire
const handleAddProduct = async () => {
    // Création de l'objet data à envoyer
    const data = {
        nom: product.value.nom,
        nom_ar: product.value.nom_ar,
        description: product.value.description,
        description_ar: product.value.description_ar,
        prix: product.value.prix,
        stock: product.value.stock,
        stock_mini: product.value.stock_mini,
        categorie_id: product.value.categorie_id,
        image: product.value.image,        // base64
        images: product.value.images,      // base64
    };


    // Appel du store pour ajouter le produit
    await addProduct(data);
    if (!error_addProduct.value) {
        alert(t("productAddedSuccess"));
        product.value = {
            nom: "",
            nom_ar: "",
            description: "",
            description_ar: "",
            prix: 0,
            stock: 0,
            stock_mini: 0,
            categorie_id: "",
            image: "",
            images: [],
        };
    }
    else {
        alert(t("productAddedError"));
        console.log('error_addProduct.value :', error_addProduct.value);
    };
}
// Aperçu d'une image pour le formulaire
const getImagePreview = (img) => img || "";
</script>

<template>
    <div class="container py-2">
        <div class="card shadow-sm border-0 rounded-4 ">
            <div class=" d-flex justify-content-end align-items-center pt-3 me-3">
        <!-- Bouton retour 3D -->
        <router-link to="/admin/products" class="btn my-btn-outline-gold mx-2">
          <i class="bi bi-arrow-left me-2"></i> {{ $t("back") }}
        </router-link>
      </div>
            <div class="card-body  p-4">
                <form @submit.prevent="handleAddProduct" class="row g-4">
                    <div class="col-md-6">
                        <label class="form-label">{{ $t("productNameFR") }}</label>
                        <input v-model="product.nom" type="text" class="form-control custom-input" required />
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">{{ $t("productNameAR") }}</label>
                        <input v-model="product.nom_ar" type="text" class="form-control custom-input" required />
                    </div>

                    <div class="col-md-3">
                        <label class="form-label">{{ $t("category") }}</label>
                        <select v-model="product.categorie_id" class="form-select custom-input" required>
                            <option value="">-- {{ $t("select") }} --</option>
                            <option v-for="cat in categories" :key="cat.id" :value="cat.id">  {{ locale === 'fr' ? cat.nom : cat.nom_ar }}
</option>
                        </select>
                    </div>

                    <div class="col-md-3">
                        <label class="form-label">{{ $t("stock") }}</label>
                        <input v-model.number="product.stock" type="number" class="form-control custom-input"
                            required />
                    </div>

                    <div class="col-md-3">
                        <label class="form-label">{{ $t("miniStock") }}</label>
                        <input v-model.number="product.stock_mini" type="number" class="form-control custom-input"
                            required />
                    </div>

                    <div class="col-md-3">
                        <label class="form-label">{{ $t("price") }}</label>
                        <input v-model.number="product.prix" type="number" step="1" class="form-control custom-input"
                            required />
                    </div>

                    <!-- Description -->   
                    <div class="col-12">
                        <label class="form-label">{{ $t("descriptionFR") }}</label>
                        <textarea v-model="product.description" rows="2" class="form-control custom-input"></textarea>
                    </div>
                    <div class="col-12">
                        <label class="form-label">{{ $t("descriptionAR") }}</label>
                        <textarea v-model="product.description_ar" rows="2"
                            class="form-control custom-input"></textarea>
                    </div>

                    <!-- Images -->
  
                    <div class="col-md-4">
                        <label class="form-label">{{ $t("mainImage") }}</label>
                        <input type="file" class="form-control custom-input" @change="handleMainImage" />
                        <div v-if="product.image" class="mt-3 text-center">
                            <img :src="getImagePreview(product.image)" class="img-preview shadow"
                                alt="Image principale" />
                        </div>
                    </div>

                    <div class="col-md-8">
                        <label class="form-label">{{ $t("gallery") }}</label>
                        <input type="file" class="form-control custom-input" @change="handleGallery" multiple />
                        <div v-if="product.images.length" class="d-flex flex-wrap gap-3 mt-3">
                            <div v-for="(img, index) in product.images" :key="index"
                                class="gallery-item position-relative">
                                <img :src="getImagePreview(img)" class="img-fluid rounded" alt="galerie" />
                                <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0"
                                    @click="removeGalleryImage(index)">
                                    <i class="bi bi-x-lg"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Boutons -->
                    <div class="mt-5 d-flex justify-content-end">
                        <MyButton typeNm="reset" classNm="mx-2 px-5 py-1">
                            <i class="bi bi-arrow-counterclockwise"></i> {{ $t("reset") }}
                        </MyButton>
                        <MyButton typeNm="submit" classNm="mx2 px-5 py-1">
                            <i class="bi bi-check-circle"></i> {{ $t("save") }}
                        </MyButton>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* === Couleurs === */
.text-gold {
    color: #d4af37;
}

.bg-gold {
    background: linear-gradient(90deg, #c7b06c, #c3b99c);
    color: #fff;
}

/* === Effet d’apparition === */
.animate-fade-in {
    animation: fadeIn 0.6s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* === Inputs === */
.custom-input {
    border-radius: 10px;
    border: 1px solid #ccc;
    background: #fff;
    transition: all 0.3s ease;
}

.custom-input:focus {
    border-color: #b89018;
    box-shadow: 0 0 0 0.2rem rgba(184, 144, 24, 0.25);
    transform: scale(1.01);
}

/* === Boutons === */
.btn-gold {
    background: linear-gradient(135deg, #d9b643, #b89018);
    color: #fff;
    font-weight: 600;
    border: none;
    border-radius: 12px;
    transition: all 0.3s ease;
}

.btn-gold:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(184, 144, 24, 0.4);
}

.btn-grey {
    background: linear-gradient(135deg, #c3c2bf, #787670);
    color: #fff;
    font-weight: 600;
    border: none;
    border-radius: 12px;
    transition: all 0.3s ease;
}

.btn-grey:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

/* === Card formulaire === */
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

/* === Galerie et preview === */
.img-preview {
    max-height: 200px;
    border-radius: 10px;
    border: 1px solid #ddd;
    transition: all 0.3s ease;
}

.img-preview:hover {
    transform: scale(1.03);
}

.gallery-item {
    width: 110px;
    height: 110px;
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    position: relative;
    transition: 0.3s;
}

.gallery-item:hover {
    transform: scale(1.05);
}

.gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
}

.gallery-item button {
    position: absolute;
    top: 2px;
    right: 2px;
    padding: 2px 6px;
    font-size: 0.8rem;
}
</style>
