import axios from "axios";
import { Constants } from "../../config";

const adminDestinationApi = axios.create({
    baseURL: `${Constants.BASE_URL}/destination`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
})



adminDestinationApi.interceptors.request.use(
    (config) => {
        const authTokens = JSON.parse(localStorage.getItem("authTokens"));
        const access = authTokens?.access
        config.headers['Authorization'] = `Bearer ${access}`;
        return config;
    },
    (error) => Promise.reject(error)    
)



export default adminDestinationApi