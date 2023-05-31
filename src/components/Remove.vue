<script setup>
const emit = defineEmits([
    'remove'
])

const handleRemove = () => emit('remove')
</script>

<template>
    <button
        class="aspect-square font-black rounded-full"
        @click="handleRemove">
        &cross;
    </button>
</template>