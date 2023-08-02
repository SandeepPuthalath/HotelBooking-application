import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";



const initialState = {
    adminAuthToken: localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null,
    admin: localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null
};

const adminAuthSlice = createSlice({
    name: 'admin/auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.adminAuthToken = action.payload.adminAuthToken;
            state.admin = action.payload.admin
        },
        logoutAdmin: (state) => {
            state.adminAuthToken = null;
            state.admin = null;
            localStorage.removeItem('authTokens')
        }

    }

})

export const { setToken, logoutAdmin } = adminAuthSlice.actions

export default adminAuthSlice.reducer