import axios from "axios";


const adminBannerApi = axios.create({
    baseURL: 'http://localhost:5000/api/banner',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
})

adminBannerApi.interceptors.request.use(
    (config) => {
        const authTokens = JSON.parse(localStorage.getItem("authTokens"));
        const access = authTokens?.access
        config.headers['Authorization'] = `Bearer ${access}`;
        return config;
    },
    (error) => Promise.reject(error)    
)


export default adminBannerApi