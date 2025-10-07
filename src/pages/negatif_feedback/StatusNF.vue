<script setup>
    import { Page } from '@/router';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    const routing = useRouter()
    defineEmits(['close'])
</script>
<template>
       <div class="fixed h-screen z-10 top-0 left-0 right-0 flex items-center p-4 w-full" style="background-color: rgba(0,0,0,0.5);">
        <div class="bg-white rounded-lg w-full md:w-96 mx-auto">
            <div class="bg-blue-500 rounded-t-lg text-white p-2 font-bold text-center">Status Feedback</div>
            <div class="text-sm text-center mt-5 font-bold">Set a status for this finding?</div>
            <div class="flex gap-10 mx-auto text-center justify-center my-4">
                <div @click="$emit('close')" class="cursor-pointer rounded-lg font-bold py-2 px-4 bg-red-300 text-gray-800 text-xs">DECLINE</div>
                <div @click="Page('login',routing)" class="cursor-pointer rounded-lg py-2 px-4 bg-green-200 text-gray-800 font-bold text-xs">APPROVE</div>
            </div>
        </div>
    </div>
</template>