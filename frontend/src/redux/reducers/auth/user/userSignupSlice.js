import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import authAxios from "../../../api/authApi";

export const userSignup = createAsyncThunk("user/signup", async (payloads) =>{
    try {
        const response = await authAxios.post('/signup', payloads)
    
        return response.data
        
    } catch (error) {
        throw new Error(error.response?.data?.message)
    }
})



const initialState = {
    loading: false,
    successMessage:null,
    error: null
}

const userSignupSlice = createSlice({
    name: "user/signup",
    initialState,
    reducers: {
        resetSuccesMessage: (state) =>{
            state.successMessage = null
        },
        resetSignupError: (state) =>{
            state.error = null
        }
    },
    extraReducers: (builder) =>{
        builder
            .addCase(userSignup.pending, (state) =>{
                state.loading = true
                state.error = null
            })
            .addCase(userSignup.fulfilled, (state, action) =>{
                state.loading = false
                state.successMessage = action.payload?.message
            })
            .addCase(userSignup.rejected, (state, action) =>{
                state.loading = false
                state.error = action.error?.message || 'Login failed'
            })
    }
})

export const {resetSuccesMessage, resetSignupError} = userSignupSlice.actions
export default userSignupSlice.reducer