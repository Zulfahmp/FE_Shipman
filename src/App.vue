<script setup>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import { faBars, faChevronLeft, faDashboard, faDatabase, faFile, faFileCircleXmark, faSignOut, faUserGear } from '@fortawesome/free-solid-svg-icons';
    import { ref,reactive,watch } from 'vue';
    import Logout from '@/components/Logout.vue';
    import { Page } from '@/router';
    import { useRouter,useRoute } from 'vue-router';
    import { AuthConfig } from './authconfig';
    import ChangePassword from './pages/management_user/ChangePassword.vue';
    const Auth = AuthConfig()
    const route = useRoute()
    var routepath = ref(route.path)

    watch(() => route.path, (newPath) => {
      routepath=newPath
    })
  
    const routing = useRouter()
    var MENUSIDE = ref(false)
    var LOGPOP = ref(false)
    var CPASSPOP = ref(false)
  
    function LogoutPop(){
        let change =  !LOGPOP.value
        LOGPOP.value= change
    }

     function changePassword(){
        let change =  !CPASSPOP.value
        CPASSPOP.value= change
    }
  
    function SideMenu(){
        let change =  !MENUSIDE.value
        MENUSIDE.value= change
    }

    var isMdScreen = reactive({status:window.matchMedia('(min-width: 768px)').matches}) 
    window.addEventListener('resize', () => {
      isMdScreen.status = window.matchMedia('(min-width: 768px)').matches;
    })
