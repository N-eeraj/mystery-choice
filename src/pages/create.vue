<script setup>
import { computed, onMounted, reactive } from 'vue'

import ChoiceGroup from '@components/choice/ChoiceGroup/index.vue'
import NewChoiceGroup from '@components/choice/ChoiceGroup/new.vue'

const maxChoiceGroups = 5
let currentGroupIndex = 0
let currentChoiceIndex = 0

const choiceGroups = reactive([])

const canAddChoiceGroup = computed(() => choiceGroups.length < maxChoiceGroups)
const canRemoveGroup = computed(() => choiceGroups.length > 1)

const getNewChoice = () => {
    return {
        id: currentChoiceIndex++,
        text: null
    }
}

const addNewChoiceGroup = () => {
    choiceGroups.push({
        id: ++currentGroupIndex,
        choices: [
            getNewChoice(),
            getNewChoice()
        ]
    })
}

const addChoice = index => choiceGroups[index].choices.push(getNewChoice())

const removeChoice = (index, choiceIndex) => {
    choiceGroups[index].choices.splice(choiceIndex, 1)
}

const updateChoice = (index, {index: choiceIndex, value}) => choiceGroups[index][choiceIndex] = value

onMounted(() => {
    addNewChoiceGroup()
})
</script>

<template>
    <div class="flex flex-col min-h-screen p-3 gap-5">
        <h1 class="w-full text-pink text-3xl text-center md:text-left font-semibold">
            Add Choices
        </h1>

        <div>
            <ChoiceGroup
                v-for="({id, choices}, index) in choiceGroups"
                :choices="choices"
                :can-remove-group="canRemoveGroup"
                :key="id"
                class="mt-5"
                @add-choice="addChoice(index)"
                @remove-choice="choiceIndex => removeChoice(index, choiceIndex)"
                @update-choice="value => updateChoice(index, value)" />

            <NewChoiceGroup
                v-if="canAddChoiceGroup"
                @click="addNewChoiceGroup" />
        </div>
    </div>
</template>