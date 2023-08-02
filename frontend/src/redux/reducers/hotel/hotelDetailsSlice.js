import { createSlice } from "@reduxjs/toolkit";
import { viewHotelDetails } from "./hotelThunk";



const initialState = {
    loading : false,
    data: null,
    error: false
}



const hotelDetailsSlice = createSlice({
    name:"hotelDetails",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
            .addCase(viewHotelDetails.pending, (state) =>{
                state.loading = true
            })
            .addCase(viewHotelDetails.rejected, (state, action) =>{
                state.loading = false
                state.error = true
            })
            .addCase(viewHotelDetails.fulfilled, (state, action) => {
                state.data = action.payload?.data
                state.loading = false
                state.error = false
            })
    }

})



export default hotelDetailsSlice.reducer