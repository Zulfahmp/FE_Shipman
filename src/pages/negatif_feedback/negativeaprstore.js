import { defineStore } from "pinia";
const defaults  = ()=> ({
        approver:'',
        created_by:'',
        nf_id:'',
        ship_name:'',
        port:'',
        detail:[]
});
export const NFAPRSTORE = defineStore('negative',{
    state: () => defaults(),
    actions: {
        resetNFAPR(){Object.assign(this,defaults())},
    }
})