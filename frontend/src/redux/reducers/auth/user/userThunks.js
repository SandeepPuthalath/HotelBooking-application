import { createAsyncThunk } from "@reduxjs/toolkit";
import authAxios from "../../../api/authApi";


export const userLogin = createAsyncThunk("api/login", async (payload) => {

    try {
        const response = await authAxios.post("/login", payload)


        return response.data

    } catch (error) {
        throw new Error(error.response?.data?.message)
    }

})


export const userOtpLogin = createAsyncThunk('api/send-otp', async (payload) => {
    try {
        const response = await authAxios.post("/send-otp", payload)

        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message)
    }
})