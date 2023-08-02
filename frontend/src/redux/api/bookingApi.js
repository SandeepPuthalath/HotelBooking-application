import axios from "axios";

const bookingApi = axios.create({
    baseURL:"http://localhost:5000/api/booking",
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