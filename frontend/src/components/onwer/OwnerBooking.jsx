import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../auth/Loading";
import { handleGettingAllBookingsOfHotel } from "../../redux/reducers/owner/ownerBookingReducer";
import {BiEdit} from "react-icons/bi"
import { Link } from "react-router-dom";


const BookingTableRow = ({ _id, name, price, phoneNumber, email, status, no }) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
      <td className="px-6 py-4">{no}</td>
      <th
        scope="row"
        className="px-6 py-4 font-medium capitalize text-gray-900 whitespace-nowrap dark:text-white"
      >
        {name}
      </th>
      <td className="px-6 py-4">{phoneNumber}</td>
      <td className="px-6 py-4">{email}</td>
      <td className= "px-6 py-4">
        <span className={`font-semibold p-1 rounded-sm  uppercase ${status === "booked" || status === "completed" ? 'text-green-900 bg-green-200': 'text-red-900 bg-red-200'}`}>
        {status}
        </span>
        </td>
      <td className="px-6 py-4 font-semibold">₹ {price}</td>
      <td className="px-6 py-4 text-right">
        <Link
          to={`${_id}`}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          <BiEdit size={25}/>
        </Link>
      </td>
    </tr>
  );
};

const OwnerBooking = ({ hotelId }) => {
  const dispatch = useDispatch();
  const loading = useSelector((s) => s.ownerBooking?.loading);
  const bookings = useSelector((s) => s.ownerBooking?.bookings);

  React.useEffect(() => {
    dispatch(handleGettingAllBookingsOfHotel(hotelId));
  }, []);

  if (loading) {
    console.log("got here", loading);
    return (
      <div className="min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="mx-10 my-10">
      <div className="flex my-2 justify-center items-center">
        <span className="text-2xl font-semibold uppercase">
          Booking Details
        </span>
      </div>
      <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-900 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sl No
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone number
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <BookingTableRow key={booking._id} {...booking}  no={index+1}/>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OwnerBooking;
