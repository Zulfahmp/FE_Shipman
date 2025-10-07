<template>
    <Breadcumb title="Negative Feedback" info="Your feedback helps others"></Breadcumb>
    <div class="grid grid-cols-5 text-xs px-2 my-3">
        <div>
            Ship Name
        </div>
        <div class="col-span-4 flex"> : <div class="mx-2">{{ NFSTATE.ship_name }}</div></div>
        <div>
            Port Name
        </div>
        <div class="col-span-4 flex"> : <div class="mx-2">{{ NFSTATE.port }}</div></div>
    </div>
    <div class="p-2">
        <table class="w-full">
            <thead>
                <tr class="bg-gray-100 text-xs">
                    <th class="p-2 whitespace-nowrap border border-gray-200">No</th>
                    <th class="p-2 whitespace-nowrap border border-gray-200">Ref Number <span class="text-red-500">*</span></th>
                    <th class="p-2 whitespace-nowrap border border-gray-200">Remarks <span class="text-red-500">*</span></th>
                    <th class="p-2 whitespace-nowrap border border-gray-200">Evidence <span class="text-red-500">*</span></th>
                    <th class="p-2 whitespace-nowrap border border-gray-200">Action <span class="text-red-500">*</span></th>
                </tr>
            </thead>
            <tbody>
            <tr v-for="(N,i) in NEGATIVES.data" class="px-2 text-center text-xs mt-2">
                <td class="border border-gray-200 p-2">{{ i+1 }}</td>
                <td class="border border-gray-200 p-2">
                    <vSelect v-model="N.ref_number" :options="REFNUMBER.data" label="ref_number" :reduce="item => item.ref_number" placeholder="--Select Ref Number--" class="text-sm"/>
                </td>
                <td class="border border-gray-200 p-2">
                    <textarea rows="1" v-model="N.remarks" class="bg-gray-200 px-2 py-1 w-full rounded-sm" placeholder="Input Remarks"></textarea>
                </td>
                <td class="border border-gray-200 p-2">
                    <div class="flex flex-col">
                        <div class="w-28 mx-auto object-cover overflow-hidden">
                            <img class="w-full object-cover block" :src="N.evidence_url" alt="" srcset="">
                        </div>
                        <div class="flex justify-center gap-3 p-2">
                            <label for="nfoto" class="rounded bg-blue-500 h-6 w-6 cursor-pointer text-white p-1 flex items-center justify-center"><FontAwesomeIcon :icon="faCameraAlt" size="1x"/></label>
                            <input @change="handleImage($event,i)" id="nfoto" type="file" accept="image/*" class="hidden"/>
                            <label for="nfoto" class="rounded bg-green-500 h-6 w-6 cursor-pointer text-white p-1 flex items-center justify-center"><FontAwesomeIcon :icon="faUpload" size="1xl"/></label>
                        </div>
                    </div>
                </td>
                <td class="border border-gray-200 p-1 gap-2">
                    <div @click="deletFeedback(i)" class="rounded bg-red-500 h-8 w-8 mx-auto cursor-pointer text-white p-1 flex items-center justify-center"><FontAwesomeIcon :icon="faTrash" size="1x"/></div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <div @click="AddNegative" class="cursor-pointer w-fit col-span-3 mt-2 mx-auto text-center rounded-sm py-2 px-4 bg-blue-200 text-gray-800 font-bold text-xs"><FontAwesomeIcon :icon="faPlus" size="1x"/> Add Feedback</div>
    <div v-show="WARNING" class="text-red-500 text-xs text-center">Please check again <span class="font-bold">(Ref Number,Remarks and Evidence) is required!</span></div>
     <div class="flex gap-5 mx-auto text-center justify-end my-4 px-4">
        <div @click="checkForNext" class="cursor-pointer rounded-lg py-2 px-4 bg-green-200 text-gray-800 font-bold text-xs">Continue</div>
    </div>
    <AddNextPort v-if="ADDPOP" @close="AddPop"></AddNextPort>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Breadcumb from '@/components/Breadcumb.vue';
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import { useRouter } from 'vue-router';const routing = useRouter()
import { onMounted, ref, watch } from 'vue';
import { faCameraAlt, faPlus, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import AddNextPort from './AddNextPort.vue';
import { reactive } from 'vue';
import { NFSTORE } from './negativestore';
import { GetData } from '@/api';

const NFSTATE = NFSTORE()
const ADDPOP = ref(false)
const WARNING = ref(false)
const REFNUMBER = reactive({data:[]})
const NEGATIVES = reactive({data:[{id_nf:NFSTATE.nf_id,ref_number:'',remarks:'',evidence:null}]})

watch([NEGATIVES],()=>{
    NFSTATE.detail=NEGATIVES.data
    // console.log(NFSTATE.detail)
})

onMounted( async()=>{
    const ref = await GetData('/negative-feedback-ref')
    REFNUMBER.data = ref.data
    NFSTATE.detail=NEGATIVES.data

})
function AddPop(){
    let change =  !ADDPOP.value
    ADDPOP.value= change
}

function AddNegative(){
    NEGATIVES.data.push({id_nf:NFSTATE.nf_id,ref_number:'',remarks:'',evidence:null, evidence_name:'', evidence_url:''})
}

function deletFeedback(index){
    NFSTATE.detail.splice(index,1)
}

function handleImage(e,index){
    let evidence_name = NFSTATE.generateNameEvidence(e.target.files[0])
    let ev = new File([e.target.files[0]],evidence_name,{ type: e.target.files[0].type })
    NEGATIVES.data[index].evidence = ev
    NEGATIVES.data[index].evidence_name = evidence_name
    NEGATIVES.data[index].evidence_url = URL.createObjectURL(ev)
}   

function checkForNext(){
    if(NEGATIVES.data.every(a=>a.ref_number!=null && a.ref_number!='' && a.remarks!=null && a.remarks!='' && a.evidence_name!=null && a.evidence_name!='')){
        WARNING.value = false
        AddPop()
    }else{
        WARNING.value = true
    }
}

</script>