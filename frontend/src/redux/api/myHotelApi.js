import axios from "axios";

const myHotelApi = axios.create({
  baseURL: "http://localhost:5000/api/hotel",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

myHotelApi.interceptors.request.use(
    (config) => {
        const state = localStorage.getItem('reduxState');
        const reduxState = JSON.parse(state)
        const token = (reduxState.user?.data?.token)
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)    
)



export default myHotelApi;
