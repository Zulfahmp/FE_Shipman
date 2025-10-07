<script setup>
    import { reactive,onMounted } from 'vue';
    import axios from 'axios';
    import Swal from 'sweetalert2';
    import { Failed, Success } from '@/sweet';
    import { PostData } from '@/api';

    const {data_user} = defineProps({
        data_user:{
            type:Object,
            required:true
        }
    })

    const errors = reactive({role: '',full_name:'',email:''})
    const user = reactive({user_id:0,role:0,full_name:'',email:''})


    onMounted(()=>{
        user.user_id=data_user.user_id
        user.full_name=data_user.full_name
        user.role=data_user.role
        user.email=data_user.email
    })

    function resetErrors(){Object.keys(errors).forEach(a=>{errors[a]=''})}
    function resetValue(){Object.keys(user).forEach(a=>{user[a]=''})}
    function checkerRequired(name,val){return val=='' ? 'The '+name.replace('_',' ')+' is required' : ''}
    const re = /^[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,63}$/;
    function checkerEmail(name,email) {return re.test(String(email.toLowerCase()).trim()) ? '' : 'The '+name.replace('_',' ')+' is invalid'}

    let emit = defineEmits(['close'])

    function handleClose(){
        resetErrors()
        emit('close')
    }

    async function EditUser(){
        Object.keys(user).forEach(a=>{
            errors[a] = checkerRequired(a,user[a])
        })
        errors.email = errors.email=='' ? checkerEmail('email',user.email) : errors.email
        if(Object.keys(errors).some(a=>errors[a]!='')){
            return
        }
        user.user_id=data_user.user_id
        let res = await PostData('/edit-user',user)
        if(res.data.affected>0){
            Success('Update Successful!',()=>{emit('close');resetValue()})
        }else if(res.data.affected==-1){
            errors.email = 'This email is already registered'
        }else{
            Failed('Update Unsuccessful, Please try again',()=>{emit('close')})
        }
    }
</script>
<template>
    <div class="fixed h-screen z-10 top-0 left-0 right-0 flex items-center p-4 w-full" style="background-color: rgba(0,0,0,0.5);">
        <form @submit.prevent="EditUser" class="bg-white rounded-lg w-full md:w-96 mx-auto">
            <div class="bg-blue-500 rounded-t-lg text-white p-2 font-bold text-center">Edit User</div>
            <div class="grid grid-rows-auto text-xs p-4 gap-1">
                <div class="flex gap-1 flex-col">
                    <div>User Role <span class="text-red-500">*</span></div>
                    <select v-model="user.role" id="role" class="p-2 bg-gray-100 rounded-sm" placeholder="Input User Role">
                        <option value="" selected>-- Select --</option>
                        <option value="1">Admin</option>
                        <option value="2">Verifier</option>
                        <option value="3">Checker</option>
                    </select>
                    <div class="text-right text-red-600 text-xs">{{ errors.role }}</div>
                </div>
                <div class="flex gap-1 flex-col">
                    <div>Employee Name <span class="text-red-500">*</span></div>
                    <input v-model="user.full_name" id="full_name" type="text" maxlength="100" class="p-2 bg-gray-100 rounded-sm" placeholder="Input Employee Name"/>
                    <div class="text-right text-red-600 text-xs">{{ errors.full_name }}</div>
                </div>
                <div class="flex gap-1 flex-col">
                    <div>Employee Email<span class="text-red-500">*</span></div>
                    <input v-model="user.email" id="email" type="text" maxlength="100" class="p-2 bg-gray-100 rounded-sm" placeholder="Input Employee Email"/>
                    <div class="text-right text-red-600 text-xs">{{ errors.email }}</div>
                </div>
            </div>
            <div class="flex gap-5 mx-auto text-center justify-end my-4 px-4">
                <div @click="handleClose" class="cursor-pointer rounded-lg font-bold py-2 px-4 bg-red-300 text-gray-800 text-xs">Cancel</div>
                <button type="submit" class="cursor-pointer rounded-lg py-2 px-4 bg-green-200 text-gray-800 font-bold text-xs">Update</button>
            </div>
        </form>
    </div>
</template>