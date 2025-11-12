<template>
  <div class="container-fluid-md pt-3">
    <!-- Main Stats -->
    <div class="row g-4 mb-4">
      <div class="col-md-6 col-lg-3" v-for="stat in stats" :key="stat.title">
        <router-link
          :to="`/admin/${stat.route}`"
          class="text-decoration-none"
        >
          <div class="stat card card-clickable shadow-sm h-100 p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6 class="text-muted small mb-1 text-uppercase">
                  {{ stat.title }}
                </h6>
                <h5 class="fw-bold">{{ stat.value }}</h5>
              </div>
              <i :class="stat.icon + ' fs-3 text-gold'"></i>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Categories & City Market Chart -->
    <div class="row g-4 mb-4 d-flex justify-content-center">
      <!-- Categories -->
      <div class="col-lg-6 col-md-6 col-sm-12">
        <div class="card shadow-sm h-100">
          <div
            class="card-header d-flex justify-content-between align-items-center"
          >
            <span class="mb-0 fw-bold">{{ $t("productCategories") }}</span>
            <MyButton
              :onClick="() => router.push('/admin/categories')"
              classNm="outline px-2 py-1"
              >{{ $t("seeAll") }}</MyButton
            >
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li
                v-for="cat in categoriesWithCount"
                :key="cat.id"
                class="list-group-item align-items-center card-clickable"
              >
                <router-link
                  :to="`/categorie/${cat.id}`"
                  class="d-flex justify-content-between"
                >
                  {{ locale === "fr" ? cat.nom : cat.nom_ar }}
                  <span class="badge bg-gold text-dark rounded-pill"
                    >{{ cat.totalProducts }} {{ $t("products") }}</span
                  ></router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- Export Button -->
    <div
      class="d-flex justify-content-center justify-content-md-end mb-4 flex-wrap gap-3"
    >
      <MyButton classNm="py-1 outline" @click="exportToPDF">
        <i class="bi bi-download me-2"></i> {{ $t("exportOrders") }}
      </MyButton>
    </div>
    <!-- Latest Orders -->
    <div class="card shadow">
      <div
        class="card-header d-flex justify-content-between align-items-center"
      >
        <h6 class="mb-0 fw-bold">{{ $t("latestOrders") }}</h6>
        <MyButton
          :onClick="() => router.push('/admin/orders')"
          classNm="px-2 py-1 outline"
          >{{ $t("seeAll") }}</MyButton
        >
      </div>
      <!-- ✅ Version desktop -->
      <div class="table-responsive d-none d-md-block">
        <!-- 🖥️ Table Desktop -->
        <table class="table table-hover table-striped align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th>{{ $t("customer") }}</th>
              <th>{{ $t("products") }}</th>
              <th>{{ $t("date") }}</th>
              <th>{{ $t("status") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="sale in recentSalesLimited"
              :key="sale.id"
              class="table-row-clickable"
              @click="goToOrder(sale.id)"
            >
              <td>{{ sale.firstname }} {{ sale.lastname }}</td>
              <td>
                <ul class="mb-0">
                  <li v-for="item in sale.items" :key="item.id">
                    {{ locale === "fr" ? item.nom : item.nom_ar }}
                  </li>
                </ul>
              </td>
              <td>
                {{
                  new Date(sale.created_at).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                }}
              </td>

              <td>
                <span
                  class="badge text-capitalize"
                  :class="{
                    'bg-warning text-dark':
                      sale.status.toLowerCase() === 'pending',
                    'bg-info text-dark':
                      sale.status.toLowerCase() === 'processing',
                    'bg-success': sale.status.toLowerCase() === 'completed',
                    'bg-danger': sale.status.toLowerCase() === 'cancelled',
                  }"
                >
                  {{ $t(sale.status) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
   
      <!-- 📱 Version mobile en cartes -->
      <div class="d-block d-md-none">
        <div
          v-for="sale in recentSalesLimited"
          :key="sale.id"
          class="card my-4 border-0 shadow-sm"
          @click="goToOrder(sale.id)"
        >
          <div class="card-body">
            <!-- Nom du client -->
            <h6 class="fw-bold mb-2 text-dark">
              <i class="bi bi-person me-2 text-gold"></i>
              {{ sale.firstname }} {{ sale.lastname }}
            </h6>

            <hr class="my-2" />

            <!-- Produits -->
            <div class="mb-2">
              <ul class="ps-3 mb-0">
                <li
                  v-for="item in sale.items"
                  :key="item.id"
                  class="text-dark text-wrap"
                  style="line-height: 1.4"
                >
                  {{ locale === "fr" ? item.nom : item.nom_ar }}
                </li>
              </ul>
            </div>
            <div class="d-flex justify-content-between">
              <!-- Date -->
              <div class="mb-2">
                <span class="text-dark"
                  >le :
                  {{
                    new Date(sale.created_at).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  }}</span
                >
              </div>

              <!-- Statut -->
              <div>
                <span
                  class="badge px-3 py-2 text-capitalize"
                  :class="{
                    'bg-warning text-dark':
                      sale.status.toLowerCase() === 'pending',
                    'bg-info text-dark':
                      sale.status.toLowerCase() === 'processing',
                    'bg-success': sale.status.toLowerCase() === 'completed',
                    'bg-danger': sale.status.toLowerCase() === 'cancelled',
                  }"
                >
                  {{ sale.status }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
   
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import { useOrderStore } from "../../stores/orderStore";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { useProductStore } from "../../stores/productStore";
import { useCategorieStore } from "../../stores/categorieStore";
import { useI18n } from "vue-i18n";
import MyButton from "../../components/MyButton.vue";

const { t } = useI18n();

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const router = useRouter();

const productStore = useProductStore();
const categoryStore = useCategorieStore();
const orderStore = useOrderStore();
const { locale } = useI18n();

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

const productCount = computed(() => productStore.products?.length || 0);
const categoryCount = computed(() => categoryStore.categories?.length || 0);
const orderCount = computed(() => orderStore.orders?.length || 0);
const revenues = computed(() => orderStore.totalRevenue || 0);

const stats = computed(() => [
  {route: "orders", title: t("orders"), value: orderCount.value, icon: "bi bi-bag-check" },
  {route: "products", title: t("products"), value: productCount.value, icon: "bi bi-box-seam" },
  {route: "categories", title: t("categories"), value: categoryCount.value, icon: "bi bi-tags" },
  {
   route: "orders", title: t("revenues"),
    value: Number(revenues.value).toFixed(2),
    icon: "bi bi-cash-coin",
  },
]);

// Calculer le nombre de produits par catégorie directement dans le composable
const categoriesWithCount = computed(() => {
  const products = productStore.products || [];
  const categories = categoryStore.categories || [];

  // Construire un tableau avec { categoryId, name, count }
  const counts = categories.map((cat) => {
    const count = products.filter((p) => p.categorie_id === cat.id).length;
    return {
      id: cat.id,
      nom: cat.nom,
      nom_ar: cat.nom_ar,
      totalProducts: count,
    };
  });

  // Trier par count décroissant et prendre les 6 premiers
  return counts.sort((a, b) => b.count - a.count).slice(0, 6);
});
onMounted(() => {
  console.log("recentSalesLimited :", recentSalesLimited.value);
});
// Mettre à jour les données du graphique lorsque les commandes sont chargées
const recentSalesLimited = computed(() => {
  if (!orderStore.orders || !orderStore.orders.length) return [];

  // Trier les commandes par date décroissante (les plus récentes en premier)
  return [...orderStore.orders]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 4); // prendre seulement les 4 premières
});
const exportToPDF = () => {
  if (!recentSalesLimited.value || recentSalesLimited.value.length === 0) {
    console.warn("Aucune vente à exporter !");
    return;
  }

  const doc = new jsPDF("p", "pt");

  // Titre
  doc.setFontSize(16);
  doc.text(t("recentSales"), 40, 40);

  // Colonnes
  const tableHeaders = [t("customer"), t("products"), t("date"), t("status")];

  // Corps du tableau
  const tableBody = recentSalesLimited.value.map((sale) => [
    `${sale.firstname} ${sale.lastname}`,
    sale.items
      .map((item) => (locale.value === "fr" ? item.nom : item.nom_ar))
      .join("\n"),
    new Date(sale.created_at).toLocaleDateString(
      locale.value === "fr" ? "fr-FR" : "ar-EG"
    ),
    t(sale.status),
  ]);

  // Création de la table
  autoTable(doc, {
    head: [tableHeaders],
    body: tableBody,
    startY: 60,
    styles: {
      fontSize: 10,
      cellPadding: 6,
      valign: "middle",
    },
    headStyles: {
      fillColor: [245, 245, 245],
      textColor: [0, 0, 0],
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250],
    },
    columnStyles:
      locale.value === "ar"
        ? {
            0: { halign: "right" },
            1: { halign: "right" },
            2: { halign: "right" },
            3: { halign: "right" },
          }
        : {},
  });

  // Sauvegarde du PDF
  doc.save(`${t("recentSales")}.pdf`);
};

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
