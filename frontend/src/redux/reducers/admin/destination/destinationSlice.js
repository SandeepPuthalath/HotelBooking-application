import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminDestinationApi from "../../../api/adminDestinationApi";


export const handleAddDestination = createAsyncThunk("destination/add", async (payload) => {

    try {

        const response = await adminDestinationApi.post("/", payload);

        return response.data

    } catch (error) {
        throw new Error(error)
    }
})




const destinationSlice = createSlice({
    name: "add/destination",
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
            .addCase(handleAddDestination.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(handleAddDestination.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload?.secure_url
            })
            .addCase(handleAddDestination.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const { resetState } = destinationSlice.actions
export default destinationSlice.reducer