import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserProfile, updateUserProfile } from "../thunks/userThunks";
import { instance } from "../../api/instance";



export const handleUpdateProfileImage = createAsyncThunk("updateProfileImage", async ({ userId, secure_url }) =>{
    try {
        const response = await instance.patch(`/user/profile/${userId}`, {secure_url})
        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
})


const initialState = {
    loading: false,
    data: null,
    error: false
}


const userSlice = createSlice({
    name: "userProfile",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false
                state.error = true
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.data = action.payload?.data
                state.error = false
                state.loading = false
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true
            })
            .addCase(updateUserProfile.fulfilled, (state, action) =>{
                state.loading = false
                state.error = false
                state.data = action.payload?.data
            })
            .addCase(updateUserProfile.rejected, (state, action) =>{
                state.loading = false
                state.error = true
            })
            .addCase(handleUpdateProfileImage.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(handleUpdateProfileImage.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.data = action.payload?.data
            })
            .addCase(handleUpdateProfileImage.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})


export default userSlice.reducer