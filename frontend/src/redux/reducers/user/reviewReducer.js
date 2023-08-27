import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../api/instance"


export const handleReviewingHotel = createAsyncThunk("hotel-review", async ({ id, postedBy, star, message }) => {
    try {
        console.log(id, postedBy, star, message)
        const response = await instance.post('/review', { id, postedBy, star, message });
        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
})

export const handleFetchingReview = createAsyncThunk("fetchAllReview", async (hotelId) =>{
    try {
        const response = await instance.get(`/review/?hotelId=${hotelId}`);
        return response.data;
    } catch (error) {
        return Promise.reject(error)
    }
})


const initialState = {
    loading: false,
    reviews: [],
    error: null,
}


const reviewReducer = createSlice({
    name: "review",
    initialState,
    reducers: {},
    extraReducers: (buidler) => {
        buidler
            .addCase(handleReviewingHotel.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(handleReviewingHotel.fulfilled, (state, action) => {
                state.loading = false
                state.reviews = [...action.payload?.result?.reviews ]
            })
            .addCase(handleReviewingHotel.rejected, (state, action) => {
                state.loading = true
                state.error = action.error.message
            })
            .addCase(handleFetchingReview.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(handleFetchingReview.fulfilled, (state, action) => {
                state.loading = false
                state.reviews = action.payload?.result?.reviews || []
            })
            .addCase(handleFetchingReview.rejected, (state, action) => {
                state.loading = true
                state.error = action.error.message
            })
    }
})


export default reviewReducer.reducer