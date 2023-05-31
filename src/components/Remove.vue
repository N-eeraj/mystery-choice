<script setup>
const emit = defineEmits([
    'remove'
])

const handleRemove = () => emit('remove')
</script>

<template>
    <button
        @click="handleRemove">
        &cross;
    </button>
</template>