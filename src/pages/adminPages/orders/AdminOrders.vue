<template>
  <div class="container-fluid-md pt-3 ">

    <!-- Statistiques rapides -->
    <div class="row g-1 mb-4 d-flex justify-content-between align-items-center">
      <div class="col-6 col-md-2 mt-4 " v-for="stat in stats" :key="stat.title">
        <div class="card hover-move shadow-sm p-3  h-100">
          <div class="d-flex justify-content-between align-items-center">
            <div class="me-3 d-flex justify-content-center align-items-center flex-column ">
              <h6 class="text-muted small mb-0">{{ stat.title }}</h6>
              <h5 class="fw-bold mb-0">{{ stat.value }}</h5>
            </div>
            <i :class="stat.icon + ' fs-3 text-gold'"></i>
          </div>
        </div>
      </div>
    </div>
    <hr class="mb-4">

    <!-- Filtres par statut et recherche -->
    <div
      class="d-flex flex-column flex-md-row align-items-stretch align-items-md-center justify-content-between gap-2 ">

      <!-- Barre de recherche (uniquement si showArchived = false) -->
      <template v-if="!showArchived" class="col-12 col-md-10">
        <div class="col-12 col-md-3">
          <input v-model="search" type="text" class="form-control w-100" :placeholder="$t('searchClientOrProduct')">
        </div>

        <!-- Boutons de filtre statut -->
        <div
          class=" d-flex flex-wrap justify-content-start justify-content-md-center gap-1 ">
          <button v-for="status in statuses" :key="status.value" @click="filterStatus = status.value"
            :class="['btn py-1', filterStatus === status.value ? 'btn-gold' : 'btn-outline-gold']">
            {{ status.label }}
          </button>
        </div>
      </template>

      <!-- Toggle archives  -->
      <div :class="showArchived ? 'col-12 ':''" class=" d-flex justify-content-end    ">

        <!-- Bouton toggle archives -->
        <MyButton classNm="outline py-1 px-3 " @click="toggleArchived">
          <i class="bi bi-archive me-2"></i>
          {{ showArchived ? t("seeActive") : t("seeArchived") }}
        </MyButton>



      </div>

    </div>


    <div class="d-flex justify-content-end mb-2 mt-4"> 
      <MyButton classNm="outline px-4 py-1" @click="exportSales">
        &nbsp;<i class="bi bi-download me-2"></i>&nbsp;{{ t("export") }}&nbsp;
      </MyButton></div>
    <!-- Tableau des ventes - Version Desktop -->
    <div class="card shadow-sm d-none d-md-block">
      <!-- Bouton Export (toujours visible) -->

      <div class="table-responsive">
        <table class="table table-hover table-striped align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th style="width: 20%;">{{ $t("customer") }}</th>
              <th style="width: 30%;">
                <table width="100%">
                  <tr>
                    <td style="width:80%">{{ $t("products") }}</td>
                    <td style="width:20%">{{ $t("quantities") }}</td>
                  </tr>
                </table>
              </th>
              <th style="width: 10%;">{{ $t("date") }}</th>
              <th style="width: 10%;">{{ $t("status") }}</th>
              <th style="width: 10%;">{{ $t("total") }}</th>
              <th style="width: 10%;">{{ $t("actions") }}</th>
            </tr>
          </thead>
          <tbody style="font-size: 14px; text-align: start;">
            <tr v-for="sale in filteredSales" :key="sale.order_id">
              <td>{{ sale.firstname }} {{ sale.lastname }}</td>
              <td>
                <table width="100%">
                  <tr v-for="item in sale.items" :key="item.id">
                    <td style="width:80%">{{ locale === 'fr' ? item.nom : item.nom_ar }}</td>
                    <td style="width:20%">{{ item.quantity }}</td>
                  </tr>
                </table>
              </td>
              <td>
                {{
                  new Date(sale.created_at).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })
                }}
              </td>
              <td>
                <select v-model="sale.status" @change="updateStatus(sale)">
                  <option value="completed">{{ $t("completed") }}</option>
                  <option value="pending">{{ $t("pending") }}</option>
                  <option value="cancelled">{{ $t("cancelled") }}</option>
                  <option value="processing">{{ $t("processing") }}</option>
                </select>
              </td>
              <td>{{ sale.total }} DH</td>
              <td class="text-center">
                <button v-if="sale.status === 'completed'"
                  class="btn btn-sm btn-outline-secondary me-2" @click="handleArchiveOrder(sale.order_id)">
                  <i class="bi bi-archive"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger ms-2" @click="deleteSale(sale.order_id)">
                  <i class="bi bi-trash"></i>
                </button>

              </td>
            </tr>
            <tr>
              <td colspan="6" class="text-center text-muted py-4" v-if="filteredSales.length === 0">
                {{ $t('noOrdersFound') }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Tableau des ventes - Version Mobile -->
    <div class="d-block d-md-none">
      <div v-for="sale in filteredSales" :key="sale.order_id" class="card mb-3 shadow-sm p-3">
        <!-- Client + Date -->
        <div class="d-flex justify-content-between align-items-center mb-2">
          <div>
            <strong>{{ sale.firstname }} {{ sale.lastname }}</strong>
          </div>
          <small class="text-muted">
            {{
              new Date(sale.created_at).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              })
            }}
          </small>
        </div>

        <!-- Produits + Quantités -->
        <div class="mb-3 border-top pt-2">
          <h6 class="mb-2 fw-bold text-gold">Produits</h6>
          <div v-for="item in sale.items" :key="item.id" class="d-flex justify-content-between mb-1">
            <span>{{ locale === 'fr' ? item.nom : item.nom_ar }}</span>
            <span class="fw-bold">x{{ item.quantity }}</span>
          </div>
        </div>

        <!-- Status + Total + Actions -->
        <div class="d-flex flex-column gap-2 border-top pt-2">
          <div class="d-flex justify-content-between align-items-center">
            <label class="fw-bold me-2">{{ $t("status") }} :</label>
            <select v-model="sale.status" @change="updateStatus(sale)" class="form-select form-select-sm w-50">
              <option value="completed">{{ $t("paid") }}</option>
              <option value="pending">{{ $t("pending") }}</option>
              <option value="cancelled">{{ $t("cancelled") }}</option>
              <option value="processing">{{ $t("processing") }}</option>
            </select>
          </div>

          <div class="d-flex justify-content-between align-items-center">
            <span class="fw-bold">{{ $t("total") }} :</span>
            <span>{{ sale.total }} DH</span>
          </div>

          <div class="text-end">
            <button class="btn btn-sm btn-outline-danger me-2" @click="archiveSale(sale.order_id)">
              <i class="bi bi-archive"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" @click="deleteSale(sale.order_id)">
              <i class="bi bi-trash"></i> Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useOrderStore } from '../../../stores/orderStore';
