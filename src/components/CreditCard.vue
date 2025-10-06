<template>
    <div class="cc-wrapper" :class="{ flipped: isCvcFocused }" aria-hidden="false">
        <div class="cc-card">
            <!-- FRONT -->
            <div class="cc-face cc-front">
                <img class="cc-logo" src="/images/MasterCard_Logo.png"
                    alt="brand" />

                <div class="cc-number" :title="formattedNumberString">
                    <!-- render groups as spans to avoid wrapping -->
                    <span v-for="(g, i) in formattedGroups" :key="i" class="grp">{{ g }}</span>
                </div>

                <div class="cc-bottom">
                    <div class="cc-name">
                        <label>Card Holder</label>
                        <div class="value">{{ displayName }}</div>
                    </div>

                    <div class="cc-expiry">
                        <label>Expires</label>
                        <div class="value">{{ formattedExpiry }}</div>
                    </div>
                </div>
            </div>

            <!-- BACK -->
            <div class="cc-face cc-back" aria-hidden="true">

                <div class="magnetic"></div>
               
                <div class="m-0 px-1">
                    <label class="float-end me-4">CVC</label>
                </div>
                <div class="cvc-row">
                    <div class="bg-light"><img class="cc-logo-back"
                    src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="brand" /></div>
                    <div class="cvc-box">
                        <div class="cvc-value">{{ displayCvc }}</div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    number: { type: String, default: '' },
    name: { type: String, default: '' },
    expiry: { type: String, default: '' },
    cvc: { type: String, default: '' },
    focused: { type: String, default: null }, // 'number'|'name'|'expiry'|'cvc'
    mask: { type: Boolean, default: false }, // si tu veux masquer tout sauf derniers 4
})

/* flip when cvc focused */
const isCvcFocused = computed(() => props.focused === 'cvc')

/* normalized digits only */
const digitsOnly = (s = '') => (s || '').toString().replace(/\D/g, '')

/* formatted groups of card number (Amex treated 4-6-5) */
const formattedGroups = computed(() => {
    const n = digitsOnly(props.number)
    if (!n) return ['••••', '••••', '••••', '••••']
    // Amex pattern 4-6-5
    if (/^3[47]/.test(n)) {
        const g1 = n.slice(0, 4).padEnd(4, '•')
        const g2 = n.slice(4, 10).padEnd(6, '•')
        const g3 = n.slice(10, 15).padEnd(5, '•')
        return [g1, g2, g3]
    }
    // default groups of 4 up to 4 groups
    const groups = []
    for (let i = 0; i < 16; i += 4) {
        const part = n.slice(i, i + 4)
        groups.push(part ? part.padEnd(4, '•') : '••••')
    }
    // option mask -> show only last group
    if (props.mask && n.length >= 4) {
        const last = n.slice(-4).padStart(4, '•')
        return groups.map((g, i) => i === groups.length - 1 ? last : '••••')
    }
    return groups
})

const formattedNumberString = computed(() => formattedGroups.value.join(' '))

/* formatted expiry to MM/YY */
const formattedExpiry = computed(() => {
    const raw = (props.expiry || '').toString().trim()
    if (!raw) return 'MM/YY'
    // accept MMYY or MM/YY or MM-YY
    const digits = digitsOnly(raw)
    if (digits.length === 4) {
        return digits.slice(0, 2) + '/' + digits.slice(2, 4)
    }
    if (/^\d{2}\/\d{2}$/.test(raw)) return raw
    // partial input handling
    if (digits.length <= 2) return digits
    return digits.slice(0, 2) + '/' + digits.slice(2, 4)
})

const displayName = computed(() => props.name ? props.name.toUpperCase() : 'FULL NAME')
const displayCvc = computed(() => {
    if (!props.cvc) return props.focused === 'cvc' ? (props.cvc || '') : '•••'
    return props.cvc.replace(/\D/g, '').padEnd(props.cvc.length <= 3 ? 3 : 4, '•')
})
</script>

<style scoped>
/* wrapper + 3D card */
.cc-wrapper {
    width: 340px;
    max-width: 100%;
    perspective: 1200px;
    margin: 0 auto;
    font-family: Inter, Roboto, sans-serif;
}

.cc-card {
    width: 100%;
    height: 200px;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.65s cubic-bezier(.2, .85, .25, 1);
}

/* when flipped rotate the whole card */
.cc-wrapper.flipped .cc-card {
    transform: rotateY(180deg);
}

/* face common */
.cc-face {
    position: absolute;
    inset: 0;
    border-radius: 16px;
    backface-visibility: hidden;
    color: #fff;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    padding: 18px;
    box-sizing: border-box;
}

/* front style (MasterCard-ish gradient) */
.cc-front {
background: linear-gradient(135deg,#0f1724 0%, #0b3a66 60%, #0b5a90 100%);    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

/* back style */
.cc-back {
    transform: rotateY(180deg);
    background: linear-gradient(135deg, #222, #111);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
}

/* logo */
.cc-logo {
    width: 64px;
    height: auto;
    float: right;
    object-fit: contain;
    filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.25));
}

/* card number: render groups as inline blocks, prevent wrapping */
.cc-number {
    display: flex;
    justify-content: center;
    gap: 10px;
    align-items: center;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 8px;
    margin-bottom: 8px;
    /* clamp font size so it never wraps */
    font-family: 'Courier New', monospace;
    font-weight: 700;
    font-size: clamp(1rem, 3.4vw, 1.25rem);
    letter-spacing: 2px;
}

/* each group must not shrink to force single-line layout */
.cc-number .grp {
    display: inline-block;
    min-width: calc((100% - 30px) / 4);
    /* helps keep groups spaced */
    text-align: center;
    flex: 0 0 auto;
}

/* bottom row */
.cc-bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 12px;
}

.cc-name label,
.cc-expiry label {
    font-size: 10px;
    opacity: 0.85;
}

.cc-name .value,
.cc-expiry .value {
    font-weight: 700;
    font-size: 0.95rem;
    margin-top: 6px;
}

/* back specifics */
.magnetic {
    height: 44px;
    background: #3c3a3a;
    margin-top: 12px;
    border-radius: 4px;
}

.cvc-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    width: 100%;
}

.signature {
    flex: 1;
    height: 40px;
    background: #e9e9e9;
    border-radius: 4px;
    margin-right: 12px;
}

.cvc-box {
    width: 86px;
    text-align: center;
}

.cvc-box label {
    font-size: 10px;
    color: #ccc;
    display: block;
    margin-bottom: 6px;
}

.cvc-value {
    background: #fff;
    color: #000;
    padding: 8px 6px;
    border-radius: 6px;
    font-weight: 700;
    height: 40px;
}

/* logo on back */
.cc-logo-back {
    width: 56px;
    object-fit: contain;
    align-self: flex-end;
    opacity: 0.95;
}

/* accessibility */
.cc-face:focus {
    outline: none;
}

/* responsive tweaks */
@media (max-width:420px) {
    .cc-wrapper {
        width: 300px;
    }

    .cc-card {
        height: 180px;
    }

    .cc-number {
        font-size: 1rem;
        gap: 8px;
    }
}
</style>
