<script setup>
    import { reactive } from 'vue';
    import { PostData } from '@/api';
    import { Failed, Success } from '@/sweet';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

    const errors = reactive({old_password:'',new_password:'',confirm_password:''})
    const pass = reactive({old_password:'',new_password:'',confirm_password:''})
    const passview = reactive({old_password:false,new_password:false,confirm_password:false})

    function resetErrors(){Object.keys(errors).forEach(a=>{errors[a]=''})}
    function resetValue(){Object.keys(pass).forEach(a=>{pass[a]=''})}
    function checkerRequired(name,val){return val=='' ? 'The '+name.replace('_',' ')+' is required' : ''}
    const re = /^[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,63}$/;

    let emit = defineEmits(['close'])

    function handleClose(){
        resetErrors()
        emit('close')
    }
    
    function checkNewPassword(){
        errors.new_password = ''
        if(pass.new_password.length<8){
            errors.new_password = 'Min 8 Character'
        }else if(!/\d/.test(pass.new_password)){
            errors.new_password = 'Min 1 Number'
        }else if(!/[!@#$%^&*(),.?":{}|<>]/.test(pass.new_password)){
            errors.new_password = 'Min 1 Symbol'
        }
    }

    function IsMatchPassword(){
        errors.confirm_password = ''
        if(pass.new_password!=pass.confirm_password){
            errors.confirm_password = 'Password does not match!'
        }
    }

    async function UpdatePassword(){
        Object.keys(pass).forEach(a=>{
            errors[a] = checkerRequired(a,pass[a])
        })
        errors['new_password']=='' && checkNewPassword()
        errors['confirm_password']=='' && IsMatchPassword()
        if(Object.keys(errors).some(a=>errors[a]!='')){
            return
        }
        let res = await PostData('/change-password',pass)
        if(res.data.affected>0){
            Success('New Password Saved!',()=>{resetValue();emit('close')})
        }else if(res.data.affected==-2){
            Failed('Old Password Not Correct!',()=>{emit('close')})
        }else{
            Failed('New Password Not Saved!',()=>{emit('close')})
        }
    }
</script>
<template>
    <div class="fixed h-screen z-10 top-0 left-0 right-0 flex items-center p-4 w-full" style="background-color: rgba(0,0,0,0.5);">
        <form @submit.prevent="UpdatePassword()" class="bg-white rounded-lg w-full md:w-96 mx-auto">
            <div class="bg-blue-500 rounded-t-lg text-white p-2 font-bold text-center">Change Password</div>
            <div class="grid grid-rows-auto text-xs p-4 gap-1">
                <div class="flex gap-1 flex-col">
                    <div>Old Password <span class="text-red-500">*</span></div>
                    <div class="flex items-center justify-center">
                        <input v-model="pass.old_password" id="old_password" :type="passview.old_password ? 'text' : 'password'" maxlength="100" class="p-2 bg-gray-100 rounded-l-sm w-full outline-none" placeholder="Enter Old Password"/>
                        <div @click="passview.old_password=!passview.old_password" class="px-3 bg-blue-500 text-white py-2 rounded-r-sm cursor-pointer"><FontAwesomeIcon :icon="passview.old_password ? faEye : faEyeSlash" class="pointer-events-none"></FontAwesomeIcon></div>
                    </div>
                    <div class="text-right text-red-600 text-xs">{{ errors.old_password}}</div>
                </div>
                <div class="flex gap-1 flex-col">
                    <div>New Password<span class="text-red-500">*</span></div>
                    <div class="flex items-center justify-center">
                        <input @keyup="checkNewPassword" v-model="pass.new_password" id="new_password" :type="passview.new_password ? 'text' : 'password'" maxlength="100" class="p-2 bg-gray-100 rounded-l-sm w-full outline-none" placeholder="Enter Old Password"/>
                        <div @click="passview.new_password=!passview.new_password" class="px-3 bg-blue-500 text-white py-2 rounded-r-sm cursor-pointer"><FontAwesomeIcon :icon="passview.new_password ? faEye : faEyeSlash" class="pointer-events-none"></FontAwesomeIcon></div>
                    </div>
                    <div class="text-right text-red-600 text-xs">{{ errors.new_password }}</div>
                </div>
                <div class="flex gap-1 flex-col">
                    <div>Re-New Password<span class="text-red-500">*</span></div>
                    <div class="flex items-center justify-center">
                        <input @keyup="IsMatchPassword" v-model="pass.confirm_password" id="confirm_password" :type="passview.confirm_password ? 'text' : 'password'" maxlength="100" class="p-2 bg-gray-100 rounded-l-sm w-full outline-none" placeholder="Enter Re-New Password"/>
                        <div @click="passview.confirm_password=!passview.confirm_password" class="px-3 bg-blue-500 text-white py-2 rounded-r-sm cursor-pointer"><FontAwesomeIcon :icon="passview.confirm_password ? faEye : faEyeSlash" class="pointer-events-none"></FontAwesomeIcon></div>
                    </div>
                    <div class="text-right text-red-600 text-xs">{{ errors.confirm_password }}</div>
                </div>
            </div>
            <div class="flex gap-5 mx-auto text-center justify-end my-4 px-4">
                <div @click="handleClose" class="cursor-pointer rounded-lg font-bold py-2 px-4 bg-red-300 text-gray-800 text-xs">Cancel</div>
                <button type="submit" class="cursor-pointer rounded-lg py-2 px-4 bg-green-200 text-gray-800 font-bold text-xs">Change Password</button>
            </div>
        </form>
    </div>
</template>