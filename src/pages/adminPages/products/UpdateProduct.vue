<script setup>
import { ref, onMounted } from "vue";
import { useAdminProductStore } from "../../../stores/admin/adminProductStore";
import { useAdminCategorieStore } from "../../../stores/admin/adminCategorieStore";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const productStore = useAdminProductStore();
const categoryStore = useAdminCategorieStore();

const product = ref({
  id: null,
  nom: "",
  nom_ar: "",
  description: "",
  description_ar: "",
  prix: 0,
  prix_promo: 0,
  stock: 0,
  taille: "",
  categorie_id: "",
  image: "",
  images: [],
  status: "disponible",
});

const categories = ref([]);

onMounted(async () => {
  await categoryStore.fetchAllCategories();
  categories.value = categoryStore.categories;

  const productId = route.params.id;
  const existing = await productStore.fetchProductById(productId);
  if (existing) {
    product.value = { ...existing, images: existing.images || [] };
  }
});

const handleMainImage = (e) => {
  const file = e.target.files[0];
  if (file) product.value.image = file;
};

const handleGallery = (e) => {
  const files = Array.from(e.target.files);
  product.value.images = [...product.value.images, ...files];
};

// const removeGalleryImage = (idOrIndex) => {
//   product.value.images = product.value.images.filter((img, index) => {
//     if (img.id) return img.id !== idOrIndex;
//     return index !== idOrIndex;
//   });
// };
const removeGalleryImage = async (idOrIndex) => {
  // Si c’est une image existante (en base)
  if (typeof idOrIndex === "number" || typeof idOrIndex === "string") {
    try {
      const confirmDelete = confirm("Supprimer cette image ?");
      if (!confirmDelete) return;

      const res = await productStore.deleteGalleryImage(idOrIndex);
      if (res.success) {
        product.value.images = product.value.images.filter(
          (img) => img.id !== idOrIndex
        );
      } else {
        alert("Erreur lors de la suppression de l’image !");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur de connexion au serveur !");
    }
  } 
  // Si c’est une image ajoutée localement (pas encore enregistrée)
  else {
    product.value.images.splice(idOrIndex, 1);
  }
};


const getImagePreview = (img) => {
  if (!img) return "";
  if (img instanceof File) return URL.createObjectURL(img);
  if (typeof img === "string" && img.startsWith("data:image")) return img;
  if (img.src) return img.src;
  return "";
};

const handleUpdate = async () => {
  const formData = new FormData();
  for (const key in product.value) {
    if (key !== "images") formData.append(key, product.value[key]);
  }

  if (product.value.image instanceof File)
    formData.append("image", product.value.image);

  const gallery = Array.isArray(product.value.images)
    ? product.value.images
    : [];
  const galleryFiles = gallery.filter((img) => img instanceof File);
  const existingImageIds = gallery
    .filter((img) => !(img instanceof File))
    .map((img) => img.id);

  galleryFiles.forEach((file) => formData.append("gallery[]", file));
  formData.append("existing_images", JSON.stringify(existingImageIds));

  const res = await productStore.updateProduct(formData);
  if (res.success) router.push("/admin/products");
};
</script>

<template>

  <div class="container py-5">

    <div class="card shadow border-0 rounded-4 product-card">
      <div class=" d-flex justify-content-end align-items-center pt-3 me-3">
        <!-- Bouton retour 3D -->
        <router-link to="/admin/products" class="btn btn-3d">
          <i class="bi bi-arrow-left me-2"></i> Retour
        </router-link>
      </div>
      <div class="card-body p-4">
        <form @submit.prevent="handleUpdate" class="row g-4">
          
           <!-- SECTION : Informations générales -->
          <h5 class="fw-bold text-gold border-start border-4 border-gold ps-2 mb-3">Informations générales</h5>
        
          <div class="col-md-6">
            <label class="form-label">Nom du produit</label>
            <input v-model="product.nom" type="text" class="form-control custom-input" required />
          </div>

          <div class="col-md-6">
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

          <div class="col-md-4">
            <label class="form-label">Taille</label>
            <input v-model="product.taille" type="text" class="form-control custom-input"
              placeholder="ex: S, M, L..." />
          </div>

          <div class="col-md-4">
            <label class="form-label">Statut</label>
            <select v-model="product.status" class="form-select custom-input">
              <option value="disponible">Disponible</option>
              <option value="rupture">En rupture</option>
              <option value="LowStock">Stock faible</option>
            </select>
          </div>

          <!-- SECTION : Prix et stock -->
          <h5 class="fw-bold text-gold border-start border-4 border-gold ps-2 mt-4 mb-3">
             Prix et stock
          </h5>

          <div class="col-md-3">
            <label class="form-label">Prix</label>
            <input v-model="product.prix" type="number" step="0.01" class="form-control custom-input" required />
          </div>

          <div class="col-md-3">
            <label class="form-label">Prix promotionnel</label>
            <input v-model="product.prix_promo" type="number" step="0.01" class="form-control custom-input" />
          </div>

          <div class="col-md-3">
            <label class="form-label">Stock</label>
            <input v-model="product.stock" type="number" class="form-control custom-input" required />
          </div>

          <!-- SECTION : Description -->
          <h5 class="fw-bold text-gold border-start border-4 border-gold ps-2 mt-4 mb-3">
             Descriptions
          </h5>

          <div class="col-12">
            <label class="form-label">Description</label>
            <textarea v-model="product.description" rows="3" class="form-control custom-input"></textarea>
          </div>

          <div class="col-12">
            <label class="form-label">Description (arabe)</label>
            <textarea v-model="product.description_ar" rows="3" class="form-control custom-input"></textarea>
          </div>

          <!-- SECTION : Images -->
          <h5 class="fw-bold text-gold border-start border-4 border-gold ps-2 mt-4 mb-3">
             Images
          </h5>

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
              <div v-for="(img, index) in product.images" :key="img.id || index" class="gallery-item position-relative">
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
            <button type="submit" class="btn-3d px-4 py-2">
              <i class="bi bi-check-circle me-2"></i> Enregistrer
            </button>
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

.btn-outline-gold {
  border: 1px solid#b89018;
  color: #b89018;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-outline-gold:hover {
  background: #b89018;
  color: #fff;
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
