<script setup>
import { computed } from 'vue'

const props = defineProps({
    theme: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['share'])

const pinkTheme = 'bg-pink border-pink hover:text-pink'
const blueTheme = 'bg-blue border-blue hover:text-blue'

const getTheme = computed(() => props.theme === 'pink' ? pinkTheme : blueTheme)

const handleShare = () => emit('share')
</script>

<template>
    <button
         class="w-40 h-12 text-white rounded-lg border-4 duration-300 hover:bg-white hover:rounded-3xl"
        :class="getTheme"
        @click="handleShare">
        Share
    </button>
</template>