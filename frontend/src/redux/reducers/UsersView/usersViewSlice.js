import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminAxios from "../../api/adminApi";


export const fetchUsersData = createAsyncThunk("admin/fetchUsersData", async () => {

    const response = await adminAxios.get("/users");

    return response.data

})


const initialState = {
    data: [],
    loading: false,
    error: null,
  }

const usersViewSlice = createSlice({
    name: "admin/users",
    initialState,
    reducers: {
       resetStateUsers: (state) => {
        state.loading = false
        state.data = []
        state.error = null
       }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(fetchUsersData.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchUsersData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload?.data;
          })
          .addCase(fetchUsersData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
    }
})


export const {resetStateUsers} = usersViewSlice.actions

export default usersViewSlice.reducer