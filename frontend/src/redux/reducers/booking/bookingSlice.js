import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookingApi from "../../api/bookingApi";
import { instance } from "../../api/instance";


export const handleBookingRoom = createAsyncThunk("room/booking", async (payload) => {
    try {
        const response = await bookingApi.post('/', payload)

        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
})

export const handlePayment = createAsyncThunk("payment", async ({ paymentMethod, bookingId }) => {
    try {
        const response = await instance.put(`/booking/?id=${bookingId}`, { paymentMethod })

        return response.data;
    }
    catch (error) {
        return Promise.reject(error);
    }
})

export const handleGetUsersAllBookings = createAsyncThunk("booking/all", async (payload) => {
    const { page, userId } = payload
    try {

        const response = await bookingApi.get(`/${userId}?page=${page}&limit=${5}`);

        return response.data

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
})

export const handleCancelBooking = createAsyncThunk("booking/cancel", async (payload) => {
    try {
        const response = await bookingApi.patch(`/${payload}`);

        return response.data

    } catch (error) {
        throw new Error(error)
    }
})

export const handleGettingBookingDetails = createAsyncThunk("bookingDetails", async (id) => {
    try {
        const response = await instance.get(`booking/details/${id}`);
        return response.data
    } catch (error) {
        Promise.reject(error)
    }
})

const initialState = {
    loading: false,
    bookings: [],
    booking: null,
    bookingDetails: null,
    message: "",
    error: null
}


const bookingSlice = createSlice({
    name: 'hotel/room/booking',
    initialState,
    reducers: {
        resetBookingState: (state) => {
            state.loading = false
            state.bookings = []
            state.booking = null
            state.bookingDetails = null
            state.message = ""
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(handleBookingRoom.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(handleBookingRoom.fulfilled, (state, action) => {
                state.loading = false
                state.booking = action.payload?.booking
                state.message = action.payload?.message
            })
            .addCase(handleBookingRoom.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message;
            })
            .addCase(handleGetUsersAllBookings.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(handleGetUsersAllBookings.fulfilled, (state, action) => {
                state.loading = false
                state.bookings = action.payload?.data
            })
            .addCase(handleGetUsersAllBookings.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message;
            })
            .addCase(handleCancelBooking.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(handleCancelBooking.fulfilled, (state, action) => {
                state.loading = false
                state.message = action.payload?.message
            })
            .addCase(handleCancelBooking.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message;
            })
            .addCase(handlePayment.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(handlePayment.fulfilled, (state, action) => {
                state.loading = false
                state.message = action.payload?.message
            })
            .addCase(handlePayment.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message;
            })
            .addCase(handleGettingBookingDetails.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(handleGettingBookingDetails.fulfilled, (state, action) => {
                state.loading = false
                state.bookingDetails = action.payload?.bookingDetails
            })
            .addCase(handleGettingBookingDetails.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message;
            })

    }
})

export const { resetBookingState } = bookingSlice.actions
export default bookingSlice.reducer