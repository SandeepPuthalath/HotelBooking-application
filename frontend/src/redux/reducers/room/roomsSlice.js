import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import roomAxios from "../../api/roomApi";



export const handleAddRoom = createAsyncThunk("add/room", async (payload) => {

    const { hotelId, roomData } = payload;
    const response = await roomAxios.post(`/${hotelId}`, roomData);
    return response.data

})


export const fetchAllRooms = createAsyncThunk("get/rooms", async (payload) => {
    const hotelId = payload
    const response = await roomAxios.get(`/${hotelId}`);
    return response.data
})


export const handleRoomSearch = createAsyncThunk("room/search", async (payload) => {
    try {

        console.log(payload)
        const response = await roomAxios.post("/", payload)

        return response.data

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
})



const initialState = {
    loading: false,
    data: [],
    error: null
}


const roomsSlice = createSlice({
    name: "hotel/room",
    initialState,
    reducers: {
        resetError: (state) =>{
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(handleAddRoom.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(handleAddRoom.fulfilled, (state, action) => {
                state.loading = false
                state.data = [...state.data, action.payload?.data]
            })
            .addCase(handleAddRoom.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(fetchAllRooms.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchAllRooms.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload?.data
            })
            .addCase(fetchAllRooms.rejected, (state, action) => {
                state.loading = false
                state.error = action.error?.message
            })
            .addCase(handleRoomSearch.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(handleRoomSearch.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload?.data
            })
            .addCase(handleRoomSearch.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const {resetError} = roomsSlice.actions
export default roomsSlice.reducer