</script>
<template>
  <div v-if="!Auth.is_authenticated">
    <router-view/>
  </div>
  <div v-if="Auth.is_authenticated">
  <div v-if="!isMdScreen.status">
    <div class="bg-white h-[40px] flex items-center gap-5 p-2">
            <div class="rounded-sm p-0.5 cursor-pointer" @click="SideMenu">
                <FontAwesomeIcon :icon="faBars" size="lg" class="text-gray-800 pointer-events-none"  @click="SideMenu"/>
            </div>
        <img src="/logopertamina.png" class="h-8" alt="" srcset="">
    </div>
    <div id="side-menu" :class="{'block':MENUSIDE, 'hidden':!MENUSIDE}" class="fixed flex items-center top-0 w-full z-10">
        <div class="w-[80%] h-screen z-10 bg-white text-gray-700 font-semibold">
            <div class="h-28 flex items-center gap-5 pl-5">
                <img src="/avatar.jpg" class="h-20 w-20 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-200" alt="" srcset="">
                <div class="flex flex-col">
                    <div class="text-xs text-gray-600">{{ Auth.position }}</div>
                    <div class="text-md text-gray-800">{{ Auth.full_name }}</div>
                </div>
            </div>
            <div class="grid grid-rows-auto text-xs gap-2 p-2">
                <!-- <div @click="Page('dashboard',routing)" class="cursor-pointer bg-gray-100 hover:bg-gray-200 active:bg-gray-200 p-2 rounded-sm flex gap-2 items-center">
                    <FontAwesomeIcon :icon="faDashboard" :class="{'text-blue-600':routepath=='/dashboard','text-gray-700':routepath!='/dashboard'}" class="pointer-events-none"/>
                    <div class="pointer-events-none">Dashboard</div>
                </div> -->
                <div @click="Page('sscl',routing)" class="cursor-pointer bg-gray-100 hover:bg-gray-200 active:bg-gray-200 p-2 rounded-sm flex gap-2 items-center">
                    <FontAwesomeIcon :icon="faFile" :class="{'text-blue-600':routepath=='/sscl','text-gray-700':route.path!='/sscl'}" class="pointer-events-none"/>
                    <div class="pointer-events-none">Ship Shore Safety Checklist</div>
                </div>
                <div @click="Page('negative-feedback',routing)" class="cursor-pointer bg-gray-100 hover:bg-gray-200 active:bg-gray-200 p-2 rounded-sm flex gap-2 items-center">
                    <FontAwesomeIcon :icon="faFileCircleXmark" :class="{'text-blue-600':routepath=='/negative-feedback','text-gray-700':route.path!='/negative-feedback'}" class="pointer-events-none"/>
                    <div class="pointer-events-none">Negative Feedback</div>
                </div>
                <div @click="Page('master-data',routing)" v-if="1==Auth.role" class="cursor-pointer bg-gray-100 hover:bg-gray-200 active:bg-gray-200 p-2 rounded-sm flex gap-2 items-center">
                    <FontAwesomeIcon :icon="faDatabase" :class="{'text-blue-600':routepath=='/master-data','text-gray-700':route.path!='/master-data'}" class="pointer-events-none"/>
                    <div class="pointer-events-none">Master Data</div>
                </div>
                <div @click="Page('management-user',routing)" v-if="1==Auth.role" class="cursor-pointer bg-gray-100 hover:bg-gray-200 active:bg-gray-200 p-2 rounded-sm flex gap-2 items-center">
                    <FontAwesomeIcon :icon="faUserGear" :class="{'text-blue-600':routepath=='/management-user','text-gray-700':route.path!='/management-user'}" class="pointer-events-none"/>
                    <div class="pointer-events-none">Management User</div>
                </div>
                <div @click="LogoutPop" class=" cursor-pointer text-red-600 bg-gray-100 hover:bg-gray-200 active:bg-gray-200 p-2 rounded-sm flex gap-2 items-center">
                    <FontAwesomeIcon :icon="faSignOut" class="pointer-events-none"/>
                    <div class="pointer-events-none">Exit</div>
                </div>
            </div>
        </div>
        <div @click="SideMenu" class="w-5 h-20 bg-white cursor-pointer rounded-r-md text-gray-800 flex items-center">
            <FontAwesomeIcon :icon="faChevronLeft" class="pointer-events-none"/>
        </div>
    </div>
    <router-view/>
  </div>
    <div v-if="isMdScreen.status">
        <div class="max-h-screen flex flex-col">
        <div class="bg-white border-b h-[40px] flex items-center gap-5 p-2">
            <img src="/logopertamina.png" class="h-8" alt="" srcset="">
        </div>
        <div class="grid grid-cols-8 w-full overflow-hidden">
            <div class="col-span-2 border-r-2 border-gray-200">
            <div class="w-full h-screen z-10 bg-white">
                <div class="h-28 flex items-center gap-5 pl-5">
                    <img src="/avatar.jpg" class="h-20 w-20 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-200" alt="" srcset="">
                    <div class="flex flex-col">
                        <div class="text-xs text-gray-600">{{ Auth.position }}</div>
                        <div class="text-md text-gray-800">{{ Auth.full_name }}</div>
                        <div @click="changePassword()" class="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-sm cursor-pointer font-semibold hover:bg-blue-100 active:bg-blue-100">Change Password</div>
                    </div>
                </div>
                    <div class="grid grid-rows-auto text-xs gap-2 p-2">
                    <!-- <div @click="Page('dashboard',routing)" class="cursor-pointer bg-gray-100 hover:bg-gray-200 active:bg-gray-200 p-2 rounded-sm flex gap-2 items-center">
                        <FontAwesomeIcon :icon="faDashboard" :class="{'text-blue-600':routepath=='/dashboard','text-gray-700':routepath!='/dashboard'}" class="pointer-events-none"/>
                        <div class="pointer-events-none">Dashboard</div>
                    </div> -->
                    <div @click="Page('sscl',routing)" class="cursor-pointer bg-gray-100 hover:bg-gray-200 active:bg-gray-200 p-2 rounded-sm flex gap-2 items-center">
                        <FontAwesomeIcon :icon="faFile" :class="{'text-blue-600':routepath=='/sscl','text-gray-700':route.path!='/sscl'}" class="pointer-events-none"/>
                        <div class="pointer-events-none">Ship Shore Safety Checklist</div>
                    </div>
                    <div @click="Page('negative-feedback',routing)" class="cursor-pointer bg-gray-100 hover:bg-gray-200 active:bg-gray-200 p-2 rounded-sm flex gap-2 items-center">
                        <FontAwesomeIcon :icon="faFileCircleXmark" :class="{'text-blue-600':routepath=='/negative-feedback','text-gray-700':route.path!='/negative-feedback'}" class="pointer-events-none"/>
                        <div class="pointer-events-none">Negative Feedback</div>
                    </div>
                    <div @click="Page('master-data',routing)" v-if="1==Auth.role" class="cursor-pointer bg-gray-100 hover:bg-gray-200 active:bg-gray-200 p-2 rounded-sm flex gap-2 items-center">
                        <FontAwesomeIcon :icon="faDatabase" :class="{'text-blue-600':routepath=='/master-data','text-gray-700':route.path!='/master-data'}" class="pointer-events-none"/>
                        <div class="pointer-events-none">Master Data</div>
                    </div>
                    <div @click="Page('management-user',routing)" v-if="1==Auth.role" class="cursor-pointer bg-gray-100 hover:bg-gray-200 active:bg-gray-200 p-2 rounded-sm flex gap-2 items-center">
                        <FontAwesomeIcon :icon="faUserGear" :class="{'text-blue-600':routepath=='/management-user','text-gray-700':route.path!='/management-user'}" class="pointer-events-none"/>
                        <div class="pointer-events-none">Management User</div>
                    </div>
                    <div @click="LogoutPop" class=" cursor-pointer text-red-600 bg-gray-100 hover:bg-gray-200 active:bg-gray-200 p-2 rounded-sm flex gap-2 items-center">
                        <FontAwesomeIcon :icon="faSignOut" class="pointer-events-none"/>
                        <div class="pointer-events-none">Exit</div>
                    </div>
                </div>
            </div>
            <div @click="SideMenu" class="w-5 h-20 bg-white cursor-pointer rounded-r-md text-gray-800 flex items-center">
                <FontAwesomeIcon :icon="faChevronLeft" class="pointer-events-none"/>
            </div>  
            </div>
            <div class="col-span-6 overflow-y-auto">
                <router-view/>
            </div>
        </div>
        </div>
    </div>
  </div>

    <Logout v-if="LOGPOP" @close="LogoutPop"></Logout>
    <ChangePassword v-if="CPASSPOP" @close="changePassword()"></ChangePassword>
</template>