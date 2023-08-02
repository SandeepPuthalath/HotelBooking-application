import axios from "axios";


const hotelAxios = axios.create({
    baseURL: "http://localhost:5000/api/hotel",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

export default hotelAxios 