import axios from "axios";

const authAxios = axios.create({
    baseURL: "http://localhost:5000/api/auth",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
})

export default authAxios 