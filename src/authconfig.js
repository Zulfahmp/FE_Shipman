import { defineStore } from 'pinia'
export const AuthConfig = defineStore('session_login', {
    state: () => ({
        is_authenticated : false,
        full_name:'',
        position:'',
        role:0,
        token:'',
    }),
    actions: {
        setAuth(auth_data){
            this.is_authenticated = auth_data.authenticated
            this.role = Number(auth_data.role)
            this.full_name = auth_data.full_name
            this.position = auth_data.position
        },
    }
})