<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import Choice from '@components/choice/index.vue'

import { encode, decode } from '@/composables/query'

const route = useRoute()

const choiceGroups = ref([])
const currentChoiceGroup = ref(0)

const currentChoices = computed(() => {
    if (!choiceGroups.value.length)
        return null
    return choiceGroups.value[currentChoiceGroup.value].choices
})

const getTheme = computed(() => currentChoiceGroup.value % 2 ? 'blue' : 'pink')

const pickChoice = index => {
    choiceGroups.value[currentChoiceGroup.value].selected = index
    if (currentChoiceGroup.value < choiceGroups.value.length - 1)
        return currentChoiceGroup.value++
    encode(choiceGroups.value)
}

onMounted(() => {
    choiceGroups.value = decode(route.query.choices)
})
</script>

<template>
    <div class="flex flex-col items-center max-w-7xl min-h-screen m-auto p-3 gap-5">
        <h1 class="w-full text-blue text-3xl text-center md:text-left font-semibold">
            Pick One Card
        </h1>

        <div class="flex flex-col md:flex-row justify-evenly items-center gap-3 flex-1 w-full">
            <Choice
                v-for="({id, text}, index) in currentChoices"
                :text="text"
                :theme="getTheme"
                read-only
                :key="id"
                class="cursor-pointer hover:animate-pulse"
                @click="pickChoice(index)" />
        </div>
    </div>
</template>