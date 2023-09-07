import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminInstance } from "../../api/instance";


export const handleFetchingDashboardData = createAsyncThunk("fetchingAdminDashboardData", async () =>{
    try {
        const response = await adminInstance.get("/");

        return response.data

    } catch (error) {
        return Promise.reject(error)
    }
})


const adminDashboard = createSlice({
    name: "adminDashboard",
    initialState:{
        loading: false,
        totalUsers: null,
        totalBookings: null,
        totalRevenu: null,
        totalHotels: null,
        newUsers: [],
        error: null
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(handleFetchingDashboardData.pending, (state) =>{
                state.loading = true
                state.error = null
            })
            .addCase(handleFetchingDashboardData.fulfilled, (state, action) => {
                state.loading = false
                state.totalUsers = action.payload?.totalUsers
                state.totalHotels = action.payload?.totalHotels
                state.totalBookings = action.payload?.totalBookings
                state.totalRevenu = action.payload?.totalRevenu
                state.newUsers = action.payload?.newUsers
            })
            .addCase(handleFetchingDashboardData.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})


export default adminDashboard.reducer