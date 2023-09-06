import axios from "axios";
import { Constants } from "../../config";


export const instance = axios.create({
    baseURL: Constants.BASE_URL
})


export const adminInstance = axios.create({
    baseURL: Constants.BASE_URL
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


adminInstance.interceptors.request.use((request) => {

    const state = localStorage.getItem('authTokens');
    const authTokens = JSON.parse(state)
    const token = (authTokens?.access)
    console.log(token)
    request.headers['Authorization'] = `Bearer ${token}`;
    return request;
},
    (error) => Promise.reject(error)
)