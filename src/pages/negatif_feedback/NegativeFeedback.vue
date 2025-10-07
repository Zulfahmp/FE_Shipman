<template>
    <Breadcumb title="Negative Feedback" info="Your feedback helps others"></Breadcumb>
    <div class="grid grid-cols-2 p-2 gap-2">
        <div @click="AddPop" class="cursor-pointer rounded-full font-bold bg-blue-500 px-2 justify-center text-white text-xs p-2 flex items-center gap-2">
            <FontAwesomeIcon :icon="faPlusCircle" class="pointer-events-none"/>
            <div class="pointer-events-none whitespace-nowrap">Add Feedback</div>
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
                    <th class="p-2 whitespace-nowrap border border-gray-200">Date</th>
                    <th class="p-2 whitespace-nowrap border border-gray-200">Approve Status</th>
                    <th class="p-2 whitespace-nowrap border border-gray-200">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="n in NF.data" @click="GoApproval(n.nf_id)" class="text-xs text-center">
                    <td class="p-2 whitespace-nowrap border border-gray-200">{{ n.ship_name  }}</td>
                    <td class="p-2 whitespace-nowrap border border-gray-200">{{ n.port_name }}</td>
                    <td class="p-2 whitespace-nowrap border border-gray-200">{{ n.date_of_report }}</td>
                    <td class="p-2 whitespace-nowrap border border-gray-200"><div class="flex justify-center"><FontAwesomeIcon :icon="faCircleXmark" class="text-red-500" size="2x"/></div></td>
                    <td class="p-2 whitespace-nowrap border border-gray-200"><div class="flex justify-center"><FontAwesomeIcon :icon="faDownload" class="text-green-500" size="2x"/></div></td>
                </tr>
            </tbody>
        </table>
        <div v-show="NF.data.length==0 && search==''">
            <div class="text-sm text-center text-gray-700 p-2">No Data</div>
        </div>
    </div>
    <div></div>
    <AddFeedback v-if="ADDPOP" @close="AddPop"></AddFeedback>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Breadcumb from '@/components/Breadcumb.vue';
import { Page } from '@/router';
import { useRouter } from 'vue-router';const routing = useRouter()
import { ref,reactive,watch,onMounted} from 'vue';
import { faDownload, faPlusCircle, faSearch} from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark, faCircleCheck} from '@fortawesome/free-regular-svg-icons';
import AddFeedback from '@/pages/negatif_feedback/AddFeedback.vue';
import { GetData } from '@/api';
import { NFAPRSTORE } from './negativeaprstore';
const NFAPR = NFAPRSTORE()
var ADDPOP = ref(false)
var search = reactive('')
var NF = reactive({data:[]})
  
watch([search], (v) => {
    loadNF();
});

onMounted(async () => {
    await loadNF()
});
  
function AddPop(){
    let change =  !ADDPOP.value
    ADDPOP.value= change
}

async function loadNF(){
    let res = await GetData('/list-negative-feedback',search)
    NF.data = res.data
}

async function handleSearch(){
 loadNF()
}

function GoApproval(nf_id){
    NFAPR.nf_id=nf_id
    Page('negative-feedback-action',routing)
}
</script>