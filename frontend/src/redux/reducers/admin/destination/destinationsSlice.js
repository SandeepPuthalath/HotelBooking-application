import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import destinationApi from "../../../api/destinationApi";



export const handleFetchAllDestinations = createAsyncThunk("destination/all", async () =>{
    
    try {

        const response = await destinationApi.get("/");

        return response.data

    } catch (error) {
        throw new Error(error)
    }
})


const destinationsSlice = createSlice({
    name: "all/destinations",
    initialState: {
        loading: false,
        data: null,
        error: null,
    },
    reducers: {
        resetState: (state) => {
            state.loading = false
            state.data = null
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(handleFetchAllDestinations.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(handleFetchAllDestinations.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload?.data
            })
            .addCase(handleFetchAllDestinations.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const { resetState } = destinationsSlice.actions
export default destinationsSlice.reducer