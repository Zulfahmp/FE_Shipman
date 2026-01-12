<script setup>
    import { PostData } from '@/api';
    import { Page } from '@/router';
import { Failed, Success } from '@/sweet';
    import { useRouter } from 'vue-router';
    let {sscl_id,ship_name,status_sscl} = defineProps({
        sscl_id:{
            type:String,
            required:true
        },
        ship_name:{
            type:String,
            required:true
        },
        status_sscl:{
            type:Number,
            required:true
        }
    })
    const routing = useRouter()
    const emit = defineEmits(['close'])
    
    async function ssclApprove(){
        if(status_sscl==1){
            let res = await PostData('/sscl-approval',JSON.stringify({sscl_id:sscl_id,status_sscl:1}))
            console.log(res)
            if(res.data.affected>0){
                Success('SSCL Approved',async()=>{
                    emit('close')
                })
            }else{
                Failed('Failed to Approve SSCL',()=>{
                    emit('close')
                })
            }
        }
    }
    async function ssclReject(){
        if(status_sscl==0){
            let res = await PostData('/sscl-approval',{sscl_id:sscl_id,status_sscl:0})
            if(res.data.affected>0){
                Success('SSCL Rejected',async()=>{
                    emit('close')
                })
            }else{
                Failed('Failed to Reject SSCL',()=>{
                    emit('close')
                })
            }
        }
    }
</script>
<template>
     <div class="fixed h-screen z-10 top-0 left-0 right-0 flex items-center p-4 w-full" style="background-color: rgba(0,0,0,0.5);">
        <div class="bg-white rounded-lg w-full md:w-96 mx-auto">
            <div class="bg-blue-500 rounded-t-lg text-white p-2 font-bold text-center">Approval SSCL</div>
            <div class="text-sm text-center mt-5 w-full font-bold">I hereby approve the Ship Shore Safety Checklist (SSCL) for the following vessel</div>
            <div class="text-sm text-center mb-2 w-full">Dengan ini saya menyetujui Ship Shore Safety Checklist(SSCL) untuk kapal berikut</div>
            <div class="font-bold text-md text-center">{{ship_name}}</div>
            <div class="flex gap-10 mx-auto text-center justify-center my-4">
                <div @click="$emit('close')" class="cursor-pointer rounded-lg font-bold py-2 px-4 bg-gray-300 text-gray-800 text-xs">Cancel</div>
                <div v-if="status_sscl==1" @click="ssclApprove" class="cursor-pointer rounded-lg py-2 px-4 bg-green-400 text-gray-800 font-bold text-xs">Approve</div>
                <div v-if="status_sscl==0" @click="ssclReject" class="cursor-pointer rounded-lg py-2 px-4 bg-red-400 text-gray-800 font-bold text-xs">Decline</div>
            </div>
        </div>
    </div>
</template>