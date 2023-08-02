import axios from "axios";


const adminAuth = axios.create({
    baseURL:"http://localhost:5000/api/adminAuth",
    headers:{
        "Content-Type": "application/json"
    }
})

export default adminAuth