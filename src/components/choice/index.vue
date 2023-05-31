<script setup>
import Remove from '@components/Remove.vue'

const props = defineProps({
    text: {
        type: String,
        required: false,
        default: null
    },
    theme: {
        type: String,
        required: true
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
    <div
        class="relative grid place-items-center w-full aspect-[2] rounded-lg"
        :class="theme">
        <span
            v-if="readOnly"
            class="text-white">
            {{ text }}
        </span>
        <textarea
            v-else
            type="text"
            class="w-full h-full p-3 bg-transparent text-white outline-none"
            @change="updateChoiceText" />

        <Remove
            v-if="canRemove"
            class="w-6 absolute top-1 right-1 bg-[#0007] text-white"
            @remove="removeChoice" />
    </div>
</template>