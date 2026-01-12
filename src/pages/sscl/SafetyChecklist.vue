<template>
    <Breadcumb title="SSCL" title2="Safety Checklist" info="Ship Shore Safety Checklist"></Breadcumb>
    <div class="flex">
        <div>
            <div class="p-2 flex flex-col gap-1 overflow-y-auto scrollbar-thin" style="height:90%">
                <div class="font-bold text-sm" @click="console.log(SSCL_STATE.sscl_checklist)">PART</div>
                <div v-for="qm in questionmain" :key="qm.part_name"
                :class="[
                    'text-xs cursor-pointer rounded-sm font-bold w-8 h-8 border justify-center items-center flex',
                    qm.part_name == partposition.part_name ? 'bg-blue-500 text-white' : 'text-blue-500', REMARKSLIST.find(a=>a.part_id==qm.part_name) ? 'border-red-500' : 'border-blue-500'
                ]"

                @click="selectPart(qm)"
                >
                {{ qm.part_name }}
                </div>
                <div
                :class="[
                    'text-xs cursor-pointer rounded-sm bg-green-500 text-white font-bold w-8 h-8 border border-blue-500 justify-center items-center flex',
                ]"
                @click="EndSSCL()"
                >END</div>
            </div>
        </div>
        <div v-show="!END" class="px-2 w-full">
            <div class="flex justify-between items-center">
                <div>
                    <div class="text-xs mt-2">Part {{ partposition.part_name }}, {{ partposition.title_eng }}</div>
                    <div class="font-bold text-xs">Bagian {{ partposition.part_name }}, {{ partposition.title_eng }}</div>
                </div>
                <div v-if="partposition.part_name=='8'" class="text-xs flex gap-2 items-center">
                    <div class="font-bold">Interval (Hrs)</div>
                    <input  v-model="SSCL_STATE.interval_8" type="number" class="text-xs text-center font-semibold border rounded-sm px-2 py-1 w-14 text-gray-800" min="1">
                </div>
                <div v-if="partposition.part_name=='8'" class="text-xs flex gap-2 items-center">
                    <div class="font-bold">Time (Hrs)</div>
                    <input  v-model="SSCL_STATE.time_8" type="number" class="text-xs text-center font-semibold border rounded-sm px-2 py-1 w-14 text-gray-800" min="1">
                </div>
                <div v-if="partposition.part_name=='9'" class="text-xs flex gap-2 items-center">
                    <div class="font-bold">Interval (Hrs)</div>
                    <input  v-model="SSCL_STATE.interval_9" type="number" class="text-xs text-center font-semibold border rounded-sm px-2 py-1 w-14 text-gray-800" min="1">
                </div>
                <div v-if="partposition.part_name=='9'" class="text-xs flex gap-2 items-center">
                    <div class="font-bold">Time (Hrs)</div>
                    <input  v-model="SSCL_STATE.time_9" type="number" class="text-xs text-center font-semibold border rounded-sm px-2 py-1 w-14 text-gray-800" min="1">
                </div>
                <div class="text-xs font-bold">{{total_question}} Questions</div>
                <!-- <div class="text-xs font-bold">{{total_answered}}/{{total_question}}</div> -->
            </div>
            <div class="p-2 overflow-y-auto grid grid-rows-auto gap-2 w-full" style="height:77vh">
                    <div  v-for="q in SSCL_STATE.sscl_checklist.filter(a=>a.part_id==partposition.part_name)" class="border border-gray-400 rounded-md p-2 w-full">
                        <div class="text-sm">{{q.eng}}</div>
                        <div class="font-bold text-sm">{{q.ind}}</div>
                        <div class="flex justify-end text-xs my-3">
                            <div class="flex flex-col gap-2">
                                <div class="flex gap-2 font-bold">
                                    <input v-model="q.checker" type="checkbox" class="scale-120 accent-blue-600">
                                    <div class="text-blue-600">CHECKER</div>
                                </div>
                                <div class="flex gap-2 font-bold">
                                    <input v-model="q.nahkoda" type="checkbox" class="scale-120 accent-blue-600">
                                    <div class="text-blue-600">NAHKODA</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <textarea name="" id="" rows="3" v-model="q.remarks" class="bg-gray-100 w-full rounded-sm text-xs p-2" placeholder="Remarks"></textarea>
                        </div>
                    </div>
            </div>
        </div>
        <div v-show="END" class="w-3/4 mx-auto mt-5">
            <div class="text-md mb-3 text-center text-blue-600 w-full">The end of the SSCL. Please check the Ship Shore Safety Checklist again.</div>
            <div class="text-xs text-center w-full font-bold">In accordance with the guidance of ISGOTT, we have satisfied ourselves that the entries we have made are correct to the best of our knowledge and that the tanker and terminal are in agreement to undertake the transfer operation.</div>
            <div class="text-xs text-center w-full">Sesuai dengan panduan ISGOTT, kami telah memastikan bahwa entri data yang kami buat benar dengan pengetahuan terbaik kami dan bahwa kapal tanker dan terminal setuju untuk melakukan operasi transfer.</div>
            <div v-if="REMARKS" class="text-red-600 text-xs text-center">
                <div>Please check again, it seems some remarks are missing</div>
                <div class="font-bold">Silahkan cek kembali, sepertinya ada yang belum diberi catatan</div>
            </div>
            <div class="flex justify-center">
                <button :disabled="REMARKS" @click="SaveSSCL()" :class="!REMARKS ? 'text-gray-800' : 'text-gray-400'" class="cursor-pointer mx-auto mt-5 w-25 text-center rounded-lg py-2 px-4 bg-green-200 font-bold text-xs">Submit</button>
            </div>
        </div>
    </div> 
