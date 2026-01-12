<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faGear} from '@fortawesome/free-solid-svg-icons';
import Breadcumb from '@/components/Breadcumb.vue';
import AddData from '@/pages/master_data/AddData.vue';
import { onMounted, reactive, ref } from 'vue';
import { Page } from '@/router';
import { useRouter } from 'vue-router';
import { GetData } from '@/api';
const routing = useRouter()
var ADDPOP = ref(false)
var totalrecord = reactive({ship:0,port:0,cargo:0,berth:0})
  
function AddPop(){
    let change =  !ADDPOP.value
    ADDPOP.value= change
}

onMounted(async()=>{
    let resship = await GetData('/total-master-ship')
    let resport = await GetData('/total-master-port')
    let resberth = await GetData('/total-master-berth')
    let rescargo = await GetData('/total-master-cargo')
    totalrecord.ship=Number(resship.data.total)
    totalrecord.port=Number(resport.data.total)
    totalrecord.berth=Number(resberth.data.total)
    totalrecord.cargo=Number(rescargo.data.total)
})


</script>
<template>
    <Breadcumb title="Master Data" info="Provide Your Information"></Breadcumb>
    <div class="grid grid-cols-2 p-2 gap-2">
        <div></div>
       <!-- <div @click="AddPop" class="cursor-pointer rounded-full font-bold bg-blue-500 px-2 justify-center text-white text-xs p-2 flex items-center gap-2">
            <FontAwesomeIcon :icon="faPlusCircle" class="pointer-events-none"/>
            <div class="pointer-events-none whitespace-nowrap">Add Data</div>
        </div> -->
        <!-- <div class="rounded-full bg-gray-200 px-4 text-white text-xs flex items-center gap-2">
            <FontAwesomeIcon :icon="faSearch" class="text-gray-400"/>
            <input type="text" class="p-2 w-full bg-gray-200 text-gray-800 focus:outline-none" placeholder="Search"/>
        </div> -->
    </div>
    <div class="p-2">
        <div class="bg-white py-3 px-3 text-xs grid grid-cols-5 grid-rows-auto">
            <div class="col-span-2 font-bold">
                Berth
            </div>
            <div class="col-span-2">
                ({{totalrecord.berth}}) Data Found
            </div>
            <div class="flex gap-3 items-center" title="Management Berth">
                <FontAwesomeIcon :icon="faGear" size="lg" @click="Page('master-data-detail/berth',routing)" class="text-blue-500 cursor-pointer"/>
                <!-- <FontAwesomeIcon :icon="faTrashAlt" class="text-red-500 cursor-pointer"/> -->
            </div>
        </div>
        <div class="bg-gray-100 py-3 px-3 text-xs grid grid-cols-5 grid-rows-auto">
            <div class="col-span-2 font-bold">
                Cargo
            </div>
            <div class="col-span-2">
                ({{totalrecord.cargo}}) Data Found
            </div>
            <div class="flex gap-3 items-center" title="Mangement Cargo">
                <FontAwesomeIcon :icon="faGear" size="lg" @click="Page('master-data-detail/cargo',routing)" class="text-blue-500 cursor-pointer"/>
                <!-- <FontAwesomeIcon :icon="faTrashAlt" class="text-red-500 cursor-pointer"/> -->
            </div>
        </div>
        
        <div class="bg-white py-3 px-3 text-xs grid grid-cols-5 grid-rows-auto">
            <div class="col-span-2 font-bold">
                Port
            </div>
            <div class="col-span-2">
                ({{totalrecord.port}}) Data Found
            </div>
            <div class="flex gap-3 items-center" title="Management Port">
                <FontAwesomeIcon :icon="faGear" size="lg" @click="Page('master-data-detail/port',routing)" class="text-blue-500 cursor-pointer"/>
                <!-- <FontAwesomeIcon :icon="faTrashAlt" class="text-red-500 cursor-pointer"/> -->
            </div>
        </div>
        <div class="bg-gray-100 py-3 px-3 text-xs grid grid-cols-5 grid-rows-auto">
            <div class="col-span-2 font-bold">
                Ship
            </div>
            <div class="col-span-2">
                ({{totalrecord.ship}}) Data Found
            </div>
            <div class="flex gap-3 items-center" title="Management Ship">
                <FontAwesomeIcon :icon="faGear" size="lg" @click="Page('master-data-detail/ship',routing)" class="text-blue-500 cursor-pointer"/>
                <!-- <FontAwesomeIcon :icon="faTrashAlt" class="text-red-500 cursor-pointer"/> -->
            </div>
        </div>        
    </div>
    <AddData v-show="ADDPOP" @close="AddPop"></AddData>
</template>