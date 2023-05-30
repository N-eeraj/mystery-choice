<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const createChoices = () => {
    router.push('/create')
}
</script>

<template>
    <h1 class="text-sky-500 text-7xl">
        Home
    </h1>
    <button
        class="bg-red-500"
        @click="createChoices">
        Create
    </button>
</template>