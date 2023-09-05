import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../../components/Navbar/Header";
import Footer from "../../components/footer/Footer";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HelpDesk = React.lazy(() => import("../../pages/HelpDesk"));
const BookingLayout = React.lazy(() =>
  import("../../components/booking/BookingLayout")
);
const BookingSuccess = React.lazy(() =>
  import("../../components/booking/BooingSuccess")
);
const BookingsPage = React.lazy(() => import("../../pages/BookingsPage"));
const BookingDetais = React.lazy(() =>
  import("../../components/booking/BookingDetails")
);
const Home = React.lazy(() => import("../../pages/Home"));
const Profile = lazy(() => import("../../pages/Profile"));
const Hotels = lazy(() => import("../../pages/Hotels"));
const HotelDetails = lazy(() => import("../../pages/HotelDetails"));
const Wallet = React.lazy(() => import("../../components/user/Wallet"))


export default function UserRouter() {
  const state = useSelector((s) => s);
  const token = state.user?.data?.token;
  const decoded = token ? jwtDecode(token) : null;
  const userDetails = decoded ? JSON.parse(decoded?.payload) : null;
  // const hotelId = state.myHotel.data?._id;

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
          path="/help-desk"
          element={
            token ? (
              <Suspense>
                <HelpDesk />
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
                <BookingLayout />
              </Suspense>
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route index={true} element={<BookingsPage />} />
          <Route path=":id" element={<BookingDetais />} />
        </Route>
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
        <Route path="/wallet/:id" element={token?
          <Suspense>
            <Wallet/>
          </Suspense>:
          <Navigate to="/login"/>
        } />
        <Route path="*" element={<h1>404 page not found</h1>} />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </main>
  );
}
