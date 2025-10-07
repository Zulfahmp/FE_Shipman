<script setup>
    import { onMounted, ref,defineComponent } from 'vue';
    import vSelect from 'vue-select'
    import 'vue-select/dist/vue-select.css';
    import { Page } from '@/router';
    import { useRouter } from 'vue-router';
    import { GetData, PostData } from '@/api';
    import { reactive } from 'vue';
    import { SSCLSTORE } from './ssclstore';
    import flatpickr from "flatpickr";
    import { Failed, Success } from '@/sweet';
    let SSCL_STATE = SSCLSTORE()
    const routing = useRouter()
    const master = reactive({ship:[],port:[],berth:[],cargo:[]})

    const emit = defineEmits(['close'])
    onMounted(async ()=>{
        let res = await GetData('/sscl_master');
        master.ship = res.data.ship
        master.port = res.data.port
        master.berth = res.data.berth
        master.cargo = res.data.cargo

        flatpickr("#date-arrival", {});
        flatpickr("#time-arrival", {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            time_24hr: true});
    })
async function ContinueSSCL(){
    SSCL_STATE.sscl_id = SSCL_STATE.generateID('SSCL')
    // let res = await PostData('/add-sscl',SSCL_STATE.$state)
    Page('sscl-terms-and-conditions',routing)
}

</script>

<template>
    <div class="fixed h-screen z-10 top-0 left-0 right-0 flex items-center p-4 w-full" style="background-color: rgba(0,0,0,0.5);">
        <form @submit.prevent="ContinueSSCL" class="bg-white rounded-lg w-full md:w-96 mx-auto">
            <div class="bg-blue-500 rounded-t-lg text-white p-2 font-bold text-center">Add SSCL</div>
            <div class="grid grid-rows-auto text-xs p-4 gap-3 h-100 overflow-y-auto scrollbar-thin">
                <div class="flex gap-1 flex-col">
                    <div>Officer Name <span class="text-red-500">*</span></div>
                    <input v-model="SSCL_STATE.officer_name" maxlength="100" type="text" class="p-2 bg-gray-100 rounded-sm" placeholder="Input Ship Name"/>
                </div>
                <div class="flex gap-1 flex-col">
                    <div>Officer Position <span class="text-red-500">*</span></div>
                    <input v-model="SSCL_STATE.officer_position" type="text" maxlength="100" class="p-2 bg-gray-100 rounded-sm" placeholder="Input Port Name"/>
                </div>
                <div class="flex gap-1 flex-col">
                    <div>Officer Contact <span class="text-red-500">*</span></div>
                    <input v-model="SSCL_STATE.officer_contact" type="text" maxlength="100" class="p-2 bg-gray-100 rounded-sm" placeholder="Input Port Name"/>
                </div>
                <div class="flex gap-1 flex-col">
                    <div>Ship Name <span class="text-red-500">*</span></div>
                     <vSelect v-model="SSCL_STATE.ship_name" :options="master.ship" label="ship_name" :reduce="item => item.ship_name" placeholder="--Select Ship--" class="text-sm"/>
                </div>
                <div class="flex gap-1 flex-col">
                    <div>Port Name <span class="text-red-500">*</span></div>
                    <vSelect v-model="SSCL_STATE.port_name" :options="master.port" label="port_name" :reduce="item => item.port_name" placeholder="--Select Port--" class="text-sm"/>
                </div>
                <div class="flex gap-1 flex-col">
                    <div>Berth Name <span class="text-red-500">*</span></div>
                    <vSelect v-model="SSCL_STATE.berth_name" :options="master.berth" label="berth_name" :reduce="item => item.berth_name" placeholder="--Select Berth--" class="text-sm"/>
                </div>
                <div class="flex gap-1 flex-col">
                    <div>Cargo  <span class="text-red-500">*</span></div>
                    <vSelect v-model="SSCL_STATE.cargo_name" :options="master.cargo" label="cargo_name" :reduce="item => item.cargo_name" placeholder="--Select Cargo--" class="text-sm"/>
                </div>
                <div class="flex gap-1 flex-col">
                    <div>Date of Arrival <span class="text-red-500">*</span></div>
                    <input v-model="SSCL_STATE.date_arrival" id="date-arrival" type="date" class="p-2 bg-gray-100 rounded-sm" placeholder="Input Date of Arrival"/>
                </div>
                <div class="flex gap-1 flex-col">
                    <div>Time of Arrival <span class="text-red-500">*</span></div>
                    <input v-model="SSCL_STATE.time_arrival" id="time-arrival"type="date" class="p-2 bg-gray-100 rounded-sm" placeholder="Input Time of Arrival"/>
                </div>
            </div>
            <div class="flex gap-5 mx-auto text-center justify-end my-4 px-4">
                <div @click="$emit('close')" class="cursor-pointer rounded-lg font-bold py-2 px-4 bg-red-300 text-gray-800 text-xs">Cancel</div>
                <button type="submit" class="cursor-pointer rounded-lg py-2 px-4 bg-green-200 text-gray-800 font-bold text-xs">Continue</button>
                <!-- <div @click="Page('sscl-terms-and-conditions',routing)" class="cursor-pointer rounded-lg py-2 px-4 bg-green-200 text-gray-800 font-bold text-xs">Continue</div> -->
            </div>
        </form>
    </div>
</template>