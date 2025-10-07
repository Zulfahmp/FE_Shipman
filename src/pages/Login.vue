<script setup>
  import { Page} from '@/router';
  import { useRouter } from 'vue-router';
  import { reactive,ref } from 'vue';
  import { AuthConfig } from '@/authconfig';
  const Auth = AuthConfig()
  let email = ref('admin@gmail.com')
  let logintext = reactive({text:'Login'})
  let password = ref('abcd')
  let isInCorrect = ref(false)
  let errors = reactive({error_password:'',error_email:''})
  const routing = useRouter()
    defineProps({
  msg: {
    type: String,
    required: false,
  },
})

function AuthorizationChecking(e){
    e.preventDefault();
    isInCorrect.value = false
    let check = {password:false,email:false}
    if(/[!=]/.test(email) || /[!=]/.test(password)){
        errors.error_email = 'The email is incorrect'
        errors.error_password = 'The password is incorrect'
        return
    }

    if(email.value==''){
        errors.error_email = 'The email is required'
        check.email = false
    }else if(!email.value.includes('@')){
        errors.error_email = 'The email is incorrect'
        check.email = false
    }else{
        errors.error_email = ''
        check.email = true
    }
    
    if(password.value==''){
        errors.error_password = 'The password is required'
        check.password = false
    }else if(password.value.length<4){
        errors.error_password = 'The password too short'
        check.password = false
    }else{
        errors.error_password = ''
        check.password = true
    }
    if(!check.password || !check.email){
        return
    }

    logintext.text = 'Logging in...'
    fetch(import.meta.env.VITE_API+'/authorization-checking',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:email.value,password:password.value})}).then(res=>res.json()).then(res=>{
        setTimeout(()=>{
            logintext.text='Login'
            errors.error_email = ''
            errors.error_password = ''
            if(res.authenticated){
                Auth.setAuth(res)
                localStorage.setItem('auth_token',res.token)
                Page('dashboard',routing)
            }else{
                isInCorrect.value = true
            }
        },1000)
    })
}
</script>

<template>
    <img src="/ship.jpeg" class="mx-auto block h-20 object-cover w-full" alt="">
    <div class="p-5 bg-white h-screen">
        <div class="flex justify-center py-5">
            <img src="/logo.svg" class="h-8 mx-auto w-fit" alt="">
        </div>
        <div class="bg-white shadow-sm py-4 m-2 border border-gray-200 text-gray-700 rounded-sm md:w-80 mx-auto">
            <div class="text-center text-xl title p-3">LOGIN</div>
            <div class="text-center text-xs">Welcome to <span class="text-blue-500">Ship Share Safety Checklist Online</span></div>
            <div v-show="isInCorrect" class="px-4 py-2">
                <div class="w-full rounded-sm text-red-700 bg-red-200 text-center text-sm py-1">Email or Password is incorrect!</div>
            </div>
            <form @submit.prevent="AuthorizationChecking" class="flex flex-col gap-3 px-4 py-2">
                <div class="flex flex-col text-xs">
                    <label for="email">Email</label>
                    <input type="text" v-model="email" id="email" class="border rounded-sm p-2" placeholder="Input Email">
                    <div class="text-right text-red-600 text-xs">{{ errors.error_email }}</div>
                </div>
                <div class="flex flex-col text-xs">
                    <label for="password">Password</label>
                    <input type="password" v-model="password" id="password" class="border rounded-sm p-2" placeholder="Username">
                    <div class="text-right text-red-600 text-xs">{{ errors.error_password }}</div>
                </div>
                <div class="flex gap-2 items-center">
                    <input type="checkbox">
                    <div class="text-xs">Remember Me</div>
                </div>
                <button type="submit" class="p-2 cursor-pointer bg-blue-600 text-white font-bold rounded-sm w-full p-2">
                    <div class="pointer-events-none">{{ logintext.text }}</div>
                </button>
            </form>
        </div>
    </div>
</template>

<style scoped>
    .title{
        font-weight: 700;
    }
</style>
