<template>
  <div class="dashboard-3d container py-4">
   
    <div class="row g-4">
      <!-- Carte Commandes -->
      <div class="col-md-6 col-lg-3">
        <div class="card card-3d shadow-lg">
          <div class="card-body text-center">
            <i class="bi bi-bag-check display-4 icon-3d"></i>
            <h5 class="card-title mt-3">{{ $t('dashboard.orders.title') }}</h5>
            <p class="card-text">{{ $t('dashboard.orders.text') }}</p>
            <router-link to="/dashboard/orders" class="btn btn-3d mt-3">
              {{ $t('dashboard.orders.btn') }}
            </router-link>
          </div>
        </div>
      </div>

      <!-- Carte Wishlist -->
      <div class="col-md-6 col-lg-3">
        <div class="card card-3d shadow-lg">
          <div class="card-body text-center">
            <i class="bi bi-heart-fill display-4 icon-3d"></i>
            <h5 class="card-title mt-3">{{ $t('dashboard.wishlist.title') }}</h5>
            <p class="card-text">{{ $t('dashboard.wishlist.text') }}</p>
            <router-link to="/dashboard/wishlist" class="btn btn-3d mt-3">
              {{ $t('dashboard.wishlist.btn') }}
            </router-link>
          </div>
        </div>
      </div>

      <!-- Carte Profil -->
      <div class="col-md-6 col-lg-3">
        <div class="card card-3d shadow-lg">
          <div class="card-body text-center">
            <i class="bi bi-person-circle display-4 icon-3d"></i>
            <h5 class="card-title mt-3">{{ $t('dashboard.profile.title') }}</h5>
            <p class="card-text">{{ $t('dashboard.profile.text') }}</p>
            <router-link to="/dashboard/profile" class="btn btn-3d mt-3">
              {{ $t('dashboard.profile.btn') }}
            </router-link>
          </div>
        </div>
      </div>

      <!-- Carte Support -->
      <div class="col-md-6 col-lg-3">
        <div class="card card-3d shadow-lg">
          <div class="card-body text-center">
            <i class="bi bi-headset display-4 icon-3d"></i>
            <h5 class="card-title mt-3">{{ $t('dashboard.support.title') }}</h5>
            <p class="card-text">{{ $t('dashboard.support.text') }}</p>
            <a href="#" class="btn btn-3d mt-3">
              {{ $t('dashboard.support.btn') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
/* Nouveau titre style "hero section" */
.title-wrapper {
  max-width: 800px;
  margin: auto;
}
.title-hero {
  font-size: 2.8rem;
  font-weight: 800;
  letter-spacing: -1px;
  text-transform: uppercase;
  background: linear-gradient(135deg, #787554, #cb9c11);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 3px 10px rgba(0,0,0,0.25);
}
.subtitle-hero {
  font-size: 1.2rem;
  color: #666;
  margin-top: 0.5rem;
}

/* Tes styles existants */
.card-3d {
  background: linear-gradient(145deg, #ffffff, #f1f1f1);
  border-radius: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  transform-style: preserve-3d;
}
.card-3d:hover {
  transform: scale(1.1);
  box-shadow: 0 25px 45px rgba(0,0,0,0.3);
}
.icon-3d {
  background: linear-gradient(135deg, #787554, #cb9c11);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.3));
}
.btn-3d {
  border-radius: 30px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #787554, #cb9c11);
  border: none;
  box-shadow: 4px 4px 10px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}
.btn-3d:hover {
  box-shadow: 6px 6px 14px rgba(0,0,0,0.4);
}
</style>
