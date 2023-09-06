import axios from "axios";
import { Constants } from "../../config";

const bookingApi = axios.create({
    baseURL: `${Constants.BASE_URL}/booking`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

bookingApi.interceptors.request.use(
    (config) => {
        const state = localStorage.getItem('reduxState');
        const reduxState = JSON.parse(state)
        const token = (reduxState.user?.data?.token)
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)   
)

export default bookingApi