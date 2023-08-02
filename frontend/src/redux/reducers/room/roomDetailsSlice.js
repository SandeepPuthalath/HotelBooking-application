import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import roomAxios from "../../api/roomApi";




export const fetchRoomDetails = createAsyncThunk('get/roomDetails', async (payload) => {
    const { hotelId, roomId } = payload;
    const response = await roomAxios.get(`/details/${hotelId}/${roomId}`);
    return response.data
})

export const handleAddRoomImage = createAsyncThunk("patch/room/add/img", async (payload) => {

    const { hotelId, roomId, imgId } = payload;
    const response = await roomAxios.post(`/add/img/${hotelId}/${roomId}`, {imgId});
    return response.data
})



const initialState = {
    loading: false,
    data: null,
    error: null
}


const roomDetailsSlice = createSlice({
    name: 'get/room/details',
    initialState,
    reducers: {
        resetRoomState: (state) =>{
            state.loading =false
            state.error = null
            state.data = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoomDetails.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(fetchRoomDetails.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload?.data
            })
            .addCase(fetchRoomDetails.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(handleAddRoomImage.pending, (state) =>{
                state.loading = true
                state.error = false
            })
            .addCase(handleAddRoomImage.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload?.data
            })
            .addCase(handleAddRoomImage.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
           
    }
})


export default roomDetailsSlice.reducer