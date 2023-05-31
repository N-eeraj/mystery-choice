<script setup>
import Remove from '@components/Remove.vue'

const props = defineProps({
    text: {
        type: String,
        required: false,
        default: null
    },
    readOnly: {
        type: Boolean,
        required: false,
        default: false
    },
    canRemove: {
        type: Boolean,
        required: false,
        default: false
    }
})

const emit = defineEmits([
    'update-choice',
    'remove-choice'
])

const updateChoiceText = ({target}) => emit('update-choice', target.value)

const removeChoice = () => emit('remove-choice')
</script>

<template>
    <div>
        <span v-if="readOnly">
            {{ text }}
        </span>
        <input
            v-else
            type="text"
            class="border border-black"
            @change="updateChoiceText">

        <Remove
            v-if="canRemove"
            @remove="removeChoice" />
    </div>
</template>