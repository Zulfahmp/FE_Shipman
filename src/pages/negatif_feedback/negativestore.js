import { defineStore } from "pinia";
const defaults  = ()=> ({
        created_by:'',
        nf_id:0,
        ship_id:'',
        port_id:'',
        port_next_id:'',
        status_nf:-1,
        detail:[],
        evidences:[]
});
export const NFSTORE = defineStore('negative',{
    state: () => defaults(),
    actions: {
        resetNF(){Object.assign(this,defaults())},
        generateID(prefix = "NF"){
            const seq = Math.floor(1000 + Math.random() * 9000);
            const now = new Date();
            const timestamp =
            now.getFullYear().toString() +
            (now.getMonth() + 1).toString().padStart(2, "0") +
            now.getDate().toString().padStart(2, "0") +
            now.getHours().toString().padStart(2, "0") +
            now.getMinutes().toString().padStart(2, "0") +
            now.getSeconds().toString().padStart(2, "0");

            return `${prefix}-${seq}-${timestamp}`;
        },
        generateNameEvidence(file){
            const ext = file.name.split('.').pop();
            const timestamp = Date.now();
            const random = Math.random().toString(36).substring(2, 8);
            return `NF_${timestamp}_${random}.${ext}`;
        }
    }
})