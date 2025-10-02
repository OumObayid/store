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
  description: "",
  prix: 0,
  prix_promo: 0,
  stock: 0,
  categorie_id: "",
  image: "",
  images: [], // ✅ nouvelle clé (vient de la table product_images)
  status: "disponible",
});

const categories = ref([]);

onMounted(async () => {
  await categoryStore.fetchAllCategories();
  categories.value = categoryStore.categories;

  const productId = route.params.id;
  
  const existing = await productStore.fetchProductById(productId);
  if (existing) product.value = { ...existing };
});

// Image principale
const handleMainImage = (e) => {
  const file = e.target.files[0];
  if (file) product.value.image = file;
};

// Galerie
const handleGallery = (e) => {
  const files = Array.from(e.target.files);
  product.value.images = [...product.value.images, ...files];
};

const removeGalleryImage = (index) => {
  product.value.images.splice(index, 1);
};

// Preview image (support fichier & url)
const getImagePreview = (img) => {
  if (!img) return "";
  if (img instanceof File) return URL.createObjectURL(img);
  if (typeof img === "string" && img.startsWith("data:image")) return img; // BLOB base64
  if (img.filename) return `/uploads/products/${img.filename}`; // galerie
  return "";
};


// Update
const handleUpdate = async () => {
  const formData = new FormData();
  formData.append("id", product.value.id);
  formData.append("nom", product.value.nom);
  formData.append("description", product.value.description);
  formData.append("prix", product.value.prix);
  formData.append("prix_promo", product.value.prix_promo);
  formData.append("stock", product.value.stock);
  formData.append("categorie_id", product.value.categorie_id);
  formData.append("status", product.value.status);

  if (product.value.image instanceof File) {
    formData.append("image", product.value.image);
  }

  // Séparer fichiers nouveaux et anciens
  const galleryFiles = product.value.images.filter((img) => img instanceof File);
  const existingImages = product.value.images.filter((img) => !(img instanceof File));

  galleryFiles.forEach((file) => formData.append("gallery[]", file));
  formData.append("existing_images", JSON.stringify(existingImages));

  const res = await productStore.updateProduct(formData);
  if (res.success) router.push("/admin/products");
};
</script>

<template>
  <div class="container py-4">
    <div class="card shadow-lg border-0 rounded-3">
      <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
        <h4 class="mb-0"><i class="bi bi-pencil-square me-2"></i> Modifier le produit</h4>
        <router-link to="/admin/products" class="btn btn-sm btn-outline-light">
          <i class="bi bi-arrow-left"></i> Retour
        </router-link>
      </div>

      <div class="card-body">
        <form @submit.prevent="handleUpdate">
          <div class="row g-4">
            <!-- Nom -->
            <div class="col-md-6">
              <label class="form-label fw-bold">Nom du produit</label>
              <input v-model="product.nom" type="text" class="form-control" required />
            </div>

            <!-- Prix -->
            <div class="col-md-3">
              <label class="form-label fw-bold">Prix</label>
              <input v-model="product.prix" type="number" step="0.01" class="form-control" required />
            </div>

            <!-- Stock -->
            <div class="col-md-3">
              <label class="form-label fw-bold">Stock</label>
              <input v-model="product.stock" type="number" class="form-control" required />
            </div>

            <!-- Description -->
            <div class="col-12">
              <label class="form-label fw-bold">Description</label>
              <textarea v-model="product.description" rows="3" class="form-control"></textarea>
            </div>

            <!-- Image principale -->
            <div class="col-md-6">
              <label class="form-label fw-bold">Image principale</label>
              <input type="file" class="form-control" @change="handleMainImage" />
              <div v-if="product.image" class="mt-2">
                <img
                  :src="getImagePreview(product.image)"
                  alt="Image principale"
                  class="img-thumbnail"
                  style="max-height: 200px"
                />
              </div>
            </div>

            <!-- Galerie -->
            <div class="col-md-6">
              <label class="form-label fw-bold">Galerie d’images</label>
              <input type="file" class="form-control" multiple @change="handleGallery" />

              <div class="d-flex flex-wrap gap-2 mt-2">
                <div v-for="(img, index) in product.images" :key="index" class="position-relative">
                  <img :src="getImagePreview(img)" class="img-thumbnail" style="height: 120px; width: auto;" />
                  <button
                    type="button"
                    class="btn btn-sm btn-danger position-absolute top-0 end-0"
                    @click="removeGalleryImage(index)"
                  >
                    <i class="bi bi-x"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Boutons -->
          <div class="mt-4 d-flex justify-content-end gap-2">
            <button type="reset" class="btn btn-outline-secondary">Réinitialiser</button>
            <button type="submit" class="btn btn-success">
              <i class="bi bi-check-circle me-1"></i> Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Carte principale */
.card {
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

/* Header */
.card-header {
  font-size: 1.2rem;
  font-weight: 600;
  background: linear-gradient(135deg, #212529, #343a40);
  letter-spacing: 0.5px;
}

/* Labels */
.form-label {
  font-weight: 600;
  color: #333;
}

/* Champs de saisie */
.form-control {
  border-radius: 8px;
  border: 1px solid #ddd;
  transition: border 0.2s ease, box-shadow 0.2s ease;
}
.form-control:focus {
  border-color: #198754;
  box-shadow: 0 0 0 0.2rem rgba(25, 135, 84, 0.25);
}

/* Boutons */
.btn {
  border-radius: 8px;
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease-in-out;
}
.btn-success {
  background: linear-gradient(135deg, #28a745, #218838);
  border: none;
}
.btn-success:hover {
  background: linear-gradient(135deg, #218838, #1e7e34);
  transform: scale(1.02);
}
.btn-outline-secondary:hover {
  background-color: #f8f9fa;
  color: #333;
}

/* Galerie */
.img-thumbnail {
  border-radius: 10px;
  object-fit: cover;
  transition: transform 0.2s ease-in-out;
}
.img-thumbnail:hover {
  transform: scale(1.05);
}

/* Bouton supprimer image */
.btn-danger {
  border-radius: 50%;
  padding: 0.25rem 0.4rem;
  font-size: 0.75rem;
  opacity: 0.9;
}
.btn-danger:hover {
  opacity: 1;
}
</style>