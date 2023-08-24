import React from "react";
import { useSelector } from "react-redux";
import Loading from "../auth/Loading";
import {AiOutlineArrowLeft} from "react-icons/ai"
import { useNavigate } from "react-router-dom";

const BooingSuccess = () => {
  const loading = useSelector((s) => s.bookings?.loading);
  const booking = useSelector((s) => s.bookings?.booking);
  const navigate = useNavigate()

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="bg-light-green-200 min-w-full p-20">
      <div className="border-2 bg-light-green-500 border-light-green-400 rounded-lg">
        <div className="flex justify-center px-5 py-5">
          <h1 className="text-3xl font-extrabold uppercase text-light-green-900">
            Success
          </h1>
        </div>
        <div className="px-10 py-10 bg-light-green-300 text-light-green-900 items-center capitalize text-lg font-semibold">
          <div className="flex justify-between mb-2">
            <p>Booking date</p>
            <p>{booking?.createdAt.split("T")[0]}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Booking id</p>
            <p>{booking?._id.substring(0, 10)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Booking name</p>
            <p>{booking?.name}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>email</p>
            <p>{booking?.email}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Check in date</p>
            <p>{booking?.checkInDate.split("T")[0]}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Check out date</p>
            <p>{booking?.checkOutDate.split("T")[0]}</p>
          </div>
        </div>
        <div className="border-t-2 p-5 text-light-green-900 text-3xl font-extrabold bg-light-green-500 border-light-green-400 flex justify-between items-center">
          <h3 className="">Total Amount</h3>
          <h3>{booking?.price}</h3>
        </div>
      </div>
      <div className="w-full flex justify-center items-center p-5">
        <button onClick={()=> navigate("/")} className="capitalize border-2 rounded-md border-light-green-700 flex justify-center items-center gap-1 hover:bg-light-green-200 bg-light-green-50 font-semibold text-light-green-900 px-3 py-2">
          <AiOutlineArrowLeft />
          <span>go back to home</span>
        </button>
      </div>
    </div>
  );
};

export default BooingSuccess;
