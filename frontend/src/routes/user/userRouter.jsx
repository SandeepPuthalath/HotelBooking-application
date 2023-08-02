import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../../components/Navbar/Header";
import Home from "../../pages/Home";
import Footer from "../../components/footer/Footer";
import { useSelector } from "react-redux";
import BookingsPage from "../../pages/BookingsPage";

const MyHotel = lazy(() => import("../../pages/MyHotel"));
const Profile = lazy(() => import("../../pages/Profile"));
const Hotels = lazy(() => import("../../pages/Hotels"));
const HotelDetails = lazy(() => import("../../pages/HotelDetails"));
const UserRooms = lazy(() => import("../../components/room/UserRooms"));
const UserRoom = lazy(() => import("../../components/room/UserRoom"));

export default function UserRouter() {
  const state = useSelector((s) => s);
  const token = state.user?.data?.token;
  const hotelId = state.myHotel.data?._id;

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
          path="myhotel"
          element={
            token ? (
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
        </Route>
        <Route path="*" element={<h1>404 page not found</h1>} />
      </Routes>
      <Footer />
    </>
  );
}
