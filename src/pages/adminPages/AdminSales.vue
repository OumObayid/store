<template>
  <div class="sales-page container-fluid py-4">

    <!-- Header et recherche -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
      <h3 class="fw-bold text-uppercase">Sales Management</h3>
      <div class="d-flex gap-2">
        <input v-model="search" type="text" class="form-control" placeholder="Search client or product">
        <button class="btn btn-outline-gold" @click="exportSales">
          <i class="bi bi-download me-2"></i> Export Sales
        </button>
      </div>
    </div>

    <!-- Filtres par statut -->
    <div class="mb-3">
      <button
        v-for="status in statuses"
        :key="status.value"
        @click="filterStatus = status.value"
        :class="['btn', filterStatus === status.value ? 'btn-gold' : 'btn-outline-gold', 'me-2']"
      >
        {{ status.label }}
      </button>
    </div>

    <!-- Statistiques rapides -->
    <div class="row g-4 mb-4">
      <div class="col-md-4" v-for="stat in stats" :key="stat.title">
        <div class="card shadow-sm p-3 h-100">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h6 class="text-muted small mb-1">{{ stat.title }}</h6>
              <h4 class="fw-bold">{{ stat.value }}</h4>
            </div>
            <i :class="stat.icon + ' fs-3 text-gold'"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Tableau des ventes -->
    <div class="card shadow-sm">
      <div class="table-responsive">
        <table class="table table-hover table-striped align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th>Client</th>
              <th>Product</th>
              <th>Date</th>
              <th>Status</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="sale in filteredSales"
              :key="sale.id"
            >
              <td>{{ sale.client }}</td>
              <td>{{ sale.product }}</td>
              <td>{{ sale.date }}</td>
              <td>
                <select v-model="sale.status" @change="updateStatus(sale)">
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td>{{ sale.quantity }}</td>
              <td>{{ sale.total }} DH</td>
              <td>
                <button class="btn btn-sm btn-outline-danger" @click="deleteSale(sale.id)">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useOrderStore } from '../../stores/orderStore';
import { exportOrdersService } from '../../services/exportService';

const orderStore = useOrderStore();
const search = ref('');
const filterStatus = ref('all');

const statuses = [
  { label: 'All', value: 'all' },
  { label: 'Paid', value: 'Paid' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Cancelled', value: 'Cancelled' },
];

onMounted(async () => {
  await orderStore.fetchOrders();
});

const allSales = computed(() => orderStore.orders);

// Statistiques rapides
const stats = computed(() => [
  { title: 'Total Sales', value: allSales.value.length, icon: 'bi bi-bag-check' },
  { title: 'Paid', value: allSales.value.filter(s => s.status === 'Paid').length, icon: 'bi bi-cash-stack' },
  { title: 'Pending', value: allSales.value.filter(s => s.status === 'Pending').length, icon: 'bi bi-hourglass-split' },
]);

const filteredSales = computed(() => {
  return allSales.value.filter(sale => {
    const matchesSearch = sale.client.toLowerCase().includes(search.value.toLowerCase())
      || sale.product.toLowerCase().includes(search.value.toLowerCase());
    const matchesStatus = filterStatus.value === 'all' || sale.status === filterStatus.value;
    return matchesSearch && matchesStatus;
  });
});

function exportSales() {
  exportOrdersService();
}

function updateStatus(sale) {
  orderStore.updateSaleStatus(sale.id, sale.status);
}

function deleteSale(id) {
  if (confirm('Are you sure you want to delete this sale?')) {
    orderStore.deleteSale(id);
  }
}
</script>

<style scoped>
.text-gold { color: #d4af37; }
.btn-outline-gold { border-color: #d4af37; color: #d4af37; transition: all 0.3s; }
.btn-outline-gold:hover { background-color: #d4af37; color: #fff; }
.btn-gold { background-color: #d4af37; color: #fff; }
.badge.bg-success { background-color: #28a745 !important; }
</style>