</template>

<script setup>
import questions from './sscl.json';
import questionmain from './sscl.main.json';
import Breadcumb from '@/components/Breadcumb.vue';
import { Page } from '@/router';
import { useRoute, useRouter,onBeforeRouteLeave } from 'vue-router';
import { onBeforeMount, onMounted, ref } from 'vue';
import { reactive } from 'vue';
import { SSCLSTORE } from './ssclstore';
import { PostData } from '@/api';
import { Failed, Success } from '@/sweet';

let SSCL_STATE = SSCLSTORE()
const routing = useRouter()
let total_answered = ref(0) 
let partposition = reactive({part_name:questionmain[0].part_name,title_eng:questionmain[0].title_eng})
let total_question = ref(0) 
let REMARKS = ref(false) 
let REMARKSLIST = reactive([]) 
let END = ref(false) 
let isSaved = ref(false) 

onBeforeRouteLeave((to, from, next) => {
    if(!isSaved.value){
        confirm('You have unsaved changes. Are you sure you want to leave this page?') ? next() : next(false)
    }else{
        next()
    }
})

function EndSSCL(){
    REMARKSLIST = SSCL_STATE.sscl_checklist.filter(a=>a.checker==0 || a.nahkoda==0).map(a=>{return {part_id:a.part_id,remarks:a.remarks}});
    REMARKS.value = !REMARKSLIST.every(a=>a.remarks.trim()!='');
    END.value=true
}
onBeforeMount(()=>{
    // SSCL_STATE.sscl_id=='' && Page('sscl',routing)
})
onMounted(()=>{
    total_question.value = questions.filter(a=>a.part_id==partposition.part_name).length
    convertToSTATE()
})

function convertToSTATE(){
    SSCL_STATE.sscl_checklist = questions.map(a=>{
        a.id_sscl = SSCL_STATE.sscl_id
        a.checker=true;
        a.nahkoda=true;
        a.remarks='';
        return a
    })
}

function selectPart(part){
    END.value=false
    partposition.part_name = part.part_name
    partposition.title_eng = part.title_eng
    total_question.value = questions.filter(a=>a.part_id==partposition.part_name).length
}

async function SaveSSCL(){
        let checkeracc = SSCL_STATE.sscl_checklist.every(a=>a.checker==true);
        let nahkodaacc = SSCL_STATE.sscl_checklist.every(a=>a.nahkoda==true);
        SSCL_STATE.status_sscl = -1
        // SSCL_STATE.status_sscl = checkeracc && nahkodaacc ? 1 : 0
        let res = await PostData('/add-sscl',SSCL_STATE.$state)
        if(res.data.affected>0){
            Success('Successfully added SSCL',()=>{
                isSaved.value = true
                SSCL_STATE.resetSSCL();Page('sscl',routing)
            })
        }else{
            Failed('Failed to add SSCL',()=>{

            })
        }
}

</script>