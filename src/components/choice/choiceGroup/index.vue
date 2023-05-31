<script setup>
import { computed } from 'vue'

import Choice from '@components/choice/index.vue'
import NewChoice from '@components/choice/new.vue'

const minChoices = 2
const maxChoices = 4

const props = defineProps({
    choices: {
        type: Array,
        required: true
    }
})

const emit = defineEmits([
    'add-choice',
    'remove-choice',
    'update-choice'
])

const canAddChoice = computed(() => props.choices.length < maxChoices)

const canRemoveChoice = computed(() => props.choices.length > minChoices)

const addChoice = () => emit('add-choice')

const removeChoice = index => emit('remove-choice', index)

const updateChoice = (index, value) => emit('update-choice', {index, value})
</script>

<template>
    <div>
        <Choice
            v-for="({id, text}, index) in choices"
            :text="text"
            :can-remove="canRemoveChoice"
            :key="id"
            @update-choice="value => updateChoice(index, value)"
            @remove-choice="removeChoice(index)" />

        <NewChoice
            v-if="canAddChoice"
            @click="addChoice" />
    </div>
</template>