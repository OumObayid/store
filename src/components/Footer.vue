<template>
  <footer class="footer bg-dark text-white py-5">
    <div class="container">
      <div class="row">
        
        <!-- Colonne 1: Logo & Description -->
        <div class="col-md-4 col-sm-12 mb-4">
          <h4 class="brand-name">Mimaya</h4>
          <p class="footer-text">
          {{ $t("footerDescription") }} 
          </p>
        </div>

        <!-- Colonne 2: Liens rapides -->
        <div class="col-md-4 col-sm-6 mb-4">
          <h5 class="footer-title">{{ $t("quickLinks") }}</h5>
          <ul class="list-unstyled">
            <li><router-link to="/" class="footer-link">{{ $t("home") }}</router-link></li>
            <li><router-link to="/boutique" class="footer-link">{{ $t("shop") }}</router-link></li>
            <li><router-link to="/nouveautes" class="footer-link">{{ $t("newArrivals") }}</router-link></li>
            <li><router-link to="/contact" class="footer-link">{{ $t("contact") }}</router-link></li>
          </ul>
        </div>

        <!-- Colonne 3: Newsletter + Réseaux -->
        <div class="col-md-4 col-sm-6 mb-4">
          <h5 class="footer-title">{{ $t("stayConnected") }}</h5>
          <form class="newsletter-form d-flex mb-3">
            <input type="email" class="form-control mx-2" :placeholder=" $t('yourEmail') " />
            <button type="submit" class="btn btn-outline-light">{{ $t("ok") }}</button>
          </form>
          <div class="social-icons">
            <a href="#" class="footer-link "><i class="bi bi-facebook"></i></a>
            <a href="#" class="footer-link mx-3"><i class="bi bi-instagram"></i></a>
            <a href="#" class="footer-link"><i class="bi bi-tiktok"></i></a>
          </div>
        </div>
      </div>

      <hr class="my-4">

      <!-- Politique & Copyright -->
      <div class="row">
        <div class="col-12 text-center d-flex flex-column flex-sm-row justify-content-center">
          <router-link to="/policy" class="footer-link me-0 me-sm-3 mb-2 mb-sm-0 mx-2">
            {{ $t("privacyPolicy") }}
          </router-link>
          <router-link to="/terms" class="footer-link">
            {{ $t("termsConditions") }}
          </router-link>
        </div>
      </div>

      <div class="text-center mt-3">
        <p class="copyright">© {{ currentYear }} Mimaya — {{ $t("rightsReserved") }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer-title {
  color: var(--gold);
  font-weight: bold;
  margin-bottom: 1rem;
}

.brand-name {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--gold);
  font-family: 'Playfair Display', serif;
  letter-spacing: 1px;
}

.footer-link {
  text-decoration: none;
  color: #bbb !important;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: var(--gold) !important;
}

.footer-text {
  color: #ccc;
  font-size: 0.95rem;
  line-height: 1.6;
}

.newsletter-form input {
  border-radius: 20px;
}

.newsletter-form button {
  border-radius: 20px;
}

.social-icons a {
  font-size: 1.4rem;
}
</style>
