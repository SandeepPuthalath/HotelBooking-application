import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { cloudName, uploadPreset } from "../../../config";


export const handleImageUpload = createAsyncThunk("img/upload", async (payload) => {
    try {

        const formData = new FormData()

        formData.append("file", payload);

        formData.append("upload_preset", uploadPreset);

        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData)

        return response.data

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
})


const imageUploadSlice = createSlice({
    name: "upload/img",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {
        resetImgUploadState: (state) =>{
            state.loading = false
            state.data = null
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(handleImageUpload.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(handleImageUpload.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload?.secure_url
            })
            .addCase(handleImageUpload.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})


export const {resetImgUploadState} = imageUploadSlice.actions

export default imageUploadSlice.reducer