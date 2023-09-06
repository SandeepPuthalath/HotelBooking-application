import axios from "axios";
import { Constants } from "../../config";


const hotelAxios = axios.create({
    baseURL: `${Constants.BASE_URL}/hotel`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

export default hotelAxios 