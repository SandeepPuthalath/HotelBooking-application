import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userOtpLogin } from "./userThunks";

const initialState = {
    loading: false,
    data: null,
    error: null
}
const userAuthSlice = createSlice({

    name: "userAuth",
    initialState,
    reducers: {
        logOut: (state) => {
            state.data = null
        },
        resetError: (state) => {
            state.error = null
        },
        resetSuccess: (state) => {
            if (state.data) {

                state.data.status = null
                state.data.message = null
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false
                state.error = action.error?.message || 'Login failed'
            })
            .addCase(userOtpLogin.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(userOtpLogin.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(userOtpLogin.rejected, (state, action) => {
                state.loading = false
                state.error = action.error?.message || 'Login failed'
            })
    }

})
export const { logOut, resetError, resetSuccess } = userAuthSlice.actions
export default userAuthSlice.reducer