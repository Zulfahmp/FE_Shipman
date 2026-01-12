<template>
    <Breadcumb title="Management User" info="Management user for another action"></Breadcumb>
    <div class="grid grid-cols-2 p-2 gap-2 w-full">
       <div @click="setPopup('add',true)" class="cursor-pointer w-full md:w-fit rounded-full font-bold bg-blue-500 px-4 justify-center text-white text-xs p-2 flex items-center gap-2">
            <FontAwesomeIcon :icon="faPlusCircle" class="pointer-events-none"/>
            <div class="pointer-events-none whitespace-nowrap">Add User</div>
        </div>
        <div class="rounded-full bg-gray-200 px-4 text-white text-xs flex items-center gap-2">
            <FontAwesomeIcon :icon="faSearch" class="text-gray-400"/>
            <input @keyup="handleSearch" v-model="search" type="text" class="p-2 w-full bg-gray-200 text-gray-800 focus:outline-none" placeholder="Search"/>
        </div>
    </div>
    <div v-show="users.data.length==0 && search==''">
        <div class="text-sm text-center text-gray-700 p-2">No Data</div>
    </div>
    <div v-show="users.data.length==0 && search!=''">
        <div class="text-sm text-center text-gray-700 p-2"><FontAwesomeIcon :icon="faSearch" size="sm" class="text-blue-500 mr-2"/>Searching Not Found</div>
    </div>
    <div v-show="users.data.length" class="p-2">
        <div class="text-xs">({{ users.data.length }}) Users Found</div>
        <div v-for="u in users.data"  class="even:bg-gray-100 odd:bg-white py-1.5 px-3 text-xs grid grid-cols-5 md:grid-cols-7 grid-rows-auto">
            <div class="col-span-2 p-2">
                {{ u.full_name }}
            </div>
            <div class="hidden md:block md:col-span-2 text-center p-2">
                {{ u.email }}
            </div>
            <div class="col-span-2 text-center p-2">
                {{ {1:'Admin',2:'Verifier',3:'Checker'}[u.role] }}
            </div>
            <div class="flex gap-3 items-center">
                <FontAwesomeIcon @click="HandleEdit(u)" :icon="faPen" class="text-green-500 cursor-pointer p-2 hover:bg-green-100 rounded-sm"/>
                <FontAwesomeIcon @click="DeletePop(u.full_name,u.user_id)" :icon="faTrashAlt" class="text-red-500 cursor-pointer p-2 hover:bg-red-100 rounded-sm"/>
            </div>
        </div>
    </div>
    <EditUser v-if="pops.edit" :data_user="EDIT" @close="setPopup('edit',false)"></EditUser>
    <AddUser v-if="pops.add" @close="setPopup('add',false)"></AddUser>
    <ConfirmDelete v-if="pops.delete" :full_name="user.full_name" :user_id="user.user_id" @close="setPopup('delete',false)"></ConfirmDelete>
</template>

<script setup>
import { reactive , onMounted, watch} from 'vue';

import Breadcumb from '@/components/Breadcumb.vue';
import AddUser from '@/pages/management_user/AddUser.vue';
import ConfirmDelete from './ConfirmDelete.vue';
import EditUser from './EditUser.vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPen, faPlusCircle, faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { GetData } from '@/api';

const pops= reactive({add:false,edit:false,delete:false})
function setPopup(name, status) {
  pops[name] = status
}

var user = reactive({full_name:'',user_id:0})
var search = reactive('')
var EDIT = reactive({user_id:0,full_name:'',role:0,email:''})
let users = reactive({data:[]})

watch([pops,search], (v) => {
    loadUsers();
});

onMounted(async () => {
    await loadUsers()
});

function HandleEdit(user){
    EDIT.user_id = Number(user.user_id)
    EDIT.full_name = user.full_name
    EDIT.email = user.email
    EDIT.role = user.role
    setPopup('edit',true)
}

function DeletePop(name='',id){
    user.full_name = name
    user.user_id = Number(id)
    setPopup('delete',true)
}

async function loadUsers(){
    let res = await GetData('/list-users',search)
    users.data = res.data
}

async function handleSearch(){
    loadUsers()
}
</script>