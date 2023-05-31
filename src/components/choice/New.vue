<script setup>
import { computed } from 'vue'

const props = defineProps({
    theme: {
        type: String,
        required: true
    }
})

const pinkTheme = 'border-pink text-pink hover:bg-pink'
const blueTheme = 'border-blue text-blue hover:bg-blue'

const getTheme = computed(() => props.theme === 'pink' ? pinkTheme : blueTheme)
</script>

<template>
    <div
        class="relative grid place-items-center w-full md:w-[24%] aspect-[2] md:h-48 text-7xl rounded-lg border-2 border-dashed cursor-pointer duration-300 hover:text-white hover:border-solid"
        :class="getTheme">
        &plus;
    </div>
</template>