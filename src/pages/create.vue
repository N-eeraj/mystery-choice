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
        text: ''
    }
}

const addNewChoiceGroup = () => {
    choiceGroups.push({
        id: ++currentGroupIndex,
        event: '',
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

const updateChoiceEvent = (index, value) => choiceGroups[index].event = value

const updateChoice = (index, {index: choiceIndex, value}) => choiceGroups[index].choices[choiceIndex].text = value

const handleCopyLink = url => {
    const dummy = document.createElement('textarea')
    document.body.appendChild(dummy)
    dummy.value = url
    dummy.select()
    document.execCommand('copy')
    document.body.removeChild(dummy)
    alert('Copied Link')
}

const handleShare = async () => {
    const query = btoa(JSON.stringify(choiceGroups))
    const url = `${window.location.host}${import.meta.env.BASE_URL}choose?choices=${query}`
    if (navigator.canShare) {
        const shareData = {
            title: 'Mystery Choice',
            text: 'Hey buddy, check out these mystery choices that I made for you',
            url
        }
        try {
            await navigator.share(shareData)
        }
        catch {
            handleCopyLink(url)
        }
    }
    else
        handleCopyLink(url)
}

const validateShare = () => {
    const isValid = choiceGroups.every(({choices}) => choices.every(({text}) => text))
    if (isValid)
        handleShare()
    else
        alert('Please add some text to all choices')
}

onMounted(() => {
    addNewChoiceGroup()
})
</script>

<template>
    <div class="flex flex-col items-center max-w-7xl min-h-screen m-auto p-3 gap-5">
        <h1 class="w-full text-pink text-3xl text-center md:text-left font-semibold">
            Add Choices
        </h1>

        <div class="w-full">
            <ChoiceGroup
                v-for="({id, event, choices}, index) in choiceGroups"
                :event="event"
                :choices="choices"
                :can-remove-group="canRemoveGroup"
                :theme="getColor(index)"
                :key="id"
                class="mt-5"
                @add-choice="addChoice(index)"
                @remove-choice="choiceIndex => removeChoice(index, choiceIndex)"
                @remove-choice-group="removeChoiceGroup(index)"
                @update-choice-event="value => updateChoiceEvent(index, value)"
                @update-choice="value => updateChoice(index, value)" />
            </div>

            <NewChoiceGroup
                v-if="canAddChoiceGroup"
                :theme="getNewColor"
                @click="addNewChoiceGroup" />

            <ShareChoices
                :theme="getSaveColor"
                @share="validateShare" />
    </div>
</template>