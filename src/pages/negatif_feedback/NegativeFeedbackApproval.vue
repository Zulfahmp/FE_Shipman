<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Breadcumb from '@/components/Breadcumb.vue';
import { Page } from '@/router';
import { useRouter } from 'vue-router';const routing = useRouter()
import { ref,reactive, onMounted } from 'vue';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import AddFeedback from '@/pages/negatif_feedback/AddFeedback.vue';
import { faSquarespace, faSquareWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faSquareFull } from '@fortawesome/free-regular-svg-icons';
import StatusNF from '@/pages/negatif_feedback/StatusNF.vue';
import { NFAPRSTORE } from './negativeaprstore';
import { GetData, PostData } from '@/api';
let STATUSPOP = ref(false)
let NFAPR = NFAPRSTORE()
let master = reactive({})
let NF = reactive({master:{ship_name:'',port:''},detail:[]})

onMounted(async()=>{
    let res = await PostData('/negative-feedback-detail',{nf_id:NFAPR.nf_id})
    NF.master = res.data.master
    NF.detail = res.data.detail
})

function StatusPop(){
    let change =  !STATUSPOP.value
    STATUSPOP.value= change
}
function inforRemark(info){
    master.info_remarks=info
    document.getElementById('info-remarks').style.display = 'block'
}
function closeInfoRemark(){
    document.getElementById('info-remarks').style.display = 'none'
}

function infoEvidence(src){
    master.evidence_src=src
    document.getElementById('info-evidence').style.display = 'block'
}
function closeInfoEvidence(){
    document.getElementById('info-evidence').style.display = 'none'
}

</script>

<template>
    <Breadcumb title="Negative Feedback" info="Your feedback helps others"></Breadcumb>
   
    <div class="grid grid-cols-5 text-xs px-2 my-3">
        <div>
            Ship Name
        </div>
        <div class="col-span-4 flex"> : <div class="mx-2">{{ NF.master.ship_name }}</div></div>
        <div>
            Port Name
        </div>
        <div class="col-span-4 flex"> : <div class="mx-2">{{ NF.master.port_name }}</div></div>
    </div>
    <table class="px-2 text-center text-xs mt-2 w-full">
        <thead>
            <tr>
                <td class="border border-gray-200 p-2 font-bold">Ref Number</td>
                <td class="border border-gray-200 p-2 font-bold">Remarks</td>
                <td class="border border-gray-200 p-2 font-bold">Evidence</td>
                <td class="border border-gray-200 p-2 font-bold">Status</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(N,i) in NF.detail">
                <td class="border border-gray-200 p-2 text-center text-red-500">{{ N.ref_number }}</td>
                <td @click="inforRemark('lah ya')" class="border border-gray-200 p-2  h-20 text-clip overflow-y-auto scrollbar-thin">{{ N.remarks }}</td>
                <td class="border border-gray-200 p-2 ">
                    <img @click="infoEvidence('/logo.svg')" :src="'public/nf/'+N.evidence" class="h-10 w-16 mx-auto" alt="" srcset="">
                </td>
                <td class="border border-gray-200 p-1"><FontAwesomeIcon :icon="faSquareFull" size="lg" @click="StatusPop"/></td>
            </tr>
        </tbody>
    </table>
     <div class="flex gap-5 mx-auto text-center justify-end my-4 px-4">
        <div @click="Page('login',routing)" class="cursor-pointer rounded-lg py-2 px-4 bg-green-200 text-gray-800 font-bold text-xs">Submit</div>
    </div>
    <StatusNF v-show="STATUSPOP" @close="StatusPop"></StatusNF>

    <div id="info-remarks" class="fixed h-screen z-10 top-0 flex items-center p-4 w-full" style="background-color: rgba(0,0,0,0.5);display:none">
        <div class="bg-white rounded-lg w-full">
            <div class="bg-blue-500 rounded-t-lg text-white p-2 font-bold text-center">Remarks</div>
            <div class="text-sm text-center mt-5 font-bold">{{ master.info_remarks }}</div>
            <div class="flex gap-10 mx-auto text-center justify-center my-4">
                <div @click="closeInfoRemark()" class="cursor-pointer rounded-lg font-bold py-2 px-4 bg-red-300 text-gray-800 text-xs mb-2">Close</div>
            </div>
        </div>
    </div>

     <div id="info-evidence" class="fixed h-screen z-10 top-0 flex items-center p-4 w-full" style="background-color: rgba(0,0,0,0.5);display:none">
        <div class="bg-white rounded-lg w-full">
            <div class="bg-blue-500 rounded-t-lg text-white p-2 font-bold text-center">Evidence</div>
            <div class="text-center mt-5">
                <img src="/logo.svg" class="w-full p-2" alt="">
            </div>
            <div class="flex gap-10 mx-auto text-center justify-center my-4">
                <div @click="closeInfoEvidence()" class="cursor-pointer rounded-lg font-bold py-2 px-4 bg-red-300 text-gray-800 text-xs mb-2">Close</div>
            </div>
        </div>
    </div>
</template>