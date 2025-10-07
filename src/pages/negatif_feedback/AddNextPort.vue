<template>
   <div class="fixed h-screen z-10 top-0 left-0 right-0 flex items-center p-4 w-full" style="background-color: rgba(0,0,0,0.5);">
        <form @submit.prevent="" class="bg-white rounded-lg w-full md:w-96 mx-auto">
            <div class="bg-blue-500 rounded-t-lg text-white p-2 font-bold text-center">Next Port</div>
            <div class="grid grid-rows-auto text-xs p-4 gap-3">
                <div class="flex gap-1 flex-col">
                    <div>Port <span class="text-red-500">*</span></div>
                    <vSelect v-model="NFSTATE.port_destination" :options="ports.data" label="port_name" :reduce="item => item.port_name" placeholder="--Select Port--" class="text-sm"/>
                </div>
            </div>
            <div class="flex gap-5 mx-auto text-center justify-end my-4 px-4">
                <div @click="$emit('close')" class="cursor-pointer rounded-lg font-bold py-2 px-4 bg-red-300 text-gray-800 text-xs">Cancel</div>
                <div @click="SubmitNF" class="cursor-pointer rounded-lg py-2 px-4 bg-green-200 text-gray-800 font-bold text-xs">Save</div>
            </div>
        </form>
    </div>
</template>

<script setup>
    import { Page } from '@/router';
    import { reactive } from 'vue';
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { GetData, PostData, PostDataMTP } from '@/api';
    import { NFSTORE } from './negativestore';
    import vSelect from 'vue-select'
    import 'vue-select/dist/vue-select.css';
    import { Failed, Success } from '@/sweet';
    const NFSTATE = NFSTORE()
    const routing = useRouter()

    let ports = reactive({data:[]})
    const emit = defineEmits(['close'])
    onMounted(async()=>{
        loadPorts()
    })

async function loadPorts(){
        let res = await GetData('/list-master-port')
        ports.data = res.data
    }

async function SubmitNF(){
    NFSTATE.sscl_id = NFSTATE.generateID('SSCL')
    NFSTATE.evidences = NFSTATE.detail.map(a=>a.evidence)
    console.log(NFSTATE.evidences)
    let res = await PostData('/add-negative-feedback',NFSTATE.$state)
    const formData = new FormData();
    NFSTATE.evidences.forEach(a=>{
        formData.append('evidences',a)
    })
    let r = await PostDataMTP('/upload-evidences',formData)

    if(res.data.affected>0){
        Success('Negative Feedback Reported',()=>{
            Page('negative-feedback',routing)
            emit('close')
        })
    }else{
        Failed('SSCL Not Added',()=>{emit('close')})
    }
}
</script>