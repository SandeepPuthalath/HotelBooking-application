import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../api/instance";


export const handleAddingMoneyToWallet = createAsyncThunk("addWalletMoney", async ({userId, amount}) =>{
    try {
        const response = await instance.post(`/wallet?userId=${userId}`, {amount});
        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
})

export const handleFetchingUserWallet = createAsyncThunk("fetchingWallet", async ({ userId}) => {
    try {
        const response = await instance.get(`/wallet/?userId=${userId}`);
        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
})


const initialState = {
    loading : false,
    wallet :null,
    transactions:[],
    error: null,
}

const walletReducer = createSlice({
    name:"wallet",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
            .addCase(handleFetchingUserWallet.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(handleFetchingUserWallet.fulfilled, (state, action) => {
                state.loading = false
                state.wallet = action.payload
                state.transactions = action.payload?.transactions
            })
            .addCase(handleFetchingUserWallet.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(handleAddingMoneyToWallet.pending, (state) =>{
                state.loading = true
                state.error = null
            })
            .addCase(handleAddingMoneyToWallet.fulfilled, (state, action) => {
                state.loading = false
                state.wallet = action.payload
                state.transactions = action.payload?.transactions
            })
            .addCase(handleAddingMoneyToWallet.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})


export default walletReducer.reducer