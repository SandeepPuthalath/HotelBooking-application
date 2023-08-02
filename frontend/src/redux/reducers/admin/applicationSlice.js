import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminAxios from "../../api/adminApi";

const fetchAllApplications = createAsyncThunk("admin/fetchApplications", async () =>{

    const response = adminAxios.get()
})


const applicationSlice = createSlice({
    name:"admin/applications",
    initialState:{
        data: null,
        loading: false,
        error: null,
      },
      reducers:{},
      extraReducers:(builder) =>{

      }
})