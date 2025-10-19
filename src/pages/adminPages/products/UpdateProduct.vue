<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { Toast } from "../../../utils/Toast";
import { useProductStore } from "../../../stores/productStore";
import { useCategorieStore } from "../../../stores/categorieStore";
import { storeToRefs } from "pinia";
import MyButton from "../../../components/MyButton.vue";
import { useProducts } from "../../../composables/useProducts";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const productStore = useProductStore();
const { products } = storeToRefs(productStore);

const categoryStore = useCategorieStore();
const { categories } = storeToRefs(categoryStore);

const { error, updateProduct,getAllProducts } = useProducts();

// 🆔 ID produit depuis route
const productId = computed(() => Number(route.params.id || 0));

// 🧲 Produit depuis le store
const productFromStore = computed(() => {
  if (!products.value || !Array.isArray(products.value)) return null;
  return products.value.find((p) => Number(p.id) === productId.value) || null;
});

// 📦 État local
const product = ref({
  id: null,
  nom: "",
  nom_ar: "",
  description: "",
  description_ar: "",
  prix: 0,
  stock: 0,
  stock_mini: 0,
  categorie_id: "",
  categorie_nom: "",
  categorie_nom_ar: "",
  image: "",
  images: [],
  taille: "",
  status: "",
  prix_promo: 0,
});

// 🧭 Listes de changements dans la galerie
const galleryDeleted = ref([]); // IDs supprimés
const galleryAdded = ref([]);   // Files ajoutés

// 🕸️ Synchronisation produit store → local
watch(productFromStore, (newVal) => {
  if (!newVal) return;
  product.value = {
    id: newVal.id ?? null,
    nom: newVal.nom ?? "",
    nom_ar: newVal.nom_ar ?? "",
    description: newVal.description ?? "",
    description_ar: newVal.description_ar ?? "",
    prix: newVal.prix ?? 0,
    stock: newVal.stock ?? 0,
    stock_mini: newVal.stock_mini ?? 0,
    categorie_id: newVal.categorie_id ?? "",
    categorie_nom: newVal.categorie_nom ?? "",
    categorie_nom_ar: newVal.categorie_nom_ar ?? "",
    image: newVal.image ?? "",
    images: Array.isArray(newVal.images)
      ? [...newVal.images]
      : newVal.images_galerie
      ? [...newVal.images_galerie]
      : [],
  };
  galleryDeleted.value = [];
  galleryAdded.value = [];
}, { immediate: true });

// 🖼️ Image principale
const handleMainImage = (e) => {
  const file = e.target.files?.[0];
  if (file) product.value.image = file;
};

// 🖼️ Galerie - ajout
const handleGallery = (e) => {
  const files = Array.from(e.target.files || []);
  galleryAdded.value.push(...files);
  product.value.images = [...product.value.images, ...files];
};

// 🗑️ Galerie - suppression
const removeGalleryImage = (idOrIndex) => {
  const idx = product.value.images.findIndex((img, i) =>
    typeof idOrIndex === "number"
      ? i === idOrIndex
      : img?.id === idOrIndex || img?.id === Number(idOrIndex)
  );
  if (idx === -1) return;

  const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer cette image ?");
  if (!confirmDelete) return;

  const imgObj = product.value.images[idx];

  if (imgObj instanceof File) {
    // Si c'est une nouvelle image → on la retire aussi de galleryAdded
    const addedIndex = galleryAdded.value.indexOf(imgObj);
    if (addedIndex !== -1) galleryAdded.value.splice(addedIndex, 1);
  } else if (imgObj?.id) {
    // Si c'est une image de la BDD
    galleryDeleted.value.push(imgObj.id);
  }

  product.value.images.splice(idx, 1);
};

// 👀 Aperçu image
const getImagePreview = (img) => {
  if (!img) return "";
  if (img instanceof File) return URL.createObjectURL(img);
  if (typeof img === "string" && img.startsWith("data:image")) return img;
  if (img.src) return img.src;
  return "";
};

// 🔄 File → Base64
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

// 📤 Préparation & envoi
const handleUpdateProduct = async () => {
  try {
    const preparedProduct = { ...product.value };

    // image principale
    if (preparedProduct.image instanceof File) {
      preparedProduct.image = await fileToBase64(preparedProduct.image);
    } else if (typeof preparedProduct.image === "object" && preparedProduct.image.src) {
      preparedProduct.image = preparedProduct.image.src;
    }

    // 🔸 Conversion des images à ajouter uniquement
    const galleryBase64 = [];
    for (const img of galleryAdded.value) {
      const base64 = await fileToBase64(img);
      galleryBase64.push(base64);
    }

    preparedProduct.gallery_added = galleryBase64;
    preparedProduct.gallery_deleted = galleryDeleted.value;

    // On n’envoie plus preparedProduct.images au backend ❌
    delete preparedProduct.images;

    console.log("📤 Data envoyée à l’API :", preparedProduct);
    // return; // 👉 décommente pour tester sans API

    await updateProduct(preparedProduct);

    if (!error.value) {
      Toast("Produit mis à jour avec succès ✅", "success");
      await getAllProducts();
      router.push("/admin/products");
    } else {
      Toast("Erreur lors de la mise à jour ❌", "error");
    }
  } catch (err) {
    console.error("❌ Erreur préparation product :", err);
    Toast("erreur lors de la mise à jour du produit", "error");
  }
};
</script>




