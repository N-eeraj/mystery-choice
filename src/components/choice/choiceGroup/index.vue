<script setup>
import { computed } from 'vue'

import Choice from '@components/choice/index.vue'
import NewChoice from '@components/choice/new.vue'

const maxChoices = 3

const props = defineProps({
    choices: {
        type: Array,
        required: true
    }
})

const emit = defineEmits([
    'new-choice'
])

const canAddChoice = computed(() => props.choices.length < maxChoices)

const addNewChoice = () => {
    emit('new-choice')
}
</script>

<template>
    <div>
        <Choice
            v-for="(choice, index) in choices"
            :key="index" />

        <NewChoice
            v-if="canAddChoice"
            @click="addNewChoice" />
    </div>
</template>