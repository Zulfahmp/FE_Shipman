<script setup>
    import { ref,reactive, onMounted } from 'vue';
    import axios from 'axios'
    import { Failed, Success } from '@/sweet';
    import { PostData } from '@/api';

    const {data_ship} = defineProps({
        data_ship : {
            type : Object,
            required : true
        }
    })

    const errors = reactive({ship_name: '',ship_code:''})
    const ship = reactive({ship_id:0,ship_name:'',ship_code:''})

    onMounted(()=>{
        ship.ship_id = data_ship.ship_id
        ship.ship_name = data_ship.ship_name
        ship.ship_code = data_ship.ship_code
    })

    const emit = defineEmits(['close'])

    function handleClose(){
        resetErrors()
        resetValue()
        emit('close')
    }

    function checkerRequired(name,val){
        return val=='' ? 'The '+name.replace('_',' ')+' is required' : ''
    }
     function resetErrors(){
        Object.keys(errors).forEach(a=>{
            errors[a]=''
        })
    }
    function resetValue(){
        Object.keys(ship).forEach(a=>{
            ship[a]=''
        })
    }

    async function Submit(){
        Object.keys(ship).forEach(a=>{
            errors[a] = checkerRequired(a,ship[a])
        })
      
        if(Object.keys(errors).some(a=>errors[a]!='')){
            return
        }

        let res = await PostData('/edit-master-ship',ship)
        if(res.data.affected>0){
            Success('Update Successful!',()=>{resetValue();emit('close')})
        }else if(res.data.affected==-1){
            errors.ship_code = 'This Ship Code is already registered'
        }else{
            Failed('Update Failed!',()=>{emit('close')})
        }
    }
</script>
<template>
    <div class="fixed h-screen z-10 top-0 left-0 right-0 flex items-center p-4 w-full" style="background-color: rgba(0,0,0,0.5);">
        <form @submit.prevent="Submit" class="bg-white rounded-lg w-full md:w-96 mx-auto">
            <div class="bg-blue-500 rounded-t-lg text-white p-2 font-bold text-center">Edit Master Data Ship</div>
            <div class="grid grid-rows-auto text-xs p-4 gap-3">
                <div class="flex gap-1 flex-col">
                    <div>Ship Name <span class="text-red-500">*</span></div>
                    <input v-model="ship.ship_name" id="ship_name" type="text" maxlength="100" class="p-2 bg-gray-100 rounded-sm" placeholder="Input Ship Name"/>
                    <div class="text-right text-red-600 text-xs">{{ errors.ship_name }}</div>
                </div>
                <div class="flex gap-1 flex-col">
                    <div>Ship Code <span class="text-red-500">*</span></div>
                    <input v-model="ship.ship_code" id="ship_code" type="text" maxlength="100" class="p-2 bg-gray-100 rounded-sm" placeholder="Input Ship Code"/>
                    <div class="text-right text-red-600 text-xs">{{ errors.ship_code }}</div>
                </div>
            </div>
            <div class="flex gap-5 mx-auto text-center justify-end my-4 px-4">
                <div @click="handleClose" class="cursor-pointer rounded-lg font-bold py-2 px-4 bg-red-300 text-gray-800 text-xs">Cancel</div>
                <button type="submit" class="cursor-pointer rounded-lg py-2 px-4 bg-green-200 text-gray-800 font-bold text-xs">Save</button>
            </div>
        </form>
    </div>
</template>