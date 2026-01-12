import { defineStore } from "pinia";
const defaultSSCL  = ()=> ({
        sscl_id:0,
        officer_name:'',
        officer_position:'',
        officer_contact:'',
        ship_id:'',
        port_id:'',
        berth_id:'',
        cargo_id:'',
        date_arrival:'',
        time_arrival:'',
        time_8:0,
        time_9:0,
        interval_8:0,
        interval_9:0,
        sscl_checklist : [],
        mt_name : '',
        status_sscl : 0,
        created_by : ''
});
export const SSCLSTORE = defineStore('sscl',{
    state: () => defaultSSCL(),
    actions: {
        resetSSCL(){Object.assign(this,defaultSSCL())},
        generateID(prefix = "SSCL"){
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
        }
    }
})