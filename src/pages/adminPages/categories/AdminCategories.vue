<template>
  <div class="container-fluid-md pt-3">
    <!-- 🔹 Recherche / Filtre -->
    <div class="row mb-3 d-md-flex justify-content-between">
      <div class="d-flex col-md-7">
        <div>
          <input type="text" class="form-control border-gold rounded-4" :placeholder="$t('search')"
            v-model="searchQuery" />
        </div>

        <div class="d-flex justify-content-end">
          <MyButton class="outline py-1 mx-3" @click="resetFilters">
            <i class="bi bi-arrow-counterclockwise me-1"></i> {{ $t("reset") }}
          </MyButton>
        </div>
      </div>
      <div class="col-md-5 d-flex justify-content-end">
        <MyButton :onClick="() => router.push('/admin/add-categorie')" class="outline py-1">
          <i class="bi bi-plus-circle me-2"></i> {{ $t("addCategory") }}
        </MyButton>
      </div>
    </div>

    <!-- 🔹 Tableau des catégories -->
    <div class="card shadow-sm mb-4 rounded-4">
      <div class="h5 card-header border-gold fw-bold">
        {{ $t("categoriesList") }} ({{ categories?.length }})
      </div>
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0 rounded-4">
          <thead class="border-gold text-gold">
            <tr>
              <th>{{ $t("image") }}</th>
              <th>{{ $t("nameFR") }}</th>
              <th>{{ $t("nameAR") }}</th>
              <th>{{ $t("products") }}</th>
              <th class="text-center">{{ $t("actions") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cat, index) in filteredCategories" :key="index">
              <td>
                <img :src="cat.image" class="cat-img rounded-3 shadow-sm" alt="Image" />
              </td>
              <td>{{ cat.nom }}</td>
              <td dir="rtl">{{ cat.nom_ar }}</td>
              <td>{{ cat.totalProducts || 0 }}</td>
              <td class="text-center">
                <button class="btn btn-sm btn-outline-info me-1" @click="openPreview(cat)">
                  <i class="bi bi-eye"></i>
                </button> 
                <router-link class="btn btn-sm my-btn-outline-gold me-1" :to="`/admin/update-categorie/${cat.id}`">
                  <i class="bi bi-pencil-square"></i>
                </router-link>                
                <button class="btn btn-sm btn-outline-danger me-1" @click="deleteCategory(cat.id)">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
            <tr v-if="filteredCategories.length === 0">
              <td colspan="9" class="text-center text-muted py-4">
                {{ $t("noCategoriesFound") }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 🔹 Modal Preview -->
    <div class="modal fade " id="previewModal" tabindex="-1" aria-hidden="true">
      <div class=" modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content preview-modal rounded-5 shadow-lg border-0">
          <div class="d-flex justify-content-between  gradient-gold rounded-top-5 border-0 py-2 px-4">
            <h5 class="modal-title fw-bold text-dark">
              <i class="bi bi-eye me-2 text-dark"></i> {{ $t("categoryPreview") }}
            </h5>
            <button type="button" class="btn-close btn-close-dark" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body p-4">
            <div class="row g-4 align-items-center">
              <div class="col-lg-5 text-center">
                <div class="preview-img-wrapper position-relative">
                  <img :src="previewCat.image" alt="Image Catégorie" class="preview-img rounded-4 shadow" />
                </div>
              </div>

              <div class="col-lg-7">
                <div class=" p-4 rounded-4 shadow ">
                  <h5 class="fw-bold text-gold mb-3 border-bottom pb-2">
                    {{ $t("generalInformation") }}
                  </h5>

                  <div class="row mb-3">
                    <div class="col-6">
                      <p class="mb-1 text-muted small">{{ $t("nameFR") }}</p>
                      <p class="fw-semibold">{{ previewCat.nom }}</p>
                    </div>
                    <div class="col-6">
                      <p class="mb-1 text-muted small">{{ $t("nameAR") }}</p>
                      <p class="fw-semibold " dir="rtl">
                        {{ previewCat.nom_ar }}
                      </p>
                    </div>
                  </div>

                  <div class="row mb-3">
                    <div class="col-12">
                      <p class="mb-1 text-muted small">{{ $t("descriptionFR") }}</p>
                      <p class="fw-semibold ">{{ previewCat.description }}</p>
                    </div>
                  </div>

                  <div class="row mb-3">
                    <div class="col-12">
                      <p class="mb-1 text-muted small">{{ $t("descriptionAR") }}</p>
                      <p class="fw-semibold" dir="rtl">
                        {{ previewCat.description_ar }}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCategorieStore } from "../../../stores/categorieStore";
import { useCategories } from "../../../composables/useCategories";
import { storeToRefs } from "pinia";
import MyButton from "../../../components/MyButton.vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
const router = useRouter();
const { t } = useI18n();
import {showConfirmDialog } from "../../../utils/showConfirmDialog";

const categorieStore = useCategorieStore();
const { categories } = storeToRefs(categorieStore);
const { error: error_removeCategory, fetchCategories, removeCategory } = useCategories();

onMounted(async () => {
  await fetchCategories();
});

const previewCat = ref({});
const searchQuery = ref("");
const filterStatus = ref("");

// ✅ Filtrage protégé contre undefined
const filteredCategories = computed(() => {
  const list = categories.value || [];
  return list.filter(
    (c) =>
      (c.nom?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        c.nom_ar?.includes(searchQuery.value)) &&
      (filterStatus.value === "" || c.status === filterStatus.value)
  );
});

function resetFilters() {
  searchQuery.value = "";
  filterStatus.value = "";
}

function openPreview(cat) {
  previewCat.value = cat;
  new bootstrap.Modal(document.getElementById("previewModal")).show();
}

async function deleteCategory(id) {
  const confirmed=await showConfirmDialog({
    title: t('deleteCategory'),
    text: t('areYouSureDeleteCategory?'),
    confirmButtonText: t('yes'),
    cancelButtonText: t('no'),
    icon: 'question'
  });
  if(confirmed){
    await removeCategory(id);   
  }
  else{
    console.log("suppression annulée");
  }
  // if (confirm( t('areYouSureDeleteCategory?') )) {
  //   await removeCategory(id);
  //   if (!error_removeCategory.value) {
  //     alert(t('categoryDeletedSuccessfully'));
  //   } else {
  //     alert( "erreur lors de la suppression de la catégorie." );
  //   }
  // }
}
</script>

<style>
.text-gold {
  color: #dbaf40;
}

.border-gold {
  border-color: #d4af37 !important;
}

.btn-gold {
  background-color: #d4af37;
  color: #000;
  border: none;
  transition: 0.3s;
}

.btn-gold:hover {
  background-color: #b9932e;
  color: #fff;
}


.icon-gold {
  color: #fbe583;
  text-shadow: 0 1px 3px rgba(184, 134, 11, 0.4);
  transition: all 0.3s ease;
}

.cat-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
}

.img-preview {
  width: 180px;
  height: 180px;
  object-fit: cover;
  border: 2px solid #d4af37;
}

.card {
  border-radius: 1rem;
  transition: 0.3s;
}

.gradient-gold {
  background: linear-gradient(135deg, #dfc8a5 0%, #d3ac51 100%);
  color: #ffffff;
  transition: transform 0.3s, box-shadow 0.3s;
}

.gradient-gold:hover {
  box-shadow: 0 12px 30px rgba(212, 175, 55, 0.3);
}

.card-clickable {
  cursor: pointer;
}

.preview-modal {
  background: #fff;
  overflow: hidden;
  border: 2px solid #f6e8b1;
}

.gradient-gold {
  background-image: linear-gradient(135deg,
      var(--gold),
      #e0b45e,
      #c6973f,
      #a67824);
  color: #fff;
}

.bg-gold {
  background: linear-gradient(135deg, #d4af37, #fff2ca);
  color: #000;
}

.preview-img-wrapper {
  position: relative;
  display: inline-block;
}

.preview-img {
  width: 100%;
  max-width: 350px;
  height: auto;
  border: 3px solid #f2d98c;
}

.info-card {
  border-left: 4px solid #d4af37;
}
</style>
