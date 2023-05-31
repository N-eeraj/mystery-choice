<script setup>
import { computed, reactive } from 'vue'

import ChoiceGroup from '@components/choice/ChoiceGroup/index.vue'
import NewChoiceGroup from '@components/choice/ChoiceGroup/new.vue'

const maxChoiceGroups = 5

const choiceGroups = reactive([
    [null, null]
])

const canAddChoiceGroup = computed(() => choiceGroups.length < maxChoiceGroups)

const addNewChoiceGroup = () => {
    choiceGroups.push([null, null])
}

const addChoice = index => {
    choiceGroups[index].push(null)
}
</script>

<template>
    <div class="flex flex-col min-h-screen p-3 gap-5">
        <h1 class="w-full text-pink text-3xl text-center md:text-left font-semibold">
            Add Choices
        </h1>

        <div>
            <ChoiceGroup
                v-for="(choices, index) in choiceGroups"
                :choices="choices"
                :key="index"
                @new-choice="addChoice(index)" />

            <NewChoiceGroup
                v-if="canAddChoiceGroup"
                @click="addNewChoiceGroup" />
        </div>
    </div>
</template>