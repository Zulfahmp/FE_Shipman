<script setup>
    import { Page } from '@/router';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { SSCLSTORE } from './ssclstore';
    const NEXT = ref(false)
    const SSCLSTATE= SSCLSTORE()
    const routing = useRouter()
    defineEmits(['close'])
</script>

<template>
     <div class="fixed h-screen z-10 top-0 left-0 right-0 flex items-center p-4 w-full" style="background-color: rgba(0,0,0,0.5);">
        <form @submit.prevent="" class="bg-white rounded-lg w-full md:w-96 mx-auto">
            <div class="bg-blue-500 rounded-t-lg text-white p-2 font-bold text-center">Add Data</div>
            <div class="grid grid-rows-auto text-xs p-4 gap-3">
                <div class="flex gap-1 flex-col">
                    <div>The Master MT/MV Name <span class="text-red-500">*</span></div>
                    <input v-model="SSCLSTATE.mt_name" maxlength="100" type="text" class="p-2 bg-gray-100 rounded-sm" placeholder="Input MT/MV Name"/>
                </div>
                <div class="flex gap-4">
                    <input @click="NEXT=!NEXT" type="checkbox">
                    <div class="flex flex-col">
                        <div>
                            You have accepted the terms and conditions that apply.
                        </div>
                        <div class="font-bold">
                            Dengan ini anda telah menerima syarat dan ketentuan yang berlaku
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex gap-5 mx-auto text-center justify-end my-4 px-4">
                <div @click="$emit('close')" class="cursor-pointer rounded-lg font-bold py-2 px-4 bg-red-300 text-gray-800 text-xs">Cancel</div>
                <button @click="Page('checklist-sscl',routing)" :disabled="!NEXT" :class="NEXT ? 'text-gray-800' : 'text-gray-400'" class="cursor-pointer rounded-lg py-2 px-4 bg-green-200 font-bold text-xs">Continue</button>
            </div>
        </form>
    </div>
</template>