import { createSlice } from "@reduxjs/toolkit";
import { getUserProfile, updateUserProfile } from "../thunks/userThunks";


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
                state.data = action.payload
                state.error = false
                state.loading = false
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true
            })
            .addCase(updateUserProfile.rejected, (state, action) =>{
                state.loading = false
                state.error = true
            })
            .addCase(updateUserProfile.fulfilled, (state, action) =>{
                state.loading = false
                state.error = false
                state.data = action.payload?.data
            })
    }
})


export default userSlice.reducer