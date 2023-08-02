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
        bookings:bookingSlice
        
    },
    preloadedState:persistedState
})

store.subscribe(() => {
    saveState(store.getState());
  });
  

export default store