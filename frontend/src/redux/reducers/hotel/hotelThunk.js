import { createAsyncThunk } from "@reduxjs/toolkit";
import hotelAxios from "../../api/hotelApi";

export const viewAllHotels = createAsyncThunk("viewAllHotels", async () => {
  const response = await hotelAxios.get('/');
  return response.data;
});


export const viewHotelDetails = createAsyncThunk("viewHotel", async (payload) => {

  const response = await hotelAxios.get("/" + payload)

  return response.data
})
