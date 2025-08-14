<template>
  <footer class="footer bg-dark text-white py-4">
    <div class="container">
      <div class="row">
        
        <!-- Colonne 1: Liens de navigation -->
        <div class="col-md-4 col-sm-12 mb-3">
          <h5 class="footer-title">Navigation</h5>
          <ul class="list-unstyled">
            <li><router-link to="/" class="footer-link">Accueil</router-link></li>
            <li><router-link to="/recherche" class="footer-link">Rechercher un établissement</router-link></li>
            <li><router-link to="/annonce" class="footer-link">Déposer une annonce</router-link></li>
            <li><router-link to="/support" class="footer-link">Aides & Supports</router-link></li>
          </ul>
        </div>

        <!-- Colonne 2: À propos -->
        <div class="col-md-4 col-sm-12 mb-3 text-center">
          <h5 class="footer-title">À propos de nous</h5>
          <p class="footer-text">
            Nous simplifions la permutation entre enseignants, offrant une plateforme fiable pour
            aider à la mobilité professionnelle dans l'éducation.
          </p>
        </div>

        <!-- Colonne 3: Contact -->
        <div class="col-md-4 col-sm-12 mb-3 text-end">
          <h5 class="footer-title">Contact</h5>
          <ul class="list-unstyled">
            <li><router-link to="/contact" class="footer-link">Contactez-nous</router-link></li>
            <li><a :href="`tel:${tel}`" class="footer-link">{{ tel }}</a></li>
            <li><a :href="`mailto:${email}`" class="footer-link">{{ email }}</a></li>
            <li>{{ adresse }}</li>
          </ul>
        </div>
      </div>

      <hr class="my-4">

      <!-- Liens politiques -->
      <div class="row">
        <div class="col-12 text-center d-flex flex-column flex-sm-row justify-content-center">
          <router-link to="/policy" class="footer-link me-0 me-sm-3 mb-2 mb-sm-0">
            Politique de confidentialité
          </router-link>
          <router-link to="/terms" class="footer-link">
            Conditions d'utilisation
          </router-link>
        </div>
      </div>

      <!-- Copyright -->
      <div class="text-center mt-3">
        <p class="copyright">Store &copy; {{ currentYear }} — Tous droits réservés — v1.0</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
const tel = "+212 6 12 34 56 78"
const email = "contact@exemple.com"
const adresse = "123 Rue Exemple, Ville, Maroc"
</script>

<!-- Styles spécifiques au footer -->
<style scoped>
.footer-title {
  color: var(--orange);
}

.footer-link {
  text-decoration: none;
  color: gray !important;
}

.footer-link:hover {
  color: var(--orange) !important;
}

.footer-text {
  color: #ccc;
  font-size: 0.95rem;
}
</style>
