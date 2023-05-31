<script setup>
import { computed, onMounted, reactive } from 'vue'

import ChoiceGroup from '@components/choice/ChoiceGroup/index.vue'
import NewChoiceGroup from '@components/choice/ChoiceGroup/New.vue'
import ShareChoices from '@components/choice/Share.vue'

const maxChoiceGroups = 5
let currentGroupIndex = 0
let currentChoiceIndex = 0

const choiceGroups = reactive([])

const canAddChoiceGroup = computed(() => choiceGroups.length < maxChoiceGroups)
const canRemoveGroup = computed(() => choiceGroups.length > 1)
const getNewColor = computed(() => choiceGroups.length % 2 ? 'pink' : 'blue')
const getSaveColor = computed(() => choiceGroups.length % 2 ? 'blue' : 'pink')

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

const getColor = index => index % 2 ? 'pink' : 'blue'

const addChoice = index => choiceGroups[index].choices.push(getNewChoice())

const removeChoice = (index, choiceIndex) => choiceGroups[index].choices.splice(choiceIndex, 1)

const removeChoiceGroup = index => choiceGroups.splice(index, 1)

const updateChoice = (index, {index: choiceIndex, value}) => choiceGroups[index][choiceIndex] = value

const handleShare = () => {
    console.log(choiceGroups)
}

onMounted(() => {
    addNewChoiceGroup()
})
</script>

<template>
    <div class="flex flex-col items-center min-h-screen p-3 gap-5">
        <h1 class="w-full text-pink text-3xl text-center md:text-left font-semibold">
            Add Choices
        </h1>

        <div class="w-full">
            <ChoiceGroup
                v-for="({id, choices}, index) in choiceGroups"
                :choices="choices"
                :can-remove-group="canRemoveGroup"
                :theme="getColor(index)"
                :key="id"
                class="mt-5"
                @add-choice="addChoice(index)"
                @remove-choice="choiceIndex => removeChoice(index, choiceIndex)"
                @remove-choice-group="removeChoiceGroup(index)"
                @update-choice="value => updateChoice(index, value)" />
            </div>

            <NewChoiceGroup
                v-if="canAddChoiceGroup"
                :theme="getNewColor"
                @click="addNewChoiceGroup" />

            <ShareChoices
                :theme="getSaveColor"
                @share="handleShare" />
    </div>
</template>