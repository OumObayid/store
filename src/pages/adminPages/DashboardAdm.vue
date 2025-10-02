<template>
  <div class="dashboard-main container-fluid py-3">

    <!-- Export Button -->
    <div class="d-flex justify-content-end mb-4 flex-wrap gap-3">
      <button class="btn btn-outline-gold" @click="exportOrders">
        <i class="bi bi-download me-2"></i> Export Orders
      </button>
    </div>

    <!-- Main Stats -->
    <div class="row g-4 mb-4">
      <div class="col-md-6 col-lg-3" v-for="stat in stats" :key="stat.title">
        <router-link :to="`/admin/${stat.title.toLowerCase()}`" class="text-decoration-none">
          <div class="stat card card-clickable shadow-sm h-100 p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6 class="text-muted small mb-1 text-uppercase">{{ stat.title }}</h6>
                <h4 class="fw-bold">{{ stat.value }}</h4>
              </div>
              <i :class="stat.icon + ' fs-3 text-gold'"></i>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Categories & City Market Chart -->
    <div class="row g-4 mb-4">

      <!-- Categories -->
      <div class="col-lg-6 col-md-6 col-sm-12">
        <div class="card shadow-sm h-100 card-clickable">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h6 class="mb-0 fw-bold text-uppercase">Product Categories</h6>
            <router-link to="/admin/categories" class="btn btn-sm btn-outline-gold">See All</router-link>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li v-for="cat in categoriesWithCount" :key="cat.id"
                class="list-group-item d-flex justify-content-between align-items-center card-clickable">
                {{ cat.nom }}
                <span class="badge bg-gold text-dark rounded-pill">{{ cat.totalProducts }} products</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- City Market Chart -->
      <div class="col-lg-6 col-md-6 col-sm-12">
        <div class="card shadow-sm h-100">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h6 class="mb-0 fw-bold text-uppercase">City Market</h6>
          </div>
          <div class="card-body d-flex justify-content-center align-items-center" style="height: 300px;">
            <Doughnut :data="chartData" :options="chartOptions" />
          </div>
        </div>
      </div>

    </div>

    <!-- Latest Orders -->
    <div class="card shadow-sm">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h6 class="mb-0 fw-bold text-uppercase">Latest Orders</h6>
        <router-link to="/admin/orders" class="btn btn-sm btn-outline-gold">See All</router-link>
      </div>
      <div class="table-responsive">
        <table class="table table-hover table-striped align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sale in recentSalesLimited" :key="sale.id" class="table-row-clickable"
              @click="goToOrder(sale.id)">
              <td>{{ sale.client }}</td>
              <td>{{ sale.product }}</td>
              <td>{{ sale.date }}</td>
              <td>
                
                <span class="badge"
                  :class="sale.status.toLowerCase() === 'paid' || sale.status.toLowerCase() === 'payée' ? 'bg-success' : 'bg-secondary'">
                  {{ sale.status }}
                </span>

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
import { useRouter } from 'vue-router';
import { useAdminProductStore } from '../../stores/admin/adminProductStore';
import { useAdminCategorieStore } from '../../stores/admin/adminCategorieStore';
import { useOrderStore } from '../../stores/orderStore';
import { exportOrdersService } from "../../services/exportService";
import { fetchCitySales } from "../../services/cityService";

import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Doughnut } from "vue-chartjs";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const router = useRouter();

const productStore = useAdminProductStore();
const categoryStore = useAdminCategorieStore();
const orderStore = useOrderStore();

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: "City Sales",
      backgroundColor: ["#f39c12", "#e74c3c", "#2ecc71", "#3498db", "#9b59b6"],
      data: [],
    },
  ],
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: "bottom" },
  },
};
async function loadCityData() {
  const data = await fetchCitySales();
  if (data.length) {
    chartData.value = {
      labels: data.map(item => item.city),
      datasets: [{
        label: "City Sales",
        backgroundColor: ["#f39c12", "#e74c3c", "#2ecc71", "#3498db", "#9b59b6"],
        data: data.map(item => parseFloat(item.total)),
      }],
    };
  }
}

const productCount = computed(() => productStore.products?.length || 0);
const categoryCount = computed(() => categoryStore.categories?.length || 0);
const orderCount = computed(() => orderStore.orders?.length || 0);
const revenues = computed(() => orderStore.totalRevenue || 0);


const stats = computed(() => [
  { title: "Orders", value: orderCount.value, icon: "bi bi-bag-check" },
  { title: "Products", value: productCount.value, icon: "bi bi-box-seam" },
  { title: "Categories", value: categoryCount.value, icon: "bi bi-tags" },
  { title: "Revenue", value: revenues.value, icon: "bi bi-cash-coin" },
]);

const categoriesWithCount = computed(() =>
  categoryStore.categoriesWithProductsCount(productStore.products || []).slice(0, 6)
);

const recentSalesLimited = computed(() => orderStore.recentSales.slice(0, 4));

onMounted(async () => {
  await productStore.fetchAllProducts(); // <-- crucial
  await categoryStore.fetchAllCategories(); // ou la méthode correspondante
  await orderStore.fetchOrders();
  await orderStore.fetchRecentSales();
  await loadCityData();

});

function exportOrders() { exportOrdersService(); }

function goToOrder(orderId) {
  router.push(`/admin/orders/${orderId}`);
}
</script>

<style scoped>
.text-gold {
  color: #d4af37;
}

.bg-gold {
  background-color: #d4af37;
  color: #fff;
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

/* Clickable cards */
.card-clickable {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.card-clickable:hover {
  transform: translateY(-5px) scale(1.03);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
}

/* Stats hover */
.stat:hover {
  transform: scale(1.05);
}

/* Table row hover */
.table-row-clickable {
  cursor: pointer;
  transition: background 0.2s;
}

.table-row-clickable:hover {
  background-color: rgba(212, 175, 55, 0.1);
}
</style>
