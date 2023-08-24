import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminBannerApi from "../../api/adminBannerApi";


export const handleCreateBanner = createAsyncThunk("create/banner", async (payload) => {
    try {

        const response = await adminBannerApi.post('/', payload);

        return response.data

    } catch (error) {
        throw new Error(error)
    }
})


export const handleFetchingAllBanners = createAsyncThunk("read/banners", async (payload) => {
    try {

        const response = await adminBannerApi.get('/');

        return response.data

    } catch (error) {
        throw new Error(error)
    }
})


export const handleFetchingBannerDetails = createAsyncThunk('read/banner', async (bannerId) => {
    try {

        const response = await adminBannerApi.get(`/${bannerId}`);

        return response.data

    } catch (error) {
        throw new Error(error)
    }
})


export const handleBannerImageChange = createAsyncThunk('update/banner/img', async (payload) => {
    const { bannerId, cloudinaryImgUrl } = payload;
    try {
        const response = await adminBannerApi.patch(`/${bannerId}`, {cloudinaryImgUrl});
        return response.data
    } catch (error) {
        throw new Error(error)
    }
})

export const handleBannerDetailsUpdate = createAsyncThunk('update/banner/details', async (payload) => {
    const { bannerId, updates } = payload;
    try {
        const response = await adminBannerApi.put(`/${bannerId}`, updates);
        return response.data
    } catch (error) {
        throw new Error(error)
    }
})


export const handleBannerDeleteing = createAsyncThunk('update/banner/detele', async (bannerId) => {
    try {
        const response = await adminBannerApi.delete(`/${bannerId}`);
        return response.data
    } catch (error) {
        throw new Error(error)
    }
})



const initialState = {
    loading: false,
    banners: [],
    banner: null,
    message: "",
    error: null,
}

const adminBannerReducer = createSlice({
    name: "admin/banner",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(handleCreateBanner.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(handleCreateBanner.fulfilled, (state, action) => {
                state.loading = false
                state.message = action.payload?.message
            })
            .addCase(handleCreateBanner.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(handleFetchingAllBanners.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(handleFetchingAllBanners.fulfilled, (state, action) => {
                state.loading = false
                state.message = action.payload?.message
                state.banners = action.payload?.banners
            })
            .addCase(handleFetchingAllBanners.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(handleFetchingBannerDetails.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(handleFetchingBannerDetails.fulfilled, (state, action) => {
                state.loading = false
                state.message = action.payload?.message
                state.banner = action.payload?.banner
            })
            .addCase(handleFetchingBannerDetails.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(handleBannerImageChange.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(handleBannerImageChange.fulfilled, (state, action) => {
                state.loading = false
                state.banner = {
                    ...state.banner,
                   cloudinaryImgUrl: action.payload?.banner?.cloudinaryImgUrl
                }
                state.message = action.payload?.message
            })
            .addCase(handleBannerImageChange.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(handleBannerDetailsUpdate.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(handleBannerDetailsUpdate.fulfilled, (state, action) => {
                state.loading = false
                state.message = action.payload?.message
                state.banner = {...action.payload?.updated}
            })
            .addCase(handleBannerDetailsUpdate.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(handleBannerDeleteing.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(handleBannerDeleteing.fulfilled, (state, action) => {
                state.loading = false
                state.message = action.payload?.message
            })
            .addCase(handleBannerDeleteing.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})


export default adminBannerReducer.reducer;