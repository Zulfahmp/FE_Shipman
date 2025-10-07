<script setup>
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Page } from '@/router';
import { useRouter } from 'vue-router';
const routing = useRouter()
    defineProps({
        title:{
            type:String,
            required:true
        },
        title2:{
            type:String,
            required:false
        },
        info:{
            type:String,
            required:true
        }
    })
</script>
<template>
    <div class="h-14 bg-blue-500 p-2 sticky top-0">
        <div class="flex gap-2">
            <div class="flex gap-1 text-xs text-white items-center cursor-pointer">
                <FontAwesomeIcon :icon="faChevronRight" class="text-white pointer-events-none"/>
                <div @click="Page(title.replace(' ','-').toLowerCase(),routing)" class="cursor-pointer">{{ title }}</div>
            </div>
            <div v-if="title2" class="flex gap-1 text-xs text-white items-center">
                <FontAwesomeIcon :icon="faChevronRight" class="text-white"/>
                <div>{{ title2 }}</div>
            </div>
        </div>
        <div class="text-xs text-white py-2">{{ info }}</div>
    </div>
</template>