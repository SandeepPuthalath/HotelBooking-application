import axios from "axios";
import { Constants } from "../../config";

const authAxios = axios.create({
  baseURL: `${Constants.BASE_URL}/auth`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
})

export default authAxios 