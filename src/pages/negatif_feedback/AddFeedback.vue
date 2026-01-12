<template>
       <div class="fixed h-screen z-10 top-0 left-0 right-0 flex items-center p-4 w-full" style="background-color: rgba(0,0,0,0.5);">
        <form @submit.prevent="" class="bg-white rounded-lg w-full md:w-96 mx-auto">
            <div class="bg-blue-500 rounded-t-lg text-white p-2 font-bold text-center">Add Feedback</div>
            <div class="grid grid-rows-auto text-xs p-4 gap-3">
                <div class="flex gap-1 flex-col">
                    <div>Ship Name <span class="text-red-500">*</span></div>
                     <vSelect v-model="NFSTATE.ship_id" :options="master.ship" label="ship_name" :reduce="item => item.ship_id" placeholder="--Select Ship--" class="text-sm"/>
                </div>
                <div class="flex gap-1 flex-col">
                    <div>Port Name <span class="text-red-500">*</span></div>
                    <vSelect v-model="NFSTATE.port_id" :options="master.port" label="port_name" :reduce="item => item.port_id" placeholder="--Select Port--" class="text-sm"/>
                </div>
            </div>
            <div class="flex gap-5 mx-auto text-center justify-end my-4 px-4">
                <div @click="handleClose" class="cursor-pointer rounded-lg font-bold py-2 px-4 bg-red-300 text-gray-800 text-xs">Cancel</div>
                <button @click="Continue" :disabled="!NEXT" :class="NEXT ? 'text-gray-800' : 'text-gray-400'" class="cursor-pointer rounded-lg py-2 px-4 bg-green-200 font-bold text-xs">Continue</button>
            </div>
        </form>
    </div>
</template>

<script setup>
    import { Page } from '@/router';
    import { useRouter } from 'vue-router';
    import { NFSTORE } from './negativestore';
    import { onMounted, watch } from 'vue';
    import { AuthConfig } from '@/authconfig';
    import vSelect from 'vue-select'
    import 'vue-select/dist/vue-select.css';
    import { reactive } from 'vue';
    import { GetData } from '@/api';
    import { ref } from 'vue';
    const AUTH = AuthConfig()
    const NEXT = ref(false)
    const routing = useRouter()
    const NFSTATE = NFSTORE()
    const emit = defineEmits(['close'])
    const master = reactive({ship:[],port:[],berth:[],cargo:[]})

    watch([NFSTATE],()=>{
        NEXT.value = (NFSTATE.ship_id != '' && NFSTATE.ship_id != null && NFSTATE.port_id!='' && NFSTATE.port_id!=null)
    })

    onMounted(async()=>{
        NFSTATE.resetNF()
        NFSTATE.created_by = AUTH.full_name 
        let res = await GetData('/sscl-master');
        master.ship = res.data.ship
        master.port = res.data.port
    })
    
    function Continue(){
        NFSTATE.nf_id = NFSTATE.generateID()
        Page('negative-feedback-add',routing)
    }
    function handleClose(){
        emit('close')
        NFSTATE.resetNF()
    }
</script>