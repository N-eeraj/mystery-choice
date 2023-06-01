<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import Choice from '@components/choice/index.vue'

const route = useRoute()

const choiceGroups = ref([])
const currentChoiceGroup = ref(0)

const currentChoices = computed(() => {
    if (!choiceGroups.value.length)
        return null
    return choiceGroups.value[currentChoiceGroup.value].choices
})

const getTheme = () => currentChoiceGroup.value % 2 ? 'blue' : 'pink'

onMounted(() => {
    choiceGroups.value = JSON.parse(atob(route.query.choices))
})
</script>

<template>
    <h1 class="text-sky-500 text-7xl">
        Choose
    </h1>

    <Choice
        v-for="({id, text}, index) in currentChoices"
        :text="text"
        :theme="getTheme()"
        read-only
        :key="id" />
</template>