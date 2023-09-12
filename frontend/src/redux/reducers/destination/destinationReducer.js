import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Constants } from "../../../config";


export const instance = axios.create({
    baseURL: `${Constants.BASE_URL}/destination`,
})


export const fetchFeaturedDestinations = createAsyncThunk("destination/featured", async (payload) =>{
    try {

        const response = await instance.get(`/featured?count=${payload}`);
        console.log(response.data)

        return response.data;
        
    } catch (error) {
        throw new Error(error)
    }
})




const initialState = {
    loading: false,
    destinations: null,
    destination: null,
    featured:null,
    error: null,
}


const destinationReducer = createSlice({
    name: "destination",
    initialState,
    reducers:{},
    extraReducers: (builder) =>{

        builder
            .addCase(fetchFeaturedDestinations.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchFeaturedDestinations.fulfilled, (state, action) => {
                state.loading = false
                state.featured = action.payload?.data
            })
            .addCase(fetchFeaturedDestinations.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message;
            })
    }
})


export default destinationReducer.reducer;