import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../api/instance"

export const handleFetchingOwnerChartData = createAsyncThunk("weeklyChartsData", async (id) => {
    try {
        const response = await instance.get(`/booking/chart/${id}`);
        return response.data;
    } catch (error) {
        return Promise.reject(error)
    }
})



const chartsReducer = createSlice({
    name: "charts",
    initialState: {
        loading: false,
        ownerWeekly: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(handleFetchingOwnerChartData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(handleFetchingOwnerChartData.fulfilled, (state, action) => {
                state.loading = false;
                state.ownerWeekly = action.payload?.weekly;
            })
            .addCase(handleFetchingOwnerChartData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})



export default chartsReducer.reducer
