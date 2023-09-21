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
    search: "",
    error: null,
}


const destinationReducer = createSlice({
    name: "destination",
    initialState,
    reducers:{
        setSearchValue:(state, action) =>{
            state.search = action.payload;
        },
        removeSearchValue : (state) =>{
            state.search = ""
        }

    },
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

export const {removeSearchValue, setSearchValue} = destinationReducer.actions
export default destinationReducer.reducer;