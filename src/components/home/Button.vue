<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const createChoices = () => {
    router.push('/create')
}
</script>

<template>
    <button
        class="relative py-1 md:py-2 px-3 md:px-5 bg-blue text-white rounded-3xl font-medium border-2 border-blue duration-300 hover:bg-white hover:text-blue hover:border-blue"
        @click="createChoices">
        Create Mystery
    </button>
</template>