import { exportOrdersService } from '../../../services/exportService';
import { useI18n } from 'vue-i18n';
import { useOrders } from '../../../composables/useOrders';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import MyButton from '../../../components/MyButton.vue'
import { showConfirmDialog } from '../../../utils/showConfirmDialog';
const { locale } = useI18n();
const { t } = useI18n();
const orderStore = useOrderStore();
const { orders } = storeToRefs(orderStore)

const { error: error_removeOrder, error: error_archiveOrder, removeOrder, fetchAllOrders, archiveOrder } = useOrders();

onMounted(async () => {
  await fetchAllOrders();
});
const search = ref('');
const filterStatus = ref('all');
const showArchived = ref(false); // false = actives, true = archivées

//  rend les traductions réactives
const statuses = computed(() => [
  { label: t("all"), value: 'all' },
  { label: t("pending"), value: 'Pending' },
  { label: t("processing"), value: 'Processing' },
  { label: t("paid"), value: 'Completed' },
  { label: t("cancelled"), value: 'Cancelled' },
])


// Statistiques rapides
const stats = computed(() => [
  { title: t("orders"), value: orders.value.length, icon: 'bi bi-bag-check' },

  // En attente (Pending) → horloge
  { title: t("pending"), value: orders.value.filter(s => s.status === 'pending').length, icon: 'bi bi-clock' },

  // En cours de traitement (Processing) → sablier en cours
  { title: t("processing"), value: orders.value.filter(s => s.status === 'processing').length, icon: 'bi bi-hourglass-split' },

  // Terminé / Payé (Completed) → check ou cash
  { title: t("completed"), value: orders.value.filter(s => s.status === 'completed').length, icon: 'bi bi-cash-stack' },

  // Annulé (Cancelled) → croix rouge
  { title: t("cancelled"), value: orders.value.filter(s => s.status === 'cancelled').length, icon: 'bi bi-x-circle' },

  // Annulé (Archived)
  { title: t("archived"), value: orders.value.filter(s => Number(s.archived) === 1).length, icon: 'bi bi-archive' },
]);

