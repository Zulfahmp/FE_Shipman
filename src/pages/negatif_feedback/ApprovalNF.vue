<script setup>
    import { PostData } from '@/api';
    import { Page } from '@/router';
    import { Failed, Success } from '@/sweet';
    import { useRouter } from 'vue-router';
    import { NFAPRSTORE } from './negativeaprstore';
    let NFAPR = NFAPRSTORE()
    let {nf_id,ship_name,port_name,status_nf} = defineProps({
        nf_id:{
            type:String,
            required:true
        },
        ship_name:{
            type:String,
            required:true
        },
        port_name:{
            type:String,
            required:true
        },
        id_approval:{
            type:Number,
            required:true
        },
        status_nf:{
            type:Number,
            required:true
        }
    })
    const routing = useRouter()
    const emit = defineEmits(['close'])
    
    async function nfApprove(){
        if(status_nf==1){
            let res = await PostData('/nf-approval',NFAPR.$state)
            // console.log(res)
            if(res.data.affected>0){
                Success('Negative Feedback Approved',async()=>{
                    emit('close')
                })
            }else{
                Failed('Failed to Approve Negative Feedback',()=>{
                    emit('close')
                })
            }
        }
    }
    async function nfReject(){
        if(status_nf==0){
            let res = await PostData('/nf-approval',NFAPR.$state)
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
            <div class="bg-blue-500 rounded-t-lg text-white p-2 font-bold text-center">Approval Negative Fedback</div>
            <div class="text-sm text-center mt-5 w-full font-bold">I hereby approve the Negative Feedbcak for the following vessel</div>
            <div class="text-sm text-center mb-2 w-full">Dengan ini saya menyetujui Negative Feedbcak untuk kapal berikut</div>
            <div class="font-bold text-md text-center">{{ship_name}}</div>
            <div class="flex gap-10 mx-auto text-center justify-center my-4">
                <div @click="$emit('close')" class="cursor-pointer rounded-lg font-bold py-2 px-4 bg-gray-300 text-gray-800 text-xs">Cancel</div>
                <div v-if="status_nf==1" @click="nfApprove" class="cursor-pointer rounded-lg py-2 px-4 bg-green-400 text-gray-800 font-bold text-xs">Approve</div>
                <div v-if="status_nf==0" @click="nfReject" class="cursor-pointer rounded-lg py-2 px-4 bg-red-400 text-gray-800 font-bold text-xs">Decline</div>
            </div>
        </div>
    </div>
</template>