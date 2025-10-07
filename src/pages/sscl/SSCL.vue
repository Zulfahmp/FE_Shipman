<template>
    <Breadcumb title="SSCL" info="Ship Shore Safety Checklist"></Breadcumb>
    <div class="grid grid-cols-2 p-2 gap-2">
        <div @click="AddPop" class="cursor-pointer rounded-full font-bold bg-blue-500 px-2 justify-center text-white text-xs p-2 flex items-center gap-2">
            <FontAwesomeIcon :icon="faPlusCircle" class="pointer-events-none"/>
            <div class="pointer-events-none whitespace-nowrap">Add SSCL</div>
        </div>
        <div class="rounded-full bg-gray-200 px-4 text-white text-xs flex items-center gap-2">
            <FontAwesomeIcon :icon="faSearch" class="text-gray-400"/>
            <input @keyup="handleSearch" v-model="search" type="text" class="p-2 w-full bg-gray-200 text-gray-800 focus:outline-none" placeholder="Search"/>
        </div>
    </div>
    <div class="overflow-x-scroll scrollbar-thin w-full px-2">
        <table class="w-full table-auto">
            <thead>
                <tr class="bg-gray-100 text-xs">
                    <th class="p-2 whitespace-nowrap border border-gray-200">Ship Name</th>
                    <th class="p-2 whitespace-nowrap border border-gray-200">Port</th>
                    <th class="p-2 whitespace-nowrap border border-gray-200">Bert</th>
                    <th class="p-2 whitespace-nowrap border border-gray-200">Cargo</th>
                    <th class="p-2 whitespace-nowrap border border-gray-200">Date of Arrival</th>
                    <th class="p-2 whitespace-nowrap border border-gray-200">Time of Arrival</th>
                    <th class="p-2 whitespace-nowrap border border-gray-200">Approve Status</th>
                    <th class="p-2 whitespace-nowrap border border-gray-200">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="s in sscl.data" class="text-xs text-center">
                    <td class="p-2 whitespace-nowrap border border-gray-200">{{ s.ship_name }}</td>
                    <td class="p-2 whitespace-nowrap border border-gray-200">{{ s.port_name  }}</td>
                    <td class="p-2 whitespace-nowrap border border-gray-200">{{ s.berth_name }}</td>
                    <td class="p-2 whitespace-nowrap border border-gray-200">{{ s.cargo_name }}</td>
                    <td class="p-2 whitespace-nowrap border border-gray-200">{{ s.date_arrival }}</td>
                    <td class="p-2 whitespace-nowrap border border-gray-200">{{ s.time_arrival }}</td>
                    <td class="p-2 whitespace-nowrap border border-gray-200"><div class="flex justify-center"><FontAwesomeIcon :icon="faCircleXmark" class="text-red-500" size="2x"/></div></td>
                    <td class="p-2 whitespace-nowrap border border-gray-200"><div class="flex justify-center"><FontAwesomeIcon :icon="faDownload" class="text-green-500" size="2x"/></div></td>
                </tr>
                
            </tbody>
        </table>
    </div>
    <div></div>
    <AddSSCL v-if="ADDPOP" @close="AddPop"></AddSSCL>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Breadcumb from '@/components/Breadcumb.vue';
import { Page } from '@/router';
import { useRouter } from 'vue-router';const routing = useRouter()
import { ref ,reactive, watch, onMounted} from 'vue';
import { faDownload, faPlusCircle, faSearch} from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark, faCircleCheck} from '@fortawesome/free-regular-svg-icons';
import { GetData } from '@/api';
import AddSSCL from './AddSSCL.vue';
var ADDPOP = ref(false)
var search = reactive('')
var sscl = reactive({data:[]})

watch([search], (v) => {
    loadSSCL();
});

onMounted(async () => {
    await loadSSCL()
});
  
function AddPop(){
    let change =  !ADDPOP.value
    ADDPOP.value= change
}

async function loadSSCL(){
    let res = await GetData('/list-sscl',search)
    sscl.data = res.data
}

async function handleSearch(){
 loadSSCL()
}
</script>