import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../api/instance";

export const handleFetchingMessages = createAsyncThunk("getMessages", async (hotelId) => {
    try {
        const response = await instance.get(`/chat/?hotelId=${hotelId}`);
        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
})


const userChatReducer = createSlice({
    name: "userChats",
    initialState: {
        loading: false,
        messages: [],
        error: null
    },
    reducers: {
        addNewMesssage: (state, action) =>{
            state.messages?.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(handleFetchingMessages.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(handleFetchingMessages.fulfilled, (state,action) => {
                state.loading = false
                state.messages = action.payload;
            })
            .addCase(handleFetchingMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export const {addNewMesssage} = userChatReducer.actions
export default userChatReducer.reducer