<template>
  <div class="container-fluid-md pt-3 ">
    <div class="px-3 shadow-lg border-0 rounded-4">
      <div
        class=" d-flex justify-content-center justify-content-md-end align-items-center rounded-top-4"
      >     
        <MyButton
          classNm="my-4 py-1 d-flex align-items-center"
          @click="handleUpdate"
          :disabled="loading"
        >
          <i class="bi bi-cloud-upload-fill me-2"></i>
          {{ loading ? $t('updating')+'...' : $t('save') }}
        </MyButton>
      </div>

      <div class="card-body row g-4">
        <!-- ID (Lecture seule) -->
        <div class="col-md-6">
          <label class="form-label fw-bold">{{ $t('id') }}</label>
          <input
            type="text"
            class="form-control"
            v-model="localSetting.id"
            readonly
          />
        </div>

        <!-- Frais de livraison -->
        <div class="col-md-6">
          <label class="form-label fw-bold">{{ $t('deliveryFeesdh') }}</label>
          <input
            type="number"
            class="form-control"
            v-model.number="localSetting.frais_livraison"
          />
        </div>

        <!-- Livraison gratuite -->
        <div class="col-md-6">
          <label class="form-label fw-bold">{{ $t('freeShipping') }}</label>
          <select
            class="form-select"
            v-model.number="localSetting.livraison_gratuite"
          >
            <option :value="1">{{ $t('yes') }}</option>
            <option :value="0">{{ $t('no') }}</option>
          </select>
        </div>

        <!-- Seuil de livraison gratuite -->
        <div class="col-md-6">
          <label class="form-label fw-bold">{{ $t('freeThreshold') }}</label>
          <input
            type="number"
            class="form-control"
            v-model.number="localSetting.seuil_gratuite"
          />
        </div>

        <!-- Date de mise à jour -->
        <div class="col-md-12">
          <label class="form-label fw-bold">{{ $t('updatedAt') }}</label>
          <input
            type="text"
            class="form-control"
            :value="formatDate(localSetting.updated_at)"
            readonly
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { useSetting } from '../../composables/useSetting' // adapte le chemin si nécessaire
import MyButton from '../../components/MyButton.vue'
const { setting, getSetting, updateSetting } = useSetting()

// ✅ Initialisation vide — puis remplissage après chargement
const localSetting = reactive({
  id: '',
  frais_livraison: 0,
  livraison_gratuite: 0,
  seuil_gratuite: 0,
  updated_at: null,
})

const loading = ref(false)

// ✅ Mettre à jour localSetting quand setting change
watch(
  () => setting.value,
  (newVal) => {
    if (newVal) {
      localSetting.id = newVal.id ?? ''
      localSetting.frais_livraison = Number(newVal.frais_livraison) ?? 0
      localSetting.livraison_gratuite = Number(newVal.livraison_gratuite) ?? 0
      localSetting.seuil_gratuite = Number(newVal.seuil_gratuite) ?? 0
      localSetting.updated_at = newVal.updated_at ?? null
    }
  },
  { immediate: true }
)

onMounted(async () => {
  await getSetting();
})

const handleUpdate = async () => {
  try {
    loading.value = true
    await updateSetting({ ...localSetting })
    alert('Paramètres mis à jour avec succès ✅')
  } catch (e) {
    console.error(e)
    alert('Erreur lors de la mise à jour ⚠️')
  } finally {
    loading.value = false
  }
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleString()
}
</script>

<style scoped>

.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}
.form-label {
  color: #555;
}
input[readonly] {
  background-color: #f8f9fa;
  cursor: not-allowed;
}
@media (max-width: 576px) {
  .card-header h4 {
    font-size: 1.2rem;
  }
  .btn {
    font-size: 0.85rem;
  }
}
</style>
