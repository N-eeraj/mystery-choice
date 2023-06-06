<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Choice from '@components/choice/index.vue'

import { decode } from '@/composables/query'

const route = useRoute()
const router = useRouter()

const choiceGroups = ref([])
const currentEvent = ref(0)
const reveal = ref(false)

const getTheme = index => index % 2 ? 'pink' : 'blue'

const currentChoiceGroup = computed(() => choiceGroups.value[currentEvent.value])
const showNext = computed(() => (choiceGroups.value.length - 1 !== currentEvent.value) && reveal.value)

const nextEvent = () => {
    currentEvent.value++
    reveal.value = false
    dramaticReveal()
}

const choiceAnimation = subIndex => {
    if (!reveal.value)
        return 'animate-pulse'
    return subIndex !== currentChoiceGroup.value.selected && 'animate-pulse'
}

const dramaticReveal = () => setTimeout(() => {
    reveal.value = true
}, 5000);

onMounted(() => {
    try {
        choiceGroups.value = decode(route.query.choices)
        dramaticReveal()
    }
    catch {
        router.push('/page-not-found')
    }
})
</script>

<template>
    <div class="flex flex-col items-center max-w-7xl min-h-screen m-auto p-3 gap-5">
        <h1 class="w-full text-pink text-3xl text-center md:text-left font-semibold">
            Results
        </h1>

        <div
            v-if="currentChoiceGroup"
            class="flex flex-col justify-center items-start gap-y-5 flex-1 w-full">

            <strong class="text-3xl">
                {{ currentChoiceGroup.event }}
            </strong>

            <div class="flex flex-col md:flex-row items-center gap-3 w-full">
                <Choice
                    v-for="({id, text}, subIndex) in currentChoiceGroup.choices"
                    :text="text"
                    :theme="getTheme(currentEvent)"
                    :reveal="reveal"
                    read-only
                    :not-selected="subIndex !== currentChoiceGroup.selected"
                    :class="choiceAnimation(subIndex)"
                    :key="id" />
            </div>

            <button
                v-show="showNext"
                class="self-end py-1 px-6 bg-white text-black rounded-3xl border-2 border-black duration-300 hover:bg-black hover:text-white"
                @click="nextEvent">
                Next
            </button>
        </div>
    </div>
</template>