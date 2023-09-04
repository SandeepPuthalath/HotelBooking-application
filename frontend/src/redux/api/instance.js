import axios from "axios";


export const instance = axios.create({
    baseURL: "http://localhost:5000/api"
})


export const adminInstance = axios.create({
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