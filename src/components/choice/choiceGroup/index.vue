<script setup>
import { computed } from 'vue'

import Choice from '@components/choice/index.vue'
import NewChoice from '@components/choice/new.vue'
import Remove from '@components/Remove.vue'

const minChoices = 2
const maxChoices = 4

const props = defineProps({
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
    'update-choice'
])

const canAddChoice = computed(() => props.choices.length < maxChoices)
const canRemoveChoice = computed(() => props.choices.length > minChoices)

const addChoice = () => emit('add-choice')

const removeChoice = index => emit('remove-choice', index)

const removeChoiceGroup = () => emit('remove-choice-group')

const updateChoice = (index, value) => emit('update-choice', {index, value})
</script>

<template>
    <div
        class="relative flex flex-col gap-y-3 p-3 border-2 border-dashed odd:border-blue even:border-pink"
        :class="{'pt-10': canRemoveGroup}">
        <Choice
            v-for="({id, text}, index) in choices"
            :text="text"
            :theme="theme"
            :can-remove="canRemoveChoice"
            :key="id"
            @update-choice="value => updateChoice(index, value)"
            @remove-choice="removeChoice(index)" />

        <NewChoice
            v-if="canAddChoice"
            @click="addChoice" />

        <Remove
            v-if="canRemoveGroup"
            class="w-6 absolute top-2 right-2 bg-[#D00] text-white"
            @remove="removeChoiceGroup" />
    </div>
</template>