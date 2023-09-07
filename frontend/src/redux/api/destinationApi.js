import axios from "axios";
import { Constants } from "../../config";

const destinationApi = axios.create({
  baseURL: `${Constants.BASE_URL}/destination`,
})



// destinationApi.interceptors.request.use(
//     (config) => {
//         const authTokens = JSON.parse(localStorage.getItem("authTokens"));
//         const access = authTokens?.access
//         config.headers['Authorization'] = `Bearer ${access}`;
//         return config;
//     },
//     (error) => Promise.reject(error)    
// )



export default destinationApi