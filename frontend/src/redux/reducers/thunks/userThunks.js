import { createAsyncThunk } from "@reduxjs/toolkit";
import userAxios from "../../api/userApi";

export const getUserProfile = createAsyncThunk(
    "userDetails",
    async (payload) => {
      const response = await userAxios.get("/profile/" + payload);
      return response?.data?.data;
    }
  );


  
export const updateUserProfile = createAsyncThunk(
  "udpateProfile",
  async (payload) => {
    const { applicantId, updates } = payload;
    console.log(applicantId, updates);
    const response = await userAxios.put(
      "/profile/update/" + applicantId,
      updates
    );
    return response;
  }
);


