<script setup>
    import { Page } from '@/router';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    const routing = useRouter()
    defineEmits(['close'])
</script>
<template>
    <div class="fixed h-screen z-10 top-0 flex items-center p-4 w-full" style="background-color: rgba(0,0,0,0.5);">
        <div class="bg-white rounded-lg w-full md:w-96 mx-auto">
            <div class="bg-blue-500 rounded-t-lg text-white p-2 font-bold text-center">Add Data</div>
            <div class="grid grid-rows-auto text-xs p-4 gap-3">
                <div class="flex gap-1 flex-col">
                    <div>Data Name <span class="text-red-500">*</span></div>
                    <input type="text" class="p-2 bg-gray-100 rounded-sm" placeholder="Input Data Name"/>
                </div>
            </div>
            <div class="flex gap-5 mx-auto text-center justify-end my-4 px-4">
                <div @click="$emit('close')" class="cursor-pointer ounded-lg font-bold py-2 px-4 bg-red-300 text-gray-800 text-xs">Cancel</div>
                <div @click="Page('login',routing)" class="cursor-pointer rounded-lg py-2 px-4 bg-green-200 text-gray-800 font-bold text-xs">Save</div>
            </div>
        </div>
    </div>
</template>