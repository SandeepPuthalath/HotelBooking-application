import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { Suspense } from "react";
const Header = React.lazy(() => import("../../components/Navbar/Header"));
const Footer = React.lazy(() => import("../../components/footer/Footer"));
const MyHotel = React.lazy(() => import("../../pages/MyHotel"));
const Profile = React.lazy(() => import("../../pages/Profile"));

const OnwerBookingPage = React.lazy(() =>
  import("../../pages/owner/OnwerBookingPage")
);
const OwnerDashboard = React.lazy(() =>
  import("../../components/onwer/OwnerDashboard")
);
const OwnerBooking = React.lazy(() => import("../../components/onwer/OwnerBooking"));
const OwnerBookingDetails = React.lazy(() =>
  import("../../components/onwer/OnwerBookingDeails")
);
const UserRooms = React.lazy(() => import("../../components/room/UserRooms"));
const UserRoom = React.lazy(() => import("../../components/room/UserRoom"));

const OwnerRouter = () => {
  const token = useSelector((state) => state.user?.data?.token);
  const decoded = token ? jwtDecode(token) : null;
  const userDetails = decoded ? JSON.parse(decoded?.payload) : null;
  const owner = userDetails?.role === "business";
  const hotelId = useSelector(state => state.myHotel.data?._id);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            token && owner ? (
              <Suspense>
                <MyHotel />
              </Suspense>
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route
            index
            element={
              token ? (
                <Suspense>
                  <OwnerDashboard hotelId={hotelId} />
                </Suspense>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="profile"
            element={
              <Suspense>
                <Profile />
              </Suspense>
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
          <Route path="*" element={<h1>404 page not found</h1>} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default OwnerRouter;
