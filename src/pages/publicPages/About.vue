<template>
  <main class="about-page text-light py-5 p-md-0 mx-3">
    <!-- HERO -->
    <section class="about-hero container py-5" style="transform: translateY(0px)">
      <div class="row align-items-center g-4">
        <Motion :initial="{ opacity: 0, y: 0, x: -100 }" v-bind="baseAnimation" class="col-lg-6 order-2 order-lg-1">
          <div>
            <h4
              :style="locale === 'fr' ? { borderLeft: '4px solid var(--bs-warning)' } : { borderRight: '4px solid var(--bs-warning)' }"
              class="fw-bold  mb-5 text-center">{{ t("about.hero_title") }}</h4>
            <p class="text-muted-dark text-center mb-4">{{ t("about.hero_description") }}</p>
          </div>

          <div class="d-flex flex-wrap gap-3 mb-4 justify-content-center">
            <span class="badge badge-soft-gold px-3 py-2">
              <i class="bi bi-gem me-2"></i> {{ t("about.badge1") }}
            </span>
            <span class="badge badge-soft-gold px-3 py-2">
              <i class="bi bi-heart me-2"></i> {{ t("about.badge2") }}
            </span>
            <span class="badge badge-soft-gold px-3 py-2">
              <i class="bi bi-star me-2"></i> {{ t("about.badge3") }}
            </span>
          </div>

          <div class="mt-5 d-md-flex gap-3 justify-content-between">
            <MyButton classNm="w-75 w-md-50 mb-4 py-1" :onClick="() => router.push('/products')">
              {{ t("about.cta_products") }}
            </MyButton>

            <MyButton  classNm="outline w-75 w-md-50 mb-4 py-1" :onClick="() => router.push('/contact')">
              {{ t("about.cta_contact") }}
            </MyButton>
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
          <div class="rounded-4 shadow">
            <img src="/images/about2.jpg" alt="Notre histoire" class="img-fluid shadow card" loading="lazy" />
          </div>
        </Motion>
        <Motion :initial="{ opacity: 0, y: 0, x: 100 }" v-bind="baseAnimation" class="col-md-6">
          <h4
            :style="locale === 'fr' ? { borderLeft: '4px solid var(--bs-warning)' } : { borderRight: '4px solid var(--bs-warning)' }"
            class=" mb-5">{{ t("about.history_title") }}</h4>
          <p class="text-muted-dark text-end mb-3">{{ t("about.history_paragraph1") }}</p>

        </Motion>
      </div>
    </section>

    <!-- VALEURS (cartes) -->
    <section class="container py-5">
      <div class="text-center mb-5">
        <h4
          :style="locale === 'fr' ? { borderLeft: '4px solid var(--bs-warning)' } : { borderRight: '4px solid var(--bs-warning)' }"
          class=" mb-5">{{ t("about.values_title") }}</h4>
        <p class="text-muted-dark">{{ t("about.values_description") }}</p>
      </div>

      <div class="row g-4">
        <Motion :initial="{ opacity: 0, y: 80, x: 0 }" v-bind="baseAnimation" class="col-md-4">
          <div class="card card-dark h-100 rounded-4">
            <div class="card-body d-flex flex-column p-4">
              <i class="bi bi-gem fs-1 text-olive"></i>
              <h4 class="mt-3 ">{{ t("about.value1_title") }}</h4>
              <p style="font-size: 18px;" class="text-light mb-0">{{ t("about.value1_desc") }}</p>
            </div>
          </div>
        </Motion>

        <Motion :initial="{ opacity: 0, y: -80, x: 0 }" v-bind="baseAnimation" class="col-md-4">
          <div class="card card-dark h-100 rounded-4">
            <div class="card-body d-flex flex-column p-4">
              <i class="bi bi-scissors fs-1 text-olive"></i>
              <h4 class="mt-3 ">{{ t("about.value2_title") }}</h4>
              <p style="font-size: 18px;" class="text-light mb-0">{{ t("about.value2_desc") }}</p>
            </div>
          </div>
        </Motion>

        <Motion :initial="{ opacity: 0, y: 80, x: 0 }" v-bind="baseAnimation" class="col-md-4">
          <div class="card card-dark h-100 rounded-4">
            <div class="card-body d-flex flex-column p-4">
              <i class="bi bi-heart fs-1 text-olive"></i>
              <h4 class="mt-3 ">{{ t("about.value3_title") }}</h4>
              <p style="font-size: 18px;" class="text-light mb-0">{{ t("about.value3_desc") }}</p>
            </div>
          </div>
        </Motion>
      </div>
    </section>

    <!-- STATISTIQUES -->
    <section class="container py-5">
      <div class="row text-center g-4">
        <div class="col-6 col-md-3">
          <div class="stat">
            <div class="stat-number text-olive">+10k</div>
            <div class="stat-label text-muted-dark">{{ t("about.stat1") }}</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="stat">
            <div class="stat-number text-olive">2019</div>
            <div class="stat-label text-muted-dark">{{ t("about.stat2") }}</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="stat">
            <div class="stat-number text-olive">72h</div>
            <div class="stat-label text-muted-dark">{{ t("about.stat3") }}</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="stat">
            <div class="stat-number text-olive">4.8/5</div>
            <div class="stat-label text-muted-dark">{{ t("about.stat4") }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ENGAGEMENTS -->
    <section class="container py-5">
      <div class="row align-items-center g-5">
        <Motion :initial="{ opacity: 0, y: 80, x: 0 }" v-bind="baseAnimation" class="col-md-6 text-start">
          <div class="text-center">
            <h4
              :style="locale === 'fr' ? { borderLeft: '4px solid var(--bs-warning)' } : { borderRight: '4px solid var(--bs-warning)' }"
              class=" mb-5">{{ t("about.commitments_title") }}</h4>
          </div>

          <ul class="list-unstyled m-0">
            <li class="d-flex align-items-start mb-3">
              <i class="bi bi-check2-circle me-3 fs-5 text-olive"></i>
              <span class="text-muted-dark">{{ t("about.commitment1") }}</span>
            </li>
            <li class="d-flex align-items-start mb-3">
              <i class="bi bi-check2-circle me-3 fs-5 text-olive"></i>
              <span class="text-muted-dark">{{ t("about.commitment2") }}</span>
            </li>
            <li class="d-flex align-items-start">
              <i class="bi bi-check2-circle me-3 fs-5 text-olive"></i>
              <span class="text-muted-dark">{{ t("about.commitment3") }}</span>
            </li>
          </ul>
        </Motion>
        <Motion :initial="{ opacity: 0, y: 80, x: 0 }" v-bind="baseAnimation" class="col-md-6">
          <div class="rounded-4 shadow">
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
          <h4
            :style="locale === 'fr' ? { borderLeft: '4px solid var(--bs-warning)' } : { borderRight: '4px solid var(--bs-warning)' }"
            class="mb-1 ">{{ t("about.cta_ready") }}</h4>
          <p style="font-size: 18px;" class="text-light m-0">{{ t("about.cta_description") }}</p>
        </div>
        <MyButton class="py-1" :onClick="() => router.push('/products')">
          {{ t("about.cta_button") }}
        </MyButton>

      </div>
    </Motion>
  </main>
</template>

<script setup>
import { Motion } from "motion-v";
import { useI18n } from "vue-i18n";
import MyButton from "../../components/MyButton.vue";
import { useRouter } from 'vue-router'
const router = useRouter()
const { t, locale } = useI18n();
const baseAnimation = {
  whileInView: { opacity: 1, y: 0, x: 0 },
  transition: { duration: 1, easing: "ease-out" },
  inViewOptions: { once: true }
};


</script>

<style scoped>
.about-page {
  min-height: 100vh;

}



.text-muted-dark {
  color: var(--dark) !important;
  font-size: 16px !important;
}

.text-olive{
color: var(--vert-olive-fonce);
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
