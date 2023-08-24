import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../../components/Navbar/Header";
import Footer from "../../components/footer/Footer";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

const BookingSuccess = React.lazy(() =>
  import("../../components/booking/BooingSuccess")
);
const BookingsPage = React.lazy(() => import("../../pages/BookingsPage"));
const Home = React.lazy(() => import("../../pages/Home"));
const Profile = lazy(() => import("../../pages/Profile"));
const Hotels = lazy(() => import("../../pages/Hotels"));
const HotelDetails = lazy(() => import("../../pages/HotelDetails"));

export default function UserRouter() {
  const state = useSelector((s) => s);
  const token = state.user?.data?.token;
  const decoded = token ? jwtDecode(token) : null;
  const userDetails = decoded ? JSON.parse(decoded?.payload) : null;
  const hotelId = state.myHotel.data?._id;

  const owner = userDetails?.role === "business";

  React.useEffect(() => {}, []);

  return (
    <main className="pt-20">
      <Header />
      <Routes>
        <Route path="/" element={owner ? <Navigate to="/owner" /> : <Home />} />
        {!owner && (
          <Route
            path="hotels"
            element={
              <Suspense>
                <Hotels />
              </Suspense>
            }
          />
        )}
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
              <Navigate to="/login" />
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
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="success/:id"
          element={
            token ? (
              <Suspense>
                <BookingSuccess />
              </Suspense>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<h1>404 page not found</h1>} />
      </Routes>
      <Footer />
    </main>
  );
}
