import axios from "axios";
async function GetData(url,params){
    let queryParam= params && params !='' ? '?'+params : ''
    const token = localStorage.getItem('auth_token');
    return await axios.get(import.meta.env.VITE_API+url+queryParam,{headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`}})
}

async function PostData(url,body){
    const token = localStorage.getItem('auth_token');
    return await axios.post(import.meta.env.VITE_API+url,body,{headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`}})
}

async function PostDataMTP(url,body){
    const token = localStorage.getItem('auth_token');
    return await axios.post(import.meta.env.VITE_API+url,body,{headers:{'Content-Type':'multipart/form-data',Authorization:`Bearer ${token}`}})
}

export {GetData,PostData,PostDataMTP}