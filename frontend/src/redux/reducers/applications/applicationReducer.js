import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import applicationApi from "../../api/applicationApi";
import { instance } from "../../api/instance";


export const handleRoleChangeApplication = createAsyncThunk("application/role-change", async (payload) => {
    try {

        const response = await instance.post("/application/role-change-application", payload);

        return response.data

    } catch (error) {

        throw new Error(error)

    }
})

export const handleFetchingApplications = createAsyncThunk("applications/fetchAll", async () => {

    try {
        const response = await applicationApi.get("/");

        return response.data

    } catch (error) {

        throw new Error(error)
    }

});

export const handleRoleChangeApproving = createAsyncThunk("applications/approve", async (payload) => {
    try {
        const response = await applicationApi.post(`/approve/${payload}`);

        return response.data

    } catch (error) {

        throw new Error(error)
    }
})


const applicationReducer = createSlice({
    name: "role-change/application",
    initialState: {
        loading: false,
        data: null,
        applications: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(handleRoleChangeApplication.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(handleRoleChangeApplication.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(handleRoleChangeApplication.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(handleFetchingApplications.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(handleFetchingApplications.fulfilled, (state, action) => {
                state.loading = false
                state.applications = action.payload?.data
            })
            .addCase(handleFetchingApplications.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(handleRoleChangeApproving.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(handleRoleChangeApproving.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(handleRoleChangeApproving.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

    }
})


export default applicationReducer.reducer