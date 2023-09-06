import axios from "axios";
import { Constants } from "../../config";


const adminAuth = axios.create({
    baseURL: `${Constants.BASE_URL}/adminAuth`,
    headers:{
        "Content-Type": "application/json"
    }
})

export default adminAuth