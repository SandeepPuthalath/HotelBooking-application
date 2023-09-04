import axios from "axios";

const applicationApi = axios.create({
  baseURL: "http://localhost:5000/api/application",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

applicationApi.interceptors.request.use((request) => {

  const state = localStorage.getItem('authTokens');
  const authTokens = JSON.parse(state)
  const token = (authTokens?.access)
  request.headers['Authorization'] = `Bearer ${token}`;
  return request;
},
  (error) => Promise.reject(error)
)



export default applicationApi;
