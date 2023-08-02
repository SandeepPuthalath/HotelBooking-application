import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myHotelApi from "../../api/myHotelApi";




export const addMyHotel = createAsyncThunk('user/myhotel/add', async (payload) => {

    const { userId, hotel } = payload
    const response = await myHotelApi.post(`/create/${userId}`, hotel);
    return response.data
})

export const fetchMyHotelDetails = createAsyncThunk("user/myhotel", async (payload) => {
    const response = await myHotelApi.get(`/myhotel/${payload}`);
    return response.data;
  })

const initialState = {
    loading: false,
    data: null,
    error: null
}

const myHotelSlice = createSlice({
    name: 'user/myhotel',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addMyHotel.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addMyHotel.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload?.data
            })
            .addCase(addMyHotel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchMyHotelDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyHotelDetails.fulfilled,  (state, action) => {
                state.loading = false
                state.data = action.payload?.data
            })
            .addCase(fetchMyHotelDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})


export default myHotelSlice.reducer