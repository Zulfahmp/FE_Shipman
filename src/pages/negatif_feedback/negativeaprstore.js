import { defineStore } from "pinia";
const defaults  = ()=> ({
        approver:'',
        created_by:'',
        nf_id:'',
        ship_name:'',
        port:'',
        status_nf:-1,
        detail:[]
});
export const NFAPRSTORE = defineStore('negativeapr',{
    state: () => defaults(),
    actions: {
        resetNFAPR(){Object.assign(this,defaults())},
    }
})