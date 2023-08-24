import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookingApi from "../../api/bookingApi";



export const handleGettingAllBookingsOfHotel = createAsyncThunk('owner/get/bookings', async (payload) => {
    const {hotelId, page} = payload;
    try {
        const response = await bookingApi.get(`/owner/${hotelId}?page=${page}&limit=5`);

        return response.data
    } catch (error) {
        throw new Error(error)
    }
})

export const handleFetchingBookingDetails = createAsyncThunk('owner/get/booking', async (bookingId) => {
    try {
        const response = await bookingApi.get(`/?bookingId=${bookingId}`);

        return response.data

    } catch (error) {
        throw new Error(error);
    }
})


export const handleBookingStatusChange = createAsyncThunk('owner/pathc/booing/status', async (payload) => {
    try {
        
        const {bookingId, status} = payload;

        const response = await bookingApi.patch(`/?bookingId=${bookingId}&status=${status}`)

        return response.data

    } catch (error) {
        throw new Error(error)
    }
})



const initialState = {
    loading: false,
    bookings: [],
    booking: null,
    message: "",
    error: null,
}



const ownerBookingReducer = createSlice({
    name: "owner/booking",
    initialState,
    reducers: {
        resetBooking: (state) => {
            state.booking = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(handleGettingAllBookingsOfHotel.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(handleGettingAllBookingsOfHotel.fulfilled, (state, action) => {
                state.loading = false
                state.bookings = action.payload?.bookings
            })
            .addCase(handleGettingAllBookingsOfHotel.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(handleFetchingBookingDetails.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(handleFetchingBookingDetails.fulfilled, (state, action) => {
                state.loading = false
                state.booking = action.payload?.booking
            })
            .addCase(handleFetchingBookingDetails.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(handleBookingStatusChange.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(handleBookingStatusChange.fulfilled, (state, action) => {
                state.loading = false
                state.message = action.payload?.message
            })
            .addCase(handleBookingStatusChange.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            
    }
})


export const { resetBooking } = ownerBookingReducer.actions
export default ownerBookingReducer.reducer