import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../../components/Navbar/Header";
import Footer from "../../components/footer/Footer";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

const BookingsPage = React.lazy(() => import("../../pages/BookingsPage"))
const Home = React.lazy(() => import("../../pages/Home"))
const OnwerBookingPage = lazy(() =>
  import("../../pages/owner/OnwerBookingPage")
);
const OwnerDashboard = lazy(() =>
  import("../../components/onwer/OwnerDashboard")
);
const OwnerBooking = lazy(() => import("../../components/onwer/OwnerBooking"));
const OwnerBookingDetails = lazy(() =>
  import("../../components/onwer/OnwerBookingDeails")
);
const MyHotel = lazy(() => import("../../pages/MyHotel"));
const Profile = lazy(() => import("../../pages/Profile"));
const Hotels = lazy(() => import("../../pages/Hotels"));
const HotelDetails = lazy(() => import("../../pages/HotelDetails"));
const UserRooms = lazy(() => import("../../components/room/UserRooms"));
const UserRoom = lazy(() => import("../../components/room/UserRoom"));

export default function UserRouter() {
  const state = useSelector((s) => s);
  const token = state.user?.data?.token;
  const decoded = token ? jwtDecode(token) : null;
  const userDetails = decoded ? JSON.parse(decoded?.payload) : null;
  const hotelId = state.myHotel.data?._id;

  const owner = userDetails?.role === "business";

  React.useEffect(() => {}, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="hotels"
          element={
            <Suspense>
              <Hotels />
            </Suspense>
          }
        />
        <Route
          path="hotel/:id"
          element={
            <Suspense>
              <HotelDetails />
            </Suspense>
          }
        />
        <Route
          path="profile"
          element={
            token ? (
              <Suspense>
                <Profile />
              </Suspense>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="bookings"
          element={
            token ? (
              <Suspense>
                <BookingsPage />
              </Suspense>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="my-hotel"
          element={
            token && owner ? (
              <Suspense>
                <MyHotel />
              </Suspense>
            ) : (
              <Navigate to="/" />
            )
          }
        >
          <Route
            index
            element={
              token ? (
                <Suspense>
                  <OwnerDashboard />
                </Suspense>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="rooms"
            element={
              token ? (
                <Suspense>
                  <UserRooms hotelId={hotelId} />
                </Suspense>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="room/:roomId"
            element={
              token ? (
                <Suspense>
                  <UserRoom hotelId={hotelId} />
                </Suspense>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="bookings"
            element={
              token ? (
                <Suspense>
                  <OnwerBookingPage />
                  {/* <OwnerBooking hotelId={hotelId}/> */}
                </Suspense>
              ) : (
                <Navigate to="/" />
              )
            }
          >
            <Route
              index
              element={
                <Suspense>
                  <OwnerBooking hotelId={hotelId} />
                </Suspense>
              }
            />
            <Route
              path=":bookingId"
              element={
                <Suspense>
                  <OwnerBookingDetails hotelId={hotelId} />
                </Suspense>
              }
            />
          </Route>
        </Route>
        <Route path="*" element={<h1>404 page not found</h1>} />
      </Routes>
      <Footer />
    </>
  );
}
