import axios from "axios";

const destinationApi = axios.create({
    baseURL:"http://localhost:5000/api/destination",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
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