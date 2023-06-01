<script setup>
import { computed } from 'vue'

import Choice from '@components/choice/index.vue'
import New from '@components/New.vue'
import Remove from '@components/Remove.vue'

const minChoices = 2
const maxChoices = 4

const props = defineProps({
    event: {
        type: String,
        required: true
    },
    choices: {
        type: Array,
        required: true
    },
    canRemoveGroup: {
        type: Boolean,
        required: false,
        default: false
    },
    theme: {
        type: String,
        required: true
    },
})

const emit = defineEmits([
    'add-choice',
    'remove-choice',
    'remove-choice-group',
    'update-choice-event',
    'update-choice'
])

const canAddChoice = computed(() => props.choices.length < maxChoices)
const canRemoveChoice = computed(() => props.choices.length > minChoices)
const getTheme = computed(() => props.theme === 'pink' ? 'outline-pink' : 'outline-blue')

const addChoice = () => emit('add-choice')

const removeChoice = index => emit('remove-choice', index)

const removeChoiceGroup = () => emit('remove-choice-group')

const updateChoiceEvent = ({target}) => emit('update-choice-event', target.value)

const updateChoice = (index, value) => emit('update-choice', {index, value})
</script>

<template>
    <div class="flex flex-col gap-y-5 p-3">

        <div class="flex justify-between gap-x-2">
            <input
                placeholder="Enter an event"
                class="w-full p-1 text-xl focus:outline outline-2"
                :class="getTheme"
                @change="updateChoiceEvent" />

            <Remove
                v-if="canRemoveGroup"
                class="bg-[#D00] text-white"
                @remove="removeChoiceGroup" />
        </div>

        <div class="flex flex-col md:flex-row gap-3">
            <Choice
                v-for="({id, text}, index) in choices"
                :text="text"
                :theme="theme"
                :can-remove="canRemoveChoice"
                :key="id"
                @update-choice="value => updateChoice(index, value)"
                @remove-choice="removeChoice(index)" />
                
            <New
                v-if="canAddChoice"
                :theme="theme"
                class="w-full md:w-[24%] border-2"
                @click="addChoice" />
        </div>
    </div>
</template>