const filteredSales = computed(() => {
  if (showArchived.value) {
    // Mode archivées → on ignore les filtres
    return orders.value.filter(sale => Number(sale.archived) === 1);
  } else {
    // Mode actif → on applique filtres et recherche
    return orders.value.filter(sale => {
      const matchesSearch =
        sale.firstname?.toLowerCase().includes(search.value?.toLowerCase()) ||
        sale.lastname?.toLowerCase().includes(search.value?.toLowerCase()) ||
        sale.items?.some(item =>
          item.nom?.toLowerCase().includes(search.value?.toLowerCase()) ||
          item.nom_ar?.toLowerCase().includes(search.value?.toLowerCase())
        );

      const matchesStatus =
        filterStatus.value === 'all' || sale.status.toLowerCase() === filterStatus.value?.toLowerCase();

      const matchesArchived = Number(sale.archived) === 0; // uniquement les actives

      return matchesSearch && matchesStatus && matchesArchived;
    });
  }
});

// Toggle fonction
function toggleArchived() {
  showArchived.value = !showArchived.value;
}





function exportSales() {
  exportOrdersService();
}

function updateStatus(sale) {
  orderStore.updateSaleStatus(sale.order_id, sale.status);
}

async function deleteSale(order_id) {
  console.log('orders.value avant:', orders.value);
 const confirmed= await showConfirmDialog({
    title: t("deleteOrder"),
    text: t("deleteOrderConfirmation"),
    confirmButtonText: `${t("yes")},${t("delete")}`,
    cancelButtonText: t("cancel"),
    icon: 'question'
  });
  if(confirmed){
    await removeOrder(order_id);
    if (!error_removeOrder.value) {
      alert($t("orderDeletedSuccessfully"));
      console.log('orders.value apres:', orders.value);
    } else {
      alert($t("orderDeleteError"));
    }
  }

  // if (confirm("Voulez-vous vraiment supprimer cette cette commande?")) {
  //   await removeOrder(order_id);
  //   if (!error_removeOrder.value) {
  //     alert("Votre commande a été supprimé avec success");
  //     orders.value
  //     console.log('orders.value apres:', orders.value);
  //   } else {
  //     alert("Erreur lors de la suppression de votre commande.");
  //   }
  // }
}
async function handleArchiveOrder(order_id) {

  if (confirm("Voulez vous vraiment archiver cette commande?")) {
    await archiveOrder(Number(order_id))
    if (!error_archiveOrder.value)
      alert("Votre commande a été archivée avec success")
    else alert("Erreur dans l'archivage de votre commande!")
  }
}
</script>

<style scoped>
.text-gold {
  color: #d4af37;
}

.btn-outline-gold {
  border-color: #d4af37;
  color: #d4af37;
  transition: all 0.3s;
}

.btn-outline-gold:hover {
  background-color: #d4af37;
  color: #fff;
}

.btn-gold {
  background-color: #d4af37;
  color: #fff;
}

.badge.bg-success {
  background-color: #28a745 !important;
}

.hover-move {
  transition: transform 0.3s ease;
  cursor: pointer;
}

.hover-move:hover {
  transform: translateY(-5px) scale(1.05);
  /* monte et agrandit légèrement */
}
</style>
