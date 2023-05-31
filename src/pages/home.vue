<script setup>
import Decorator from '@components/home/Decorator.vue'
import Title from '@components/home/Title.vue'
import Button from '@components/home/Button.vue'
</script>

<template>
    <div class="flex flex-col md:flex-row md:justify-evenly items-center h-screen gap-10 max-w-7xl m-auto p-3">
        <Decorator class="mt-10" />
        <div class="flex flex-col justify-between items-center md:items-start gap-y-10 md:gap-y-8">
            <Title />
            <Button />
        </div>
    </div>
</template>