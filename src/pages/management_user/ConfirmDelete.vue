<script setup>
    import { useRouter } from 'vue-router';
    import axios from 'axios';
    import Swal from 'sweetalert2';
    let prop = defineProps({
        full_name: {
            type: String,
            required: true,
        },
        user_id: {
            type: Number,
            required: true,
        },
    })
    let emit = defineEmits(['close'])

    function DeleteUser(){
        const token = localStorage.getItem('auth_token');
        axios.post(import.meta.env.VITE_API+'/delete-user',{user_id:prop.user_id},{headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`}}).then(res=>{
            if(res.data.affected){
                Swal.fire({
                    title: 'Successfully!',
                    text: `User ${prop.full_name} Deleted!`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        emit('close')
                    }
                });
            }else{
                Swal.fire({
                    title: 'Failed!',
                    text: 'User Not Deleted',
                    icon: 'danger',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        emit('close')
                    }
                });
            }
        })
    }
</script>
<template>
    <div class="fixed h-screen z-10 top-0 left-0 right-0 flex items-center p-4 w-full" style="background-color: rgba(0,0,0,0.5);">
        <div class="bg-white rounded-lg w-full md:w-96 mx-auto">
            <div class="bg-blue-500 rounded-t-lg text-white p-2 font-bold text-center">Delete User</div>
            <div class="text-center font-xs my-2">Are you sure want to delete user? <div class="font-bold">{{ full_name }}</div></div>
            <div class="flex gap-5 justify-center text-center my-4 px-4">
                <div @click="$emit('close')" class="cursor-pointer rounded-lg font-bold py-2 px-4 bg-red-300 text-gray-800 text-xs">Cancel</div>
                <div @click="DeleteUser" class="cursor-pointer rounded-lg py-2 px-4 bg-green-200 text-gray-800 font-bold text-xs">Delete</div>
            </div>
        </div>
    </div>
</template>