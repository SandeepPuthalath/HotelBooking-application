import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleGetUsersAllBookings,
  resetState,
} from "../redux/reducers/booking/bookingSlice";
import Loading from "../components/auth/Loading";
import BookingCard from "../components/booking/BookingCard";

const BookingsPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector((s) => s.bookings?.loading);
  const bookings = useSelector((s) => s.bookings?.bookings);
  const error = useSelector((s) => s.bookings?.error);
  const applicantId = useSelector((state) => state?.user?.data?.applicantId);

  React.useEffect(() => {
    dispatch(handleGetUsersAllBookings(applicantId));
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="m-10 bg-gray-100 shadow-lg p-10 rounded-md">
        <div className="flex justify-center">
          <h1 className="text-2xl font-semibold uppercase">Bookings</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 grid-flow-row gap-5 m-10">
        {!bookings
          ? "No Booking to show"
          : bookings?.map((booking) => (
              <BookingCard key={booking?._id} {...booking} />
            ))}
      </div>
    </>
  );
};

export default BookingsPage;
