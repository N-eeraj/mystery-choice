<script setup>
import Remove from '@components/Remove.vue'
import { computed } from 'vue'

const props = defineProps({
    text: {
        type: String,
        required: false,
        default: ''
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

const getTheme = computed(() => props.theme === 'pink' ? 'bg-pink' : 'bg-blue')

const updateChoiceText = ({target}) => emit('update-choice', target.value)

const removeChoice = () => emit('remove-choice')
</script>

<template>
    <div
        class="relative grid place-items-center w-full md:w-[24%] aspect-[2] md:h-48 rounded-lg"
        :class="getTheme">
        <span
            v-if="readOnly"
            class="text-white">
            {{ text }}
        </span>
        <textarea
            v-else
            :spellcheck="false"
            class="w-full h-full p-3 bg-transparent text-white outline-none resize-none"
            @change="updateChoiceText" />

        <Remove
            v-if="canRemove"
            class="w-6 absolute top-1 right-1 bg-[#0007] text-white"
            @remove="removeChoice" />
    </div>
</template>