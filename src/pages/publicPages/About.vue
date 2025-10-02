<template>
  <main class="about-page  text-light">
    <!-- HERO -->
    <section class="about-hero container py-5" style="transform: translateY(0px)">
      <div class="row align-items-center g-4">
        <Motion :initial="{ opacity: 0, y: 0, x: -100 }" v-bind="baseAnimation" class="col-lg-6 order-2 order-lg-1 ">
          <div>
            <h1 class=" fw-bold text-gold mb-3 text center">À propos de nous</h1>
            <p class="text-muted-dark text-start  mb-4">
              Élégance contemporaine, détails soignés et coupes flatteuses.<br />
              Nous créons des pièces qui subliment la féminité au quotidien.
            </p>
          </div>

          <div class="d-flex flex-wrap gap-3 mb-4">
            <span class="badge badge-soft-gold px-3 py-2">
              <i class="bi bi-gem me-2"></i> Élégance
            </span>
            <span class="badge badge-soft-gold px-3 py-2">
              <i class="bi bi-heart me-2"></i> Passion
            </span>
            <span class="badge badge-soft-gold px-3 py-2">
              <i class="bi bi-star me-2"></i> Qualité
            </span>
          </div>

          <div class="d-flex gap-3">
            <router-link to="/products" class="btn btn-gold">
              Découvrir la collection
            </router-link>
            <router-link to="/contact" class="btn btn-outline-gold">
              Nous contacter
            </router-link>
          </div>
        </Motion>

        <Motion :initial="{ opacity: 0, y: 0, x: 100 }" v-bind="baseAnimation"
          class="col-lg-6 order-1 order-lg-2 text-center">
          <div class="rounded-4 shadow d-inline-block">
            <img src="/images/about1.jpg" alt="Mode femme élégante" class="img-fluid shadow card" loading="lazy" />
          </div>
        </Motion>
      </div>
    </section>

    <!-- HISTOIRE -->
    <section class="container py-5">
      <div class="row align-items-center g-5">
        <Motion :initial="{ opacity: 0, y: 0, x: -100 }" v-bind="baseAnimation" class="col-md-6">
          <div class=" rounded-4 shadow">
            <img src="/images/about2.jpg" alt="Notre histoire" class="img-fluid shadow card" loading="lazy" />
          </div>
        </Motion>
        <Motion :initial="{ opacity: 0, y: 0, x: 100 }" v-bind="baseAnimation" class="col-md-6">
          <h1 class="text-gold mb-3">Notre histoire</h1>
          <p class="text-muted-dark text-end mb-3">
            Née d’un amour pour la couture et les matières nobles, notre maison
            propose des pièces intemporelles inspirées des podiums internationaux.
          </p>
          <p class="text-muted-dark text-end mb-0">
            Chaque collection est pensée à Casablanca par une équipe passionnée,
            avec une attention particulière portée aux finitions, au tombé et au confort.
          </p>
        </Motion>
      </div>
    </section>

    <!-- VALEURS (cartes) -->
    <section class="container py-5">
      <div class="text-center mb-5">
        <h1 class="text-gold">Nos valeurs</h1>
        <p class="text-muted-dark">
          Ce qui guide nos créations — pour vous offrir le meilleur.
        </p>
      </div>

      <div class="row g-4">
        <Motion :initial="{ opacity: 0, y: 80, x: 0 }" v-bind="baseAnimation" class="col-md-4">
          <div class="card card-dark h-100 rounded-4">
            <div class="card-body p-4">
              <i class="bi bi-gem fs-1 text-gold"></i>
              <h4 class="mt-3 text-gold">Élégance durable</h4>
              <p style="font-size: 18px;" class="text-light mb-0">
                Des coupes réfléchies et des tissus choisis pour durer dans le temps.
              </p>
            </div>
          </div>
        </Motion>

        <Motion :initial="{ opacity: 0, y: -80, x: 0 }" v-bind="baseAnimation" class="col-md-4">
          <div class="card card-dark h-100 rounded-4">
            <div class="card-body p-4">
              <i class="bi bi-scissors fs-1 text-gold"></i>
              <h4 class="mt-3 text-gold">Savoir-faire</h4>
              <p style="font-size: 18px;" class="text-light mb-0">
                Patronage précis, finitions nettes et contrôle qualité à chaque étape.
              </p>
            </div>
          </div>
        </Motion>

        <Motion :initial="{ opacity: 0, y: 80, x: 0 }" v-bind="baseAnimation" class="col-md-4">
          <div class="card card-dark h-100 rounded-4">
            <div class="card-body p-4">
              <i class="bi bi-heart fs-1 text-gold"></i>
              <h4 class="mt-3 text-gold">Confort & confiance</h4>
              <p style="font-size: 18px;" class="text-light mb-0">
                Des pièces qui épousent vos mouvements et valorisent votre silhouette.
              </p>
            </div>
          </div>
        </Motion>
      </div>
    </section>

    <!-- STATISTIQUES / PREUVES SOCIALES -->
    <section class="container py-5">
      <div class="row text-center g-4">
        <div class="col-6 col-md-3">
          <div class="stat">
            <div class="stat-number text-gold">+10k</div>
            <div class="stat-label text-muted-dark">Clientes satisfaites</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="stat">
            <div class="stat-number text-gold">2019</div>
            <div class="stat-label text-muted-dark">Depuis</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="stat">
            <div class="stat-number text-gold">72h</div>
            <div class="stat-label text-muted-dark">Prépa. & expédition</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="stat">
            <div class="stat-number text-gold">4.8/5</div>
            <div class="stat-label text-muted-dark">Note moyenne</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ENGAGEMENTS (liste) -->
    <section class="container py-5">
      <div class="row align-items-center g-5">
        <Motion :initial="{ opacity: 0, y: 0, x: -80 }" v-bind="baseAnimation" class="col-md-6 text start">
          <h1 class="text-gold mb-3">Nos engagements</h1>
          <ul class="list-unstyled m-0">
            <li class="d-flex align-items-start mb-3">
              <i class="bi bi-check2-circle me-3 fs-5 text-gold"></i>
              <span class="text-muted-dark">Stock contrôlé & tailles vraies.</span>
            </li>
            <li class="d-flex align-items-start mb-3">
              <i class="bi bi-check2-circle me-3 fs-5 text-gold"></i>
              <span class="text-muted-dark">Retours faciles sous 7 jours.</span>
            </li>
            <li class="d-flex align-items-start">
              <i class="bi bi-check2-circle me-3 fs-5 text-gold"></i>
              <span class="text-muted-dark">Support WhatsApp réactif.</span>
            </li>
          </ul>
        </Motion>
        <Motion :initial="{ opacity: 0, y: 0, x: 80 }" v-bind="baseAnimation" class="col-md-6">
          <div class=" rounded-4 shadow">
            <img src="/images/about3.jpg" alt="Atelier et détails" class="img-fluid shadow card" loading="lazy" />
          </div>
        </Motion>
      </div>
    </section>

    <!-- CTA -->
    <Motion :initial="{ opacity: 0, y: 100, x: 0 }" v-bind="baseAnimation" class="container py-5">
      <div
        class="cta-box rounded-4 p-4 p-md-5 d-flex flex-column flex-md-row align-items-center justify-content-between">
        <div class="mb-3 mb-md-0">
          <h3 class="mb-1 text-gold">Prêtes à briller ? ✨</h3>
          <p style="font-size: 18px;" class="text-light m-0">Découvrez les nouveautés chaque semaine.</p>
        </div>
        <router-link to="/products" class="btn btn-gold btn-lg">
          Voir les nouveautés
        </router-link>
      </div>
    </Motion>
  </main>
