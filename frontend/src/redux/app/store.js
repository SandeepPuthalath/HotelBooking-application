import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "../reducers/auth/user/userAuthSlice";
import userSlice from "../reducers/user/userSlice";
import hotelSlice from "../reducers/hotel/hotelSlice";
import hotelDetailsSlice from "../reducers/hotel/hotelDetailsSlice";
import adminAuthSlice from "../reducers/auth/admin/adminAuthSlice";
import usersViewSlice from "../reducers/UsersView/usersViewSlice";
import myHotelSlice from "../reducers/hotel/myHotelSlice";
import roomsSlice from "../reducers/room/roomsSlice";
import roomDetailsSlice from "../reducers/room/roomDetailsSlice";
import userSignupSlice from "../reducers/auth/user/userSignupSlice";
import bookingSlice from "../reducers/booking/bookingSlice";
import imageUploadSlice from "../reducers/imageUpload/imageUploadSlice";
import destinationSlice from "../reducers/admin/destination/destinationSlice";
import destinationsSlice from "../reducers/admin/destination/destinationsSlice";
import applicationReducer from "../reducers/applications/applicationReducer";
import destinationReducer from "../reducers/destination/destinationReducer";
import ownerBookingReducer from "../reducers/owner/ownerBookingReducer";
import ownerDashboardReducer from "../reducers/owner/ownerDashboardReducer";
import AdminBannerReducer from "../reducers/admin/AdminBannerReducer";
import bannerReducer from "../reducers/banner/bannerReducer";
import reviewReducer from "../reducers/user/reviewReducer";
import chartsReducer from "../reducers/owner/chartsReducer";
import userChatReducer from "../reducers/chats/userChatReducer";


const loadState = () => {
    try {
      const serializedState = localStorage.getItem("reduxState");
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };
  
  // Save state to localStorage
  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("reduxState", serializedState);
    } catch (err) {
      // Handle potential errors while saving
    }
  };
  
  const persistedState = loadState();

const store = configureStore({
    reducer: {
        signup: userSignupSlice ,
        user: userAuthSlice,
        userProfile: userSlice,
        hotels: hotelSlice,
        hotelDetails: hotelDetailsSlice,
        admin: adminAuthSlice,
        usersView: usersViewSlice,
        myHotel: myHotelSlice,
        rooms: roomsSlice,
        roomDetails: roomDetailsSlice,
        bookings:bookingSlice,
        uploadImg:imageUploadSlice,
        destination: destinationSlice,
        allDestinations:destinationsSlice,
        application:applicationReducer,
        destinations:destinationReducer,
        ownerBooking: ownerBookingReducer,
        ownerDashboard: ownerDashboardReducer,
        adminBanner: AdminBannerReducer,
        banner: bannerReducer,
        review: reviewReducer,
        charts:chartsReducer,
        userChat:userChatReducer,
        
    },
    preloadedState:persistedState
})

store.subscribe(() => {
    saveState(store.getState());
  });
  

export default store