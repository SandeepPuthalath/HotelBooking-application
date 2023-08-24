import axios from "axios";


export const instance = axios.create({
    baseURL: "http://localhost:5000/api"
})




instance.interceptors.request.use((request) => {

    const state = localStorage.getItem('reduxState');
    const reduxState = JSON.parse(state)
    const token = (reduxState.user?.data?.token)
    request.headers['Authorization'] = `Bearer ${token}`;
    return request;
},
    (error) => Promise.reject(error)
)