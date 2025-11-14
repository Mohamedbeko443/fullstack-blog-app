import axios from "axios";

const base = import.meta.env.VITE_API_BASE_URL


const request = axios.create({
    baseURL: base
})


export default request;