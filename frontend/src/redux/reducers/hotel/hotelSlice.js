import { createSlice } from "@reduxjs/toolkit";
import { viewAllHotels } from "./hotelThunk";

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(viewAllHotels.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(viewAllHotels.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(viewAllHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.data = action.payload?.data?.data;
      });
  },
});

export default hotelSlice.reducer;