</template>

<script setup>
import { Motion } from "motion-v";

const baseAnimation = {
  whileInView: { opacity: 1, y: 0, x: 0 },
  transition: { duration: 1, easing: "ease-out" },
  inViewOptions: { once: true }
};
</script>

<style scoped>
/* Palette */
:root {
  --gold: #d4af37;
  --dark: #121212;
  /* plus sombre que bg-dark bootstrap */
  --muted: #b8b8b8;
  /* texte secondaire sur fond foncé */
}

.about-page {
  min-height: 100vh;

}

/* Couleurs utilitaires */
.text-gold {
  color: var(--gold) !important;
}

.text-muted-dark {
  color: var(--dark) !important;
  font-size: 18px !important;
}

.btn-gold {
  background-color: var(--gold);
  color: #111;
  font-weight: 600;
  border-radius: 14px;
  padding: 0.65rem 1.2rem;
  border: 2px solid var(--gold);

}

.btn-gold:hover {
  background: transparent;
  color: var(--gold);
}

.btn-outline-gold {
  border: 2px solid var(--gold);
  color: var(--gold);
  border-radius: 14px;
  padding: 0.6rem 1.1rem;
  background: transparent;
}

.btn-outline-gold:hover {
  background: var(--gold);
  color: #111;
}

/* Badges doux */
.badge-soft-gold {
  background: rgba(212, 175, 55, 0.12);
  color: var(--gold);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 999px;
}

/* Cartes sombres */
.card-dark {
  background: linear-gradient(135deg, rgba(212, 175, 55, .1), rgba(212, 175, 55, 0) 70%),
    #222;
  border: 1px solid #222;
  transition: transform .2s ease, box-shadow .2s ease;
  color: wheat;
}

.card-dark:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.35);
}


/* Hero image ratio & arrondis */
.hero-image img {
  display: block;
  width: 100%;
  height: auto;
}

/* Stats */
.stat-number {
  font-size: clamp(1.6rem, 2.5vw + 1rem, 2.4rem);
  font-weight: 800;
  letter-spacing: .5px;
}

/* CTA */
.cta-box {
  background:
    linear-gradient(135deg, rgba(212, 175, 55, .15), rgba(212, 175, 55, 0) 60%),
    #121212;
  border: 1px solid rgba(212, 175, 55, .25);
  box-shadow: 0 10px 40px rgba(0, 0, 0, .4);
}

/* Petites animations d’apparition */
.about-hero h1,
.about-hero p,
.card-dark,
.stat,
.cta-box {
  animation: fadeUp .6s ease both;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Accessibilité : focus visible sur fond sombre */
a:focus,
.btn:focus,
.btn:focus-visible {
  outline: 2px dashed var(--gold) !important;
  outline-offset: 3px;
}
</style>
