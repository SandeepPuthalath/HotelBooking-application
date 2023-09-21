import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { viewAllHotels } from "./hotelThunk";
import hotelAxios from "../../api/hotelApi";
import { instance } from "../../api/instance";


export const handleDestinationSearch = createAsyncThunk("hotels/search", async (payload) =>{

  try {
    
    const response = await hotelAxios.get(`/search/${payload}`);

    return response.data

  } catch (error) {
    throw new Error(error)
  }
})

export const handleFetchingTopHotels = createAsyncThunk("featuredHotels", async () =>{
  try {
    const response = await instance.get("/hotel/featured");
    return response.data;
  } catch (error) {
    throw new Error(error)
  }
})


const initialState = {
  loading: false,
  data: [],
  featured: [],
  error: null,
};

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(viewAllHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(viewAllHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data;
      })
      .addCase(viewAllHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(handleDestinationSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleDestinationSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data;
      })
      .addCase(handleDestinationSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(handleFetchingTopHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleFetchingTopHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.featured = action.payload;
      })
      .addCase(handleFetchingTopHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default hotelSlice.reducer;
