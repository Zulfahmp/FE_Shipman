<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import questions from './sscl.json';
import questionmain from './sscl.main.json';
import Breadcumb from '@/components/Breadcumb.vue';
import { Page } from '@/router';
import { useRoute, useRouter } from 'vue-router';
import { nextTick, onMounted, ref, watch } from 'vue';
import { reactive } from 'vue';
import { SSCLSTORE } from './ssclstore';
import { GetData, PostData } from '@/api';
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import ApprovalSSCL from './ApprovalSSCL.vue';
import { AuthConfig } from '@/authconfig';
let AUTH = AuthConfig()
let SSCL = reactive({data:{sscl_checklist:[]}})
const route = useRoute()
const routing = useRouter()
let total_question = ref(0) 
let total_answered = ref(0) 
let isApproved = ref(-2) 
let APPROVAL = ref(false)
let status_approval = ref(-1)

let partposition = reactive({part_name:questionmain[0].part_name,title_eng:questionmain[0].title_eng})
watch([APPROVAL],async(v)=>{
    let res = await GetData('/sscl-view/'+route.params.sscl_id)
    SSCL.data = {...res.data}
    isApproved.value = Number(res.data.status_sscl)
    total_question.value = questions.filter(a=>a.part_id==partposition.part_name).length
})
onMounted(async()=>{
    let res = await GetData('/sscl-view/'+route.params.sscl_id)
    await nextTick()
    SSCL.data = {...res.data}
    isApproved.value = Number(res.data.status_sscl)
    total_question.value = questions.filter(a=>a.part_id==partposition.part_name).length
})
async function confirmApproval(){
    status_approval.value=1
    APPROVAL.value = true
}
async function confirmReject(){
    status_approval.value=0
    APPROVAL.value = true
}


function selectPart(part){
    partposition.part_name = part.part_name
    partposition.title_eng = part.title_eng
    total_question.value = questions.filter(a=>a.part_id==partposition.part_name).length
}
</script>

<template>
    <Breadcumb :title2="SSCL.data.ship_name" title="SSCL" info="Ship Shore Safety Checklist"></Breadcumb>
    <div v-if="isApproved>=0" class="bg-blue-500 text-white px-2 py-2 flex gap-2 items-center">
        <div class="text-xs font-">{{SSCL.data.status_sscl ? 'Approved By' : 'Rejected By'}}</div>
        <div class="text-md font-semibold uppercase">{{ SSCL.data.approver }}</div>
    </div>
    <div v-if="isApproved==-1" class="bg-white border-b border-blue-600 px-2 py-2 flex gap-5 items-center">
        <div class="text-xs flex flex-col text-gray-800">
            <div class="font-bold">Approval is required for this document.</div>
            <div>Dokumen ini membutuhkan persetujuan</div>
        </div>
        <div v-if="[1,2].includes(AUTH.role)" class="flex gap-2 font-bold">
            <div @click="confirmApproval" class="text-xs text-white bg-green-600 hover:bg-green-700 active:bg-green-700 cursor-pointer w-20 text-center py-2 rounded-sm">Approve</div>
            <div @click="confirmReject" class="text-xs text-white bg-red-600 hover:bg-red-700 active:bg-red-700 cursor-pointer w-20 text-center py-2 rounded-sm">Decline</div>
        </div>
   </div>
    <div class="flex">
        <div>
            <div class="p-2 flex flex-col gap-1 overflow-y-auto scrollbar-thin" style="height:90%">
                <div class="font-bold text-sm">PART</div>
                <div v-for="qm in questionmain" :key="qm.part_id"
                :class="[
                    'text-xs cursor-pointer rounded-sm font-bold w-8 h-8 border border-blue-500 justify-center items-center flex',
                    qm.part_name == partposition.part_name ? 'bg-blue-500 text-white' : 'text-blue-500'
                ]"

                @click="selectPart(qm)"
                >
                {{ qm.part_name }}
                </div>
            </div>
        </div>
        <div v-show="!END" class="px-2 w-full">
            <div class="flex justify-between items-center">
                <div>
                    <div class="text-xs mt-2">Part {{ partposition.part_name }}, {{ partposition.title_eng }}</div>
                    <div class="font-bold text-xs">Bagian {{ partposition.part_name }}, {{ partposition.title_eng }}</div>
                </div>
                <div v-if="partposition.part_name=='8'" class="text-xs flex gap-2 items-center">
                    <div class="font-bold">Time</div>
                    <input  v-model="SSCL.data.time_8" type="number" class="text-xs text-center font-semibold border rounded-sm px-2 py-1 w-14 text-gray-800" min="1">
                </div>
                <div v-if="partposition.part_name=='9'" class="text-xs flex gap-2 items-center">
                    <div class="font-bold">Time</div>
                    <input  v-model="SSCL.data.time_9" type="number" class="text-xs text-center font-semibold border rounded-sm px-2 py-1 w-14 text-gray-800" min="1">
                </div>
                <!-- <div class="text-xs font-bold">{{total_answered}}/{{total_question}}</div> -->
            </div>
            <div class="p-2 overflow-y-auto grid grid-rows-auto gap-2 w-full" style="height:70vh">
                    <div  v-for="q in SSCL.data.sscl_checklist.filter(a=>a.part_id==partposition.part_name)" class="border border-gray-400 rounded-md p-2 w-full">
                        <div class="text-sm">{{q.question_eng}}</div>
                        <div class="font-bold text-sm">{{q.question_ind}}</div>
                        <div class="flex justify-end text-xs my-3">
                            <div class="flex flex-col gap-2">
                                <div class="flex gap-2 font-bold items-center">
                                    <FontAwesomeIcon :icon="q.checker ? faCheckCircle : faXmarkCircle" class="h-10" size="2x" :class="q.checker ? 'text-green-500' : 'text-red-500'"></FontAwesomeIcon>
                                    <div class="text-blue-600">CHECKER</div>
                                </div>
                                <div class="flex gap-2 font-bold items-center">
                                    <FontAwesomeIcon :icon="q.nahkoda ? faCheckCircle : faXmarkCircle" class="h-10" size="2x" :class="q.nahkoda ? 'text-green-500' : 'text-red-500'"></FontAwesomeIcon>
                                    <div class="text-blue-600">NAHKODA</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="text-xs text-gray-800 break-word">
                                <span class="font-bold">Remarks : </span><span>{{ q.remarks }}</span>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
    <ApprovalSSCL v-if="APPROVAL" @close="APPROVAL=false" :sscl_id="SSCL.data.sscl_id" :ship_name="SSCL.data.ship_name" :status_sscl="status_approval"></ApprovalSSCL>
</template>