<template>
  <footer class="footer bg-dark text-white py-3">
    <div class="container">
      <div class="row">

        <!-- Colonne 1: Logo & Description -->
        <div class="col-md-4 col-sm-12 mb-4 pb-0 d-flex flex-column justify-content-between">
          <h6 class="brand-name  text-center">{{ locale === 'fr' ? 'Mimaya' : 'ميمايا' }}</h6>
          <p class="footer-text text-center  mb-0"
            :class="{ 'text-md-start': locale === 'fr', 'text-md-end': locale === 'ar' }">
            {{ $t("welcomeToMimaya") }} {{ $t("footerDescription") }}
          </p>
        </div>

        <!-- Colonne 2: Liens rapides -->
        <div class="col-md-4 col-sm-6 mb-4 px-5">
          <h6 class="footer-title text-center">{{ $t("quickLinks") }}</h6>
          <ul class="list-unstyled">
            <div class="d-flex justify-content-between text-end">
              <div class="text-start">
                <li><router-link to="/" class="footer-link">{{ $t("home") }}</router-link></li>
                <li><router-link to="/products" class="footer-link">{{ $t("shop") }}</router-link></li>
              </div class="text-end">
              <div>
                <li><router-link to="/categories" class="footer-link">{{ $t("collections") }}</router-link></li>
                <li><router-link to="/about" class="footer-link">{{ $t("aboutUs") }}</router-link></li>
              </div>
            </div>
            <div class="text-center">
              <li><router-link to="/contact" class="footer-link">{{ $t("contact") }}</router-link></li>
            </div>

          </ul>
        </div>

        <!-- Colonne 3: Newsletter + Réseaux -->
        <div class="col-md-4 col-sm-6 mb-4 text-end  d-flex flex-column justify-content-between">
          <h6 class="footer-title text-center">{{ $t("stayConnected") }}</h6>
          <form class="newsletter-form d-flex mb-0 justify-content-center justify-content-md-end ">
            <input type="email" class="form-control mx-2" :placeholder="$t('yourEmail')" />
            <button type="submit" class="btn btn-outline-light">{{ $t("ok") }}</button>
          </form>

        </div>
        <div class="social-icons text-center">
          <a href="#" class="footer-link me-3"><i class="bi bi-facebook"></i></a>
          <a href="#" class="footer-link mx-3"><i class="bi bi-instagram"></i></a>
          <a href="#" class="footer-link mx-3"><i class="bi bi-twitter"></i></a>
          <a href="#" class="footer-link ms-3"><i class="bi bi-linkedin"></i></a>
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
        <p>© {{ currentYear }} {{ locale === 'fr' ? 'Mimaya' : 'ميمايا' }} - {{ $t("rightsReserved") }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { locale } = useI18n()
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer{
  background-color: #1E1E1E !important;
  border-top: 3px solid var(--gold);
}
.footer-title {
  color: var(--gold);
  font-weight: bold;
  margin-bottom: 1rem;
}

.brand-name {
  font-weight: bold;
  color: var(--gold);
  letter-spacing: 1px;
  display: block;
  padding: 0;

}

.footer-link {
  text-decoration: none;
  color: var(--grey-clear) !important;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: var(--gold) !important;
}

.footer-text,
p {
  color: var(--grey-clear);
  line-height: 1.6;
}

.newsletter-form input {
  border-radius: 20px;
  max-width: 250px;
}

.newsletter-form button {
  border-radius: 20px;
}

.social-icons a {
  font-size: 1.4rem;
}
</style>
