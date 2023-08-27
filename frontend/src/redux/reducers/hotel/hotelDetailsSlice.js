import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { viewHotelDetails } from "./hotelThunk";
import { instance } from "../../api/instance";

export const handleRating = createAsyncThunk("hotelRating", async ({ star, userId, hotelId }) => {
    try {

        const response = await instance.put(`/hotel/rating`, { userId, star, hotelId });

        console.log(response)

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



const hotelDetailsSlice = createSlice({
    name: "hotelDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(viewHotelDetails.pending, (state) => {
                state.loading = true
            })
            .addCase(viewHotelDetails.rejected, (state, action) => {
                state.loading = false
                state.error = true
            })
            .addCase(viewHotelDetails.fulfilled, (state, action) => {
                state.data = action.payload?.data
                state.loading = false
                state.error = false
            })
            .addCase(handleRating.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(handleRating.fulfilled, (state, action) => {
                state.loading = false;
                state.data = {...state.data,
                    ratings:action?.payload?.result?.ratings,
                    totalRating:action.payload?.result?.totalRating
                }
            })
            .addCase(handleRating.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }

})



export default hotelDetailsSlice.reducer