<template>

  <div class="container-fluid-md pt-3 ">

    <div class="card shadow border-0 rounded-4 product-card">
      <div class=" d-flex justify-content-end align-items-center pt-3 me-3">
        <!-- Bouton retour 3D -->
        <router-link to="/admin/products" class="btn my-btn-outline-gold ">
          <i class="bi bi-arrow-left me-2"></i> Retour
        </router-link>
      </div>
      <div class="card-body p-4">
        <form @submit.prevent="handleUpdateProduct" class="row g-4">
          <div class="col-md-4">
            <label class="form-label">Nom du produit</label>
            <input v-model="product.nom" type="text" class="form-control custom-input" required />
          </div>
          <div class="col-md-4">
            <label class="form-label">Nom du produit (arabe)</label>
            <input v-model="product.nom_ar" type="text" class="form-control custom-input" required />
          </div>
          <div class="col-md-4">
            <label class="form-label">Catégorie</label>
            <select v-model="product.categorie_id" class="form-select custom-input" required>
              <option value="">-- Sélectionner --</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.nom }}
              </option>
            </select>
          </div>



          <!-- SECTION : Prix et stock -->
          <div class="col-md-4">
            <label class="form-label">Prix</label>
            <input v-model="product.prix" type="number" step="0.01" class="form-control custom-input" required />
          </div>
          <div class="col-md-4">
            <label class="form-label ">Stock</label>
            <input v-model="product.stock" type="number" class="form-control custom-input" required />
          </div>
          <div class="col-md-4">
            <label class="form-label">Stock Mini</label>
            <input v-model="product.stock_mini" type="number" class="form-control custom-input" required />
          </div>
          <!-- SECTION : Description -->
          <div class="col-12 col-md-6">
            <label class="form-label">Description</label>
            <textarea v-model="product.description" rows="3" class="form-control custom-input"></textarea>
          </div>

          <div class="col-12 col-md-6">
            <label class="form-label">Description (arabe)</label>
            <textarea v-model="product.description_ar" rows="3" class="form-control custom-input"></textarea>
          </div>

          <!-- SECTION : Images -->
          <div class="col-md-4">
            <label class="form-label">Image principale</label>
            <input type="file" class="form-control custom-input" @change="handleMainImage" />
            <div v-if="product.image" class="mt-3 text-center">
              <img :src="getImagePreview(product.image)" class="img-preview shadow-sm" alt="Image principale" />
            </div>
          </div>

          <div class="col-md-8">
            <label class="form-label">Galerie</label>
            <input type="file" class="form-control custom-input" @change="handleGallery" multiple />
            <div v-if="product.images && product.images.length" class="d-flex flex-wrap gap-3 mt-3">
              <div v-for="(img, index) in product.images" :key="img.id || index" class="gallery-item position-relative">{{img.id}}
                <img :src="getImagePreview(img)" class="img-fluid rounded" alt="galerie" />
                <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0"
                  @click="removeGalleryImage(img.id || index)">
                  <i class="bi bi-x"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Boutons -->
          <div class="mt-5 d-flex justify-content-end">
            <MyButton typeNm="submit" classNm="py-1">
              <i class="bi bi-check-circle me-2"></i> Enregistrer
            </MyButton>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* === Palette claire dorée === */
.text-gold {
  color: #b89018 !important;
}

/* === Bouton retour stylisé === */
.btn-3d {
  position: relative;
  background: linear-gradient(145deg, #fdf5dc, #e6c34b);
  color: #7c5d0b;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  padding: 10px 22px;
  font-size: 1rem;
  box-shadow: 0 5px 0 #b89018, 0 8px 15px rgba(184, 144, 24, 0.3);
  transition: all 0.2s ease;
}

.btn-3d:hover {
  background: linear-gradient(145deg, #e6c34b, #b89018);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 7px 0 #a37a13, 0 10px 20px rgba(184, 144, 24, 0.4);
}

.btn-3d:active {
  transform: translateY(3px);
  box-shadow: 0 2px 0 #b89018;
}

/* Icône */
.btn-3d i {
  font-size: 1.2rem;
  vertical-align: middle;
}

.border-gold {
  border-color: #b89018 !important;
}

.btn-gold {
  background: linear-gradient(135deg, #d9b643, #b89018);
  color: #fff;
  font-weight: 600;
  border: none;
  transition: all 0.3s ease;
}

.btn-gold:hover {
  background: linear-gradient(135deg, #b89018, #d9b643);
  transform: scale(1.03);
}

/* === Carte principale === */
.product-card {
  background-color: #fff;
  border-radius: 15px;
  overflow: hidden;
}

.card-body {
  background-color: #ffffff;
  border-radius: 0 0 15px 15px;
}

/* === Champs === */
.custom-input {
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: all 0.3s ease;
  background-color: #fff;
}

.custom-input:focus {
  border-color: #b89018;
  box-shadow: 0 0 0 0.2rem rgba(161, 119, 16, 0.25);
  transform: scale(1.01);
}

/* === Image principale === */
.img-preview {
  max-height: 16rem;
  border-radius: 10px;
  border: 1px solid#cac2a4;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.31);
}

.img-preview:hover {
  transform: scale(1.03);
  box-shadow: 0 0 10px rgba(161, 119, 16, 0.4);
}

/* === Galerie === */
.gallery-item {
  width: 110px;
  height: 110px;
  border: 1px solid #dddddd;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.gallery-item:hover {
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(161, 119, 16, 0.3);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
