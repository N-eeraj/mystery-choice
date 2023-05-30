<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const createChoices = () => {
    router.push('/create')
}
</script>

<template>
    <button @click="createChoices">
        Create Mystery
    </button>
</template>