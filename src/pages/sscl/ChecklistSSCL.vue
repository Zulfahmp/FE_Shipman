<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import questions from '@/sscl.json';
import questionmain from '@/sscl.main.json';
import Breadcumb from '@/components/Breadcumb.vue';
import { Page } from '@/router';
import { useRouter } from 'vue-router';const routing = useRouter()
import { onMounted, ref } from 'vue';
import { reactive } from 'vue';
import { SSCLSTORE } from './ssclstore';
let SSCL_STATE = SSCLSTORE()

let total_answered = ref(0) 
let partposition = reactive({part_name:questionmain[0].part_name,title_eng:questionmain[0].title_eng})
let total_question = ref(0) 
let END = ref(false) 

function EndSSCL(){
    END.value=true
}

onMounted(()=>{
    total_question.value = questions.filter(a=>a.part_id==partposition.part_name).length
    convertToSTATE()
})

function convertToSTATE(){
    SSCL_STATE.sscl_checklist = questions.map(a=>{
        a.question_eng = a.eng
        a.question_ind = a.ind
        a.status_condition=false;
        a.status_tanker=false;
        a.status_terminal=false;
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
</script>
<template>
    <Breadcumb title="Add SSCL" info="Ship Shore Safety Checklist"></Breadcumb>
    <div class="flex">
        <div>
            <div class="p-2 flex flex-col gap-1 overflow-y-auto scrollbar-thin">
                <div class="font-bold text-sm" @click="console.log(SSCL_STATE.sscl_checklist)">PART</div>
                <div v-for="qm in questionmain" :key="qm.part_id"
                :class="[
                    'text-xs cursor-pointer rounded-sm font-bold w-8 h-8 border border-blue-500 justify-center items-center flex',
                    qm.part_name == partposition.part_name ? 'bg-blue-500 text-white' : 'text-blue-500'
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
                <div class="text-xs font-bold">{{total_answered}}/{{total_question}}</div>
            </div>
            <div class="p-2 overflow-y-auto grid grid-rows-auto gap-2 w-full" style="height:77vh">
                    <div  v-for="q in SSCL_STATE.sscl_checklist.filter(a=>a.part_id==partposition.part_name)" class="border border-gray-400 rounded-md p-2 w-full">
                        <div class="text-sm">{{q.eng}}</div>
                        <div class="font-bold text-sm">{{q.ind}}</div>
                        <div class="flex justify-end text-xs my-3">
                            <div class="flex flex-col gap-2">
                                <div class="flex gap-2 font-bold">
                                    <input :value="q.status_condition" type="checkbox" class="scale-70">
                                    <div>Checker</div>
                                </div>
                                <div class="flex gap-2 font-bold">
                                    <input type="checkbox" class="scale-70">
                                    <div>Nahkoda</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <textarea name="" id="" rows="3" class="bg-gray-100 w-full rounded-sm text-xs p-2" placeholder="Remarks"></textarea>
                        </div>
                    </div>
            </div>
        </div>
        <div v-show="END" class="w-3/4 mx-auto mt-5">
            <div class="text-md mb-3 text-center text-blue-600 w-full">The end of the SSCL. Please check the Ship Shore Safety Checklist again.</div>
            <div class="text-xs text-center w-full font-bold">In accordance with the guidance of ISGOTT, we have satisfied ourselves that the entries we have made are correct to the best of our knowledge and that the tanker and terminal are in agreement to undertake the transfer operation.</div>
            <div class="text-xs text-center w-full">Sesuai dengan panduan ISGOTT, kami telah memastikan bahwa entri data yang kami buat benar dengan pengetahuan terbaik kami dan bahwa kapal tanker dan terminal setuju untuk melakukan operasi transfer.</div>
            <div @click="Page('negative-feedback',routing)" class="cursor-pointer mt-5 w-25 mx-auto text-center rounded-lg py-2 px-4 bg-green-200 text-gray-800 font-bold text-xs">Submit</div>
        </div>
    </div>
</template>