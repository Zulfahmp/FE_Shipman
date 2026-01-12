<script setup>
    import { onMounted, ref,defineComponent, nextTick } from 'vue';
    import vSelect from 'vue-select'
    import 'vue-select/dist/vue-select.css';
    import { Page } from '@/router';
    import { useRouter } from 'vue-router';
    import { GetData, PostData } from '@/api';
    import { reactive } from 'vue';
    import { SSCLSTORE } from './ssclstore';
    import flatpickr from "flatpickr";
    import { Failed, Success } from '@/sweet';
    import { AuthConfig } from '@/authconfig';
    import { watch } from 'vue';
    let AUTH = AuthConfig()
    let SSCL_STATE = SSCLSTORE()
    const routing = useRouter()
    const master = reactive({ship:[],port:[],berth:[],cargo:[]})
    const NEXT = ref(false)

    watch(SSCL_STATE,()=>{
        let listen = ['officer_name','officer_position','officer_contact','ship_id','port_id','berth_id','cargo_id','date_arrival','time_arrival']
        let ls = listen.map(a=>SSCL_STATE[a]!='' && SSCL_STATE[a]!=0)
        NEXT.value = ls.every(a=>a)
    })

    const emit = defineEmits(['close'])
    onMounted(async ()=>{
        let res = await GetData('/sscl-master');
        master.ship = res.data.ship
        master.port = res.data.port
        master.berth = res.data.berth
        master.cargo = res.data.cargo
        await nextTick(); // tunggu DOM selesai dirender
        flatpickr("#date-arrival", {
            dateFormat:"Y-m-d",
            disableMobile: true,
            defaultDate:new Date()
        });
        let now = new Date()
        SSCL_STATE.created_by = AUTH.full_name
        SSCL_STATE.date_arrival = now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,"0")+'-'+String(now.getDate()).padStart(2,"0")
        SSCL_STATE.time_arrival = String(now.getHours()).padStart(2,"0")+':'+String(now.getMinutes()).padStart(2,"0")
        // console.log(SSCL_STATE.date_arrival)
        flatpickr("#time-arrival", {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            time_24hr: true,
            defaultDate: new Date(),
            disableMobile: true
        });
    })

    async function ContinueSSCL(){
        SSCL_STATE.sscl_id = SSCL_STATE.generateID('SSCL')
        Page('sscl-terms-and-conditions',routing)
    }

    function Cancel(){
        emit('close')
        SSCL_STATE.resetSSCL()
    }
</script>

<template>
    <div class="fixed h-screen z-10 top-0 left-0 right-0 flex items-center p-4 w-full" style="background-color: rgba(0,0,0,0.5);">
        <form @submit.prevent="ContinueSSCL" class="bg-white rounded-lg w-full md:w-96 mx-auto">
            <div class="bg-blue-500 rounded-t-lg text-white p-2 font-bold text-center">Add SSCL</div>
            <div class="grid grid-rows-auto text-xs p-4 gap-3 h-100 overflow-y-auto scrollbar-thin">
                <div class="flex gap-1 flex-col">
                    <div>Officer Name <span class="text-red-500">*</span></div>
                    <input v-bind:maxlength="40" v-model="SSCL_STATE.officer_name" type="text" class="p-2 bg-gray-100 rounded-sm uppercase" placeholder="Input Officer Name"/>
                </div>
                <div class="flex gap-1 flex-col">
                    <div>Officer Position <span class="text-red-500">*</span></div>
                    <input v-bind:maxlength="40" v-model="SSCL_STATE.officer_position" type="text" class="p-2 bg-gray-100 rounded-sm uppercase" placeholder="Input Officer Position"/>
                </div>
                <div class="flex gap-1 flex-col">
                    <div>Officer Contact <span class="text-red-500">*</span></div>
                    <input v-model="SSCL_STATE.officer_contact" type="tel" v-bind:maxlength="16" @input="SSCL_STATE.officer_contact = SSCL_STATE.officer_contact.replace(/[^0-9]/g, '')" placeholder="08xxxxxxx" maxlength="100" class="p-2 bg-gray-100 rounded-sm uppercase"/>
                </div>
                <div class="flex gap-1 flex-col">
                    <div>Ship Name <span class="text-red-500">*</span></div>
                     <vSelect v-model="SSCL_STATE.ship_id" :options="master.ship" label="ship_name" :reduce="item => item.ship_id" placeholder="--Select Ship--" class="text-sm"/>
                </div>
                <div class="flex gap-1 flex-col">
                    <div>Port Name <span class="text-red-500">*</span></div>
                    <vSelect v-model="SSCL_STATE.port_id" :options="master.port" label="port_name" :reduce="item => item.port_id" placeholder="--Select Port--" class="text-sm"/>
                </div>
                <div class="flex gap-1 flex-col">
                    <div>Berth Name <span class="text-red-500">*</span></div>
                    <vSelect v-model="SSCL_STATE.berth_id" :options="master.berth" label="berth_name" :reduce="item => item.berth_id" placeholder="--Select Berth--" class="text-sm"/>
                </div>
                <div class="flex gap-1 flex-col">
                    <div>Cargo  <span class="text-red-500">*</span></div>
                    <vSelect v-model="SSCL_STATE.cargo_id" :options="master.cargo" label="cargo_name" :reduce="item => item.cargo_id" placeholder="--Select Cargo--" class="text-sm"/>
                </div>
                <div class="flex gap-1 flex-col">
                    <div>Date of Arrival <span class="text-red-500">*</span></div>
                    <input v-model="SSCL_STATE.date_arrival" v-once id="date-arrival" type="text" class="p-2 bg-gray-100 rounded-sm" placeholder="Input Date of Arrival"/>
                </div>
                <div class="flex gap-1 flex-col">
                    <div>Time of Arrival <span class="text-red-500">*</span></div>
                    <input v-model="SSCL_STATE.time_arrival" v-once id="time-arrival" type="text" class="p-2 bg-gray-100 rounded-sm" placeholder="Input Time of Arrival"/>
                </div>
            </div>
            <div class="flex gap-5 mx-auto text-center justify-end my-4 px-4">
                <div @click="Cancel" class="cursor-pointer rounded-lg font-bold py-2 px-4 bg-red-300 text-gray-800 text-xs">Cancel</div>
                <button :disabled="!NEXT" type="submit" :class="NEXT ? 'text-gray-800' : 'text-gray-400'" class="cursor-pointer rounded-lg py-2 px-4 bg-green-200 font-bold text-xs">Continue</button>
            </div>
        </form>
    </div>
</template>