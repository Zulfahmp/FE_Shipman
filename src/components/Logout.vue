<script setup>
    import { AuthConfig } from '@/authconfig';
    import { Page } from '@/router';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    const routing = useRouter()
    const emit = defineEmits(['close'])

    function logout(){
        let Auth = AuthConfig()
        Auth.setAuth({is_authenticated:false,role:0,full_name:'',position:''})
        localStorage.removeItem('auth_token');
        Page('login',routing)
        emit('close')
    }
</script>
<template>
    <div class="fixed h-screen z-10 top-0 flex items-center p-4 w-full" style="background-color: rgba(0,0,0,0.5);">
        <div class="bg-white rounded-lg w-full md:w-96 mx-auto">
            <div class="bg-blue-500 rounded-t-lg text-white p-2 font-bold text-center">Exit</div>
            <div class="text-sm text-center mt-5">Are you sure want to log out?</div>
            <div class="flex gap-10 mx-auto text-center justify-center my-4">
                <div @click="$emit('close')" class="cursor-pointer rounded-lg font-bold py-2 px-4 bg-red-300 text-gray-800 text-xs">Cancel</div>
                <div @click="logout" class="cursor-pointer rounded-lg py-2 px-4 bg-green-200 text-gray-800 font-bold text-xs">Logout</div>
            </div>
        </div>
    </div>
</template>