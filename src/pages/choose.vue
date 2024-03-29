<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Choice from '@components/choice/index.vue'

import { encode, decode } from '@/composables/query'
import { shareLink } from '@/composables/share.js'

const route = useRoute()
const router = useRouter()

const choiceGroups = ref([])
const currentChoiceGroup = ref(0)
const completed = ref(false)

const currentChoices = computed(() => {
    if (!choiceGroups.value.length)
        return null
    return choiceGroups.value[currentChoiceGroup.value].choices
})

const getTheme = computed(() => currentChoiceGroup.value % 2 ? 'pink' : 'blue')

const shareResults = () => {
    const path = 'results'
    const query = {
        name: 'choices',
        value: encode(choiceGroups.value)
    }
    const shareData = {
        title: 'Mystery Choice',
        text: 'Check out my choices'
    }
    shareLink({path, query, shareData})
}

const pickChoice = index => {
    choiceGroups.value[currentChoiceGroup.value].selected = index
    if (currentChoiceGroup.value < choiceGroups.value.length - 1)
        return currentChoiceGroup.value++
    completed.value = true
    shareResults()
}

onMounted(() => {
    try {
        choiceGroups.value = decode(route.query.choices)
    }
    catch {
        router.push('/page-not-found')
    }
})
</script>

<template>
    <div class="flex flex-col items-center max-w-7xl min-h-screen m-auto p-3 gap-5">
        <h1 class="w-full text-blue text-3xl text-center md:text-left font-semibold">
            Pick One Card
        </h1>

        <div
            v-if="!completed"
            class="flex flex-col md:flex-row justify-evenly items-center gap-3 flex-1 w-full">
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