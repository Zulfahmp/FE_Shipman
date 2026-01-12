<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Breadcumb from '@/components/Breadcumb.vue';
import { Page } from '@/router';
import { useRouter } from 'vue-router';const routing = useRouter()
import { ref,reactive, onMounted, watch, onBeforeMount } from 'vue';
import { faCheckCircle, faSquare, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import AddFeedback from '@/pages/negatif_feedback/AddFeedback.vue';
import { faSquarespace, faSquareWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faSquareFull } from '@fortawesome/free-regular-svg-icons';
import StatusNF from '@/pages/negatif_feedback/StatusNF.vue';
import { NFAPRSTORE } from './negativeaprstore';
import { GetData, PostData } from '@/api';
import { AuthConfig } from '@/authconfig';
import ApprovalNF from './ApprovalNF.vue';
let AUTH = AuthConfig()
let STATUSPOP = ref(false)
let NFAPR = NFAPRSTORE()
let master = reactive({})
// let NF = reactive({master:{ship_name:'',port:''},detail:[]})
let APPROVAL = ref(false)
let id_feedback = ref(0)
let status_approval = ref(-1)

watch([STATUSPOP],()=>{
    // console.log(NFAPR.detail)
})
onBeforeMount(()=>{
    NFAPR.nf_id=='' && Page('negative-feedback',routing)
    console.log(NFAPR.approver)
})
onMounted(async()=>{
    let res = await PostData('/negative-feedback-detail',{nf_id:NFAPR.nf_id})
     NFAPR.detail = res.data.detail
})

async function confirmApprove(){
    status_approval.value=1
    NFAPR.status_nf = 1
    APPROVAL.value = true
}

async function confirmReject(){
    status_approval.value=0
    NFAPR.status_nf = 0
    APPROVAL.value = true
}

function StatusPop(id=0){
    if(NFAPR.status_nf==-1 && (AUTH.role==1 || AUTH.role==2)){
        id_feedback = id
        let change =  !STATUSPOP.value
        STATUSPOP.value= change
    }
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
    <Breadcumb title="Negative Feedback" :title2="NFAPR.ship_name" info="Your feedback helps others"></Breadcumb>
   
    <div class="grid grid-cols-5 text-xs px-2 my-3">
        <div>
            Ship Name
        </div>
        <div class="col-span-4 flex"> : <div class="mx-2">{{ NFAPR.ship_name }}</div></div>
        <div>
            Port Name
        </div>
        <div class="col-span-4 flex"> : <div class="mx-2">{{ NFAPR.port }}</div></div>
        <div v-if="NFAPR.approver">
            Approved By
        </div>
        <div  v-if="NFAPR.approver" class="col-span-4 flex"> : <div class="mx-2">{{ NFAPR.approver }}</div></div>
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
            <tr v-for="(N,i) in NFAPR.detail">
                <td class="border border-gray-200 p-2 text-center text-red-500">{{ N.ref_number }}</td>
                <td @click="inforRemark(N.remarks)" class="cursor-pointer border border-gray-200 p-2  h-20 text-clip overflow-y-auto scrollbar-thin">{{ N.remarks }}</td>
                <td class="border border-gray-200 p-2 cursor-pointer ">
                     <div class="w-28 mx-auto overflow-hidden">
                        <!-- <img class="w-full object-cover block" :src="N.evidence_url" alt="" srcset=""> -->
                        <img @click="infoEvidence('public/nf/'+N.evidence)" :src="'public/nf/'+N.evidence" class="w-full block mx-auto" alt="" srcset="">
                    </div>
                </td>
                <td class="border border-gray-200 p-1">
                    <div class="flex justify-center">
                            <div v-if="N.status_feedback>=0" class="flex justify-center">
                                <FontAwesomeIcon @click="StatusPop(N.id)" :icon="N.status_feedback ? faCheckCircle : faXmarkCircle" :class="N.status_feedback ? 'text-green-500' : 'text-red-500', NFAPR.status_nf==-1 && (AUTH.role==1 || AUTH.role==2)? 'cursor-pointer':'cursor-default'" size="2x"/>
                            </div>
                            <FontAwesomeIcon v-if="N.status_feedback==-1" :icon="faSquareFull" size="lg" @click="StatusPop(N.id)" :class="(AUTH.role==1 || AUTH.role==2) ? 'cursor-pointer':'cursor-default'"/>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
     <div v-if="NFAPR.status_nf<0 && (AUTH.role==1 || AUTH.role==2)" class="flex gap-5 mx-auto text-center justify-end gap-2 my-4 px-4">
        <div @click="confirmReject()" class="cursor-pointer rounded-lg py-2 px-4 bg-red-200 text-gray-800 font-bold text-xs">Decline</div>
        <div @click="confirmApprove()" class="cursor-pointer rounded-lg py-2 px-4 bg-green-200 text-gray-800 font-bold text-xs">Approve</div>
    </div>
    <StatusNF v-show="STATUSPOP" :id_feedback="id_feedback" @close="StatusPop"></StatusNF>

    <div id="info-remarks" class="fixed h-screen z-10 top-0 left-0 right-0 flex items-center p-4 w-full" style="background-color: rgba(0,0,0,0.5);display:none">
        <div class="bg-white rounded-lg w-full md:w-96 mx-auto mt-16">
            <div class="bg-blue-500 rounded-t-lg text-white p-2 font-bold text-center">Remarks</div>
            <div class="text-sm text-center mt-5 font-bold">{{ master.info_remarks }}</div>
            <div class="flex gap-10 mx-auto text-center justify-center my-4">
                <div @click="closeInfoRemark()" class="cursor-pointer rounded-lg font-bold py-2 px-4 bg-red-300 text-gray-800 text-xs mb-2">Close</div>
            </div>
        </div>
    </div>

     <div id="info-evidence" class="fixed h-screen z-10 top-0 left-0 right-0 flex items-center p-4 w-full" style="background-color: rgba(0,0,0,0.5);display:none">
        <div class="bg-white rounded-lg w-full md:w-96 mx-auto mt-16">
            <div class="bg-blue-500 rounded-t-lg text-white p-2 font-bold text-center">Evidence</div>
            <div class="text-center mt-5">
                <img :src="master.evidence_src" class="w-full p-2" alt="">
            </div>
            <div class="flex gap-10 mx-auto text-center justify-center my-4">
                <div @click="closeInfoEvidence()" class="cursor-pointer rounded-lg font-bold py-2 px-4 bg-red-300 text-gray-800 text-xs mb-2">Close</div>
            </div>
        </div>
    </div>

    <ApprovalNF v-if="APPROVAL" @close="APPROVAL=false" :nf_id="NFAPR.nf_id" :ship_name="NFAPR.ship_name" :status_nf="status_approval"></ApprovalNF>
</template>