import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../api/instance";

export const handleBannersFetching = createAsyncThunk("banner/get", async () =>{
    try {

        const response = await instance.get('/banner');

        return response.data;

    } catch (error) {
        throw new Error(error);
    }
})


const bannerReducer = createSlice({
    name:"banner",
    initialState: {
        loading: false,
        banners: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(handleBannersFetching.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(handleBannersFetching.fulfilled, (state, action) => {
                state.loading = false
                state.banners = action.payload?.banners
            })
            .addCase(handleBannersFetching.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})



export default bannerReducer.reducer;