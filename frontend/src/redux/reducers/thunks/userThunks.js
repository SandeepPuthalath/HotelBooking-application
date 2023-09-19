import { createAsyncThunk } from "@reduxjs/toolkit";
import userAxios from "../../api/userApi";

export const getUserProfile = createAsyncThunk(
    "userDetails",
    async (payload) => {
      const response = await userAxios.get("/profile/" + payload);
      return response.data;
    }
  );


  
export const updateUserProfile = createAsyncThunk(
  "udpateProfile",
  async (payload) => {
    const { userId, updates } = payload;
    const response = await userAxios.put(
      "/profile/update/" + userId,
      updates
    );
    return response.data;
  }
);


