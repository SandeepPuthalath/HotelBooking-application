import axios from "axios";
import {Constants} from "../../config"


const adminAxios = axios.create({
    baseURL:`${Constants.BASE_URL}/admin`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
})

adminAxios.interceptors.request.use(
    (config) => {
        const authTokens = JSON.parse(localStorage.getItem("authTokens"));
        const access = authTokens?.access
        config.headers['Authorization'] = `Bearer ${access}`;
        return config;
    },
    (error) => Promise.reject(error)    
)



export default adminAxios