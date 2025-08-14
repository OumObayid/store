<template>
    <div v-if="loading">
        Chargement...
    </div>
    <div v-else-if="error">
        {{ error }}
    </div>
    <div v-else>
        {{ message }}
    </div>
</template>

<script setup>

import { onMounted } from 'vue';
import { useAuth } from '../../composables/useAuth';
import { useRoute } from 'vue-router'

const { message, error, loading, verifieEmailConfirmToken } = useAuth();

const route = useRoute()
const token = route.query.token

const data = {
    token: token
}



onMounted(() => {
    console.log('token vue:', token);

    verifieEmailConfirmToken(data);
})


</script>

<style lang="scss" scoped></style>