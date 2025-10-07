<script setup>
    let emit = defineEmits(['close','action'])
    defineProps({
        title:{
            type:String,
            required:true,
        },
        item:{
            type:String,
            required:true
        }
    })
</script>
<template>
    <div class="fixed h-screen z-10 top-0 left-0 right-0 flex items-center p-4 w-full" style="background-color: rgba(0,0,0,0.5);">
        <div class="bg-white rounded-lg w-full md:w-96 mx-auto">
            <div class="bg-blue-500 rounded-t-lg text-white p-2 font-bold text-center">Delete {{ title }}</div>
            <div class="text-center font-xs my-2">Are you sure want to delete? <div class="font-bold">{{ item }}</div></div>
            <div class="flex gap-5 justify-center text-center my-4 px-4">
                <div @click="$emit('close')" class="cursor-pointer rounded-lg font-bold py-2 px-4 bg-red-300 text-gray-800 text-xs">Cancel</div>
                <div @click="$emit('action')" class="cursor-pointer rounded-lg py-2 px-4 bg-green-200 text-gray-800 font-bold text-xs">Delete</div>
            </div>
        </div>
    </div>
</template>