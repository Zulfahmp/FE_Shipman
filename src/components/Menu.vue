<script setup>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import { faBars, faChevronLeft, faCircleChevronLeft, faDashboard, faDatabase, faFile, faFileCircleXmark, faSignOut, faUserGear } from '@fortawesome/free-solid-svg-icons';
    import { ref } from 'vue';
    import Logout from './Logout.vue';
    import { Page } from '@/router';
    import { useRouter } from 'vue-router';
    const routing = useRouter()
    var MENUSIDE = ref(false)
    var LOGPOP = ref(false)
  
    function LogoutPop(){
        let change =  !LOGPOP.value
        LOGPOP.value= change
    }
  
    function SideMenu(){
        let change =  !MENUSIDE.value
        MENUSIDE.value= change
    }
</script>
<template>
    <div class="bg-gray-200 h-[40px] flex gap-5 p-2">
            <div class="rounded-sm p-0.5" @click="SideMenu">
                <FontAwesomeIcon :icon="faBars" size="1x" class="text-gray-800 pointer-events-none"  @click="SideMenu"/>
            </div>
        <img src="/logo.svg" class="h-6" alt="" srcset="">
    </div>
    <div id="side-menu" :class="{'block':MENUSIDE, 'hidden':!MENUSIDE}" class="fixed flex items-center top-0 w-full z-10" style="background-color: rgba(0,0,0,0.5);">
        <div class="w-[80%] h-screen z-10 bg-white">
            <div class="h-28 flex items-center gap-5 pl-5">
                <img src="../assets/logo.svg" class="h-20 w-20 rounded-full bg-gray-100" alt="" srcset="">
                <div class="flex flex-col">
                    <div class="text-xs text-gray-600">Admin</div>
                    <div class="text-md text-gray-800">Justin Alex</div>
                </div>
            </div>
            <div class="grid grid-rows-auto text-xs gap-2 p-2">
                <div @click="Page('dashboard',routing)" class="bg-gray-100 p-2 rounded-sm flex gap-2 items-center">
                    <FontAwesomeIcon :icon="faDashboard" class="text-blue-500 pointer-events-none"/>
                    <div class="pointer-events-none">Dashboard</div>
                </div>
                <div @click="Page('sscl',routing)" class="bg-gray-100 p-2 rounded-sm flex gap-2 items-center">
                    <FontAwesomeIcon :icon="faFile" class="pointer-events-none"/>
                    <div class="pointer-events-none">SSCL</div>
                </div>
                <div @click="Page('negative-feedback',routing)" class="bg-gray-100 p-2 rounded-sm flex gap-2 items-center">
                    <FontAwesomeIcon :icon="faFileCircleXmark" class="pointer-events-none"/>
                    <div class="pointer-events-none">Negative Feedback</div>
                </div>
                <div @click="Page('master-data',routing)" class="bg-gray-100 p-2 rounded-sm flex gap-2 items-center">
                    <FontAwesomeIcon :icon="faDatabase" class="pointer-events-none"/>
                    <div class="pointer-events-none">Master Data</div>
                </div>
                <div @click="Page('management-user',routing)" class="bg-gray-100 p-2 rounded-sm flex gap-2 items-center">
                    <FontAwesomeIcon :icon="faUserGear" class="pointer-events-none"/>
                    <div class="pointer-events-none">Management User</div>
                </div>
                <div @click="LogoutPop" class="bg-gray-100 p-2 rounded-sm flex gap-2 items-center">
                    <FontAwesomeIcon :icon="faSignOut" class="pointer-events-none"/>
                    <div class="pointer-events-none">Exit</div>
                </div>
            </div>
        </div>
        <div @click="SideMenu" class="w-5 h-20 bg-white rounded-r-md text-gray-800 flex items-center">
            <FontAwesomeIcon :icon="faChevronLeft" class="pointer-events-none"/>
        </div>
    </div>
    <Logout v-show="LOGPOP" @close="LogoutPop"></Logout>
</template>