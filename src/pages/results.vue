<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import Choice from '@components/choice/index.vue'

import { decode } from '@/composables/query'

const route = useRoute()

const choiceGroups = ref([])

const getTheme = index => index % 2 ? 'pink' : 'blue'

onMounted(() => {
    choiceGroups.value = decode(route.query.choices)
})
</script>

<template>
    <div class="flex flex-col items-center max-w-7xl min-h-screen m-auto p-3 gap-5">
        <h1 class="w-full text-pink text-3xl text-center md:text-left font-semibold">
            Results
        </h1>

        <div
            v-for="({event, choices, selected}, index) in choiceGroups"
            class="w-full">

            <strong>
                {{ event }}
            </strong>

            <div class="flex flex-col md:flex-row items-center gap-3 flex-1 w-full">
                <Choice
                    v-for="({id, text}, subIndex) in choices"
                    :text="text"
                    :theme="getTheme(index)"
                    reveal
                    read-only
                    :not-selected="subIndex !== selected"
                    :key="id" />
            </div>
        </div>
    </div>
</template>