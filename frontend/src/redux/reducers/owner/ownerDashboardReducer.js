import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookingApi from "../../api/bookingApi";



export const fetchPerformanceDetails = createAsyncThunk('owner/fetch/performance', async (payload) =>{
    try {
        
        const response = await bookingApi.get(`/hotel/performance/?hotelId=${payload}`);

        return response.data

    } catch (error) {
        throw new Error(error)
    }
})



const initialState = {
    loading: false,
    monthlyRevenu: 0,
    yearlyRevenu: 0,
    totalBookings: 0,
    error: null,
}

const ownerDashboardReducer = createSlice({
    name: 'owner/dashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
            .addCase(fetchPerformanceDetails.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchPerformanceDetails.fulfilled, (state, action) =>{
                state.loading = false
                state.monthlyRevenu = action.payload?.monthlyRevenu
                state.yearlyRevenu = action.payload?.yearlyRevenu
                state.totalBookings = action.payload?.totalBookings
            })
            .addCase(fetchPerformanceDetails.rejected, (state, action) => {
                state.loading = false
                state.error = action.error?.message
            })
    }
})


export default ownerDashboardReducer.reducer