<template>
  <div>
    <BarChart :chart-data="chartData" :chart-options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Import Vue Chart.js
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'vue-chartjs';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const BarChart = Bar;

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: 'Ventes par ville (DH)',
      data: [],
      backgroundColor: '#d4af37'
    }
  ]
});

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Ventes par ville'
    }
  }
});

// Charger les données depuis ton API
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/export/city_sales.php');
    const cities = response.data.map(item => item.city);
    const totals = response.data.map(item => parseFloat(item.total));

    chartData.value.labels = cities;
    chartData.value.datasets[0].data = totals;
  } catch (error) {
    console.error('Erreur lors du chargement des ventes par ville:', error);
  }
});
</script>
