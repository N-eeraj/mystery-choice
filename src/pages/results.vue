<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { decode } from '@/composables/query'

const route = useRoute()

const choiceGroups = ref([])


onMounted(() => {
    choiceGroups.value = decode(route.query.choices)
})
</script>

<template>
    {{ choiceGroups }}
</template>