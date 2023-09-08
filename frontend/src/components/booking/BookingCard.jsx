import React from "react";
import { MdLocationPin } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { handleCancelBooking } from "../../redux/reducers/booking/bookingSlice";
import { Button } from "@material-tailwind/react";

const BookingCard = (probs) => {
  const dispatch = useDispatch();
  const userId = useSelector((s) => s.user?.data?.applicantId);
  const {
    _id,
    name,
    phoneNumber,
    email,
    address,
    maxPeople,
    checkInDate,
    checkOutDate,
    createdAt,
    price,
    hotelInfo,
    roomInfo,
    status,
  } = probs;

  const handleBookingCancel = (bookingId) => {
    console.log("clickecd", bookingId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(handleCancelBooking({bookingId,userId})).then((response) => {
          if(response?.error){
              return Swal.fire("Error!", "Somthing went wrong", "error");
          }

          return Swal.fire("Success!", `${response.payload?.message}`, "success").then(() => window.location.reload())

        });
      }
    });
  };
  return (
    <div className="card bg-blue-gray-400 rounded-md px-5 py-5">
      <div className="flex justify-center border-gray-400 border-b-[1px]">
        <h1 className="text-lg font-semibold">Booking details</h1>
      </div>
      <div className="flex flex-col m-5">
        <div className="flex justify-start items-center gap-2">
          <span className="font-semibold">Booking status:</span>
          <span
            className={`text-md ${
              status === "booked" ? "text-green-900" : "text-red-800"
            } font-semibold uppercase`}
          >
            {status}
          </span>
        </div>
        <div className="flex justify-start items-center gap-2">
          <span className="font-semibold">Booking Id:</span>
          <span className="text-md font-semibold uppercase">
            {_id?.substring(0, 10)}
          </span>
        </div>
        <div className="flex justify-start items-center gap-2">
          <span className="font-semibold">Booking date:</span>
          <span className="text-md font-semibold uppercase">
            {createdAt?.split("T")[0]}
          </span>
        </div>
        <div className="flex justify-start items-center gap-2">
          <span className="font-semibold">Hotel name :</span>
          <span className="text-xl font-semibold uppercase">
            {hotelInfo?.name}
          </span>
        </div>
        <div className="flex justify-start items-center gap-2">
          <span className="font-semibold">Destination :</span>
          <div className="flex items-center">
            <MdLocationPin color="red" />
            <span className="capitalize font-semibold">
              {hotelInfo?.destination}
            </span>
          </div>
        </div>
        <div className="flex justify-start items-center gap-2">
          <span className="font-semibold">Address :</span>
          <div className="flex items-center">
            <span className="capitalize font-semibold">
              {hotelInfo?.address}
            </span>
          </div>
        </div>
        <div className="flex justify-start items-center gap-2">
          <span className="font-semibold">RoomId :</span>
          <div className="flex items-center">
            <span className="uppercase font-semibold">
              {roomInfo?._id?.substring(0, 10)}
            </span>
          </div>
        </div>
        <div className="flex justify-start items-center gap-2">
          <span className="font-semibold">Room type :</span>
          <div className="flex items-center">
            <span className="capitalize font-semibold">{roomInfo?.title}</span>
          </div>
        </div>
        <div className="flex justify-start items-center gap-2">
          <span className="font-semibold">Booking name :</span>
          <div className="flex items-center">
            <span className="capitalize font-semibold">{name}</span>
          </div>
        </div>
        <div className="flex justify-start items-center gap-2">
          <span className="font-semibold">email :</span>
          <div className="flex items-center">
            <span className="font-semibold">{email}</span>
          </div>
        </div>
        <div className="flex justify-start items-center gap-2">
          <span className="font-semibold">People :</span>
          <div className="flex items-center">
            <span className="capitalize font-semibold">{maxPeople}</span>
          </div>
        </div>
        <div className="flex justify-start items-center gap-2">
          <span className="font-semibold">Check in date :</span>
          <div className="flex items-center">
            <span className="capitalize font-semibold">
              {checkOutDate?.split("T")[0]}
            </span>
          </div>
        </div>
        <div className="flex justify-start items-center gap-2 border-b-2 border-gray-400">
          <span className="font-semibold">Check out date :</span>
          <div className="flex items-center">
            <span className="capitalize font-semibold">
              {checkOutDate?.split("T")[0]}
            </span>
          </div>
        </div>
        <div className="flex justify-start items-center gap-2 mt-2">
          <span className="font-semibold text-lg">TOTAL AMOUNT :</span>
          <div className="flex items-center">
            <span className="capitalize font-semibold">{price}</span>
          </div>
        </div>
        <div className="flex justify-center ">
          <Button
            disabled={status === "booked" ? false : true}
            onClick={() => handleBookingCancel(_id)}
            className="bg-gray-900 text-center text-gray-100 font-semibold uppercase hover:bg-gray-800  hover:text-white rounded-md px-5 py-2"
          >
            Cancel Booking
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
