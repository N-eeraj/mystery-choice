<template>
    <div class="flex flex-col md:flex-row justify-center items-center gap-5 h-screen p-5">
        <img
            src="@assets/empty.webp"
            alt="Decorator"
            class="w-full md:w-1/2" />

        <div class="flex flex-col items-center md:items-start gap-y-5 md:gap-y-7">
            <h2 class="max-w-md text-blue text-3xl text-center md:text-left font-medium">
                Couldn't find the page you're looking for
            </h2>
            <RouterLink
                to="/"
                class="py-2 md:py-1 px-5 border-2 border-pink rounded-3xl text-pink duration-300 hover:bg-pink hover:text-white">
                Back Home
            </RouterLink>
        </div>
    </div>
</template>