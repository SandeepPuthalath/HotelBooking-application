import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  handleBookingStatusChange,
  handleFetchingBookingDetails,
  resetBooking,
} from "../../redux/reducers/owner/ownerBookingReducer";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../auth/Loading";
import { Button, IconButton, Option, Select } from "@material-tailwind/react";
import { BiArrowBack } from "react-icons/bi";
import Swal from "sweetalert2";

const OnwerBookingDeails = ({ hotelId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((s) => s.ownerBooking.loading);
  const booking = useSelector((s) => s.ownerBooking?.booking);
  const message = useSelector((s) => s.ownerBooking?.message);
  const error = useSelector((s) => s.ownerBooking?.error);
  const { bookingId } = useParams();
  const [status, setStatus] = React.useState("");

  React.useEffect(() => {
    dispatch(handleFetchingBookingDetails(bookingId));

    return () => dispatch(resetBooking());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Loading />
      </div>
    );
  }

  const handleStatusChange = () => {
    if (!status) {
      return;
    }
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
        dispatch(handleBookingStatusChange(payload)).then((response) => {
          if (response?.errors) {
            Swal.fire("Error!", message, "error");
          }
        });
        Swal.fire("Deleted!", message, "success").then(() =>{
            window.location.reload()
        })
      }
    });
    const payload = {
      bookingId,
      status,
    };
  };

  return (
    <div className="min-h-screen ">
      <div className="relative my-10 mx-10 bg-gray-200 shadow-xl rounded-md">
        <div className="absolute left-5 top-5 flex items-center justify-center gap-1">
          <IconButton onClick={() => navigate(-1)} variant="text" size="lg">
            <BiArrowBack className=" text-blue-600 " size={30} />
          </IconButton>
        </div>
        <div className="flex justify-center">
          <h1 className=" text-xl md:text-3xl uppercase font-semibold my-5">
            Booking details
          </h1>
        </div>
        <div className="mx-5 flex md:flex-row flex-col justify-between">
          <div className="flex justify-center items-center gap-1">
            <h4 className="text-lg uppercase font-semibold">Status : </h4>
            <h4 className={`text-lg uppercase font-semibold ${booking?.status === "booked" || booking?.status === "completed" ? 'text-green-900 bg-green-200': 'text-red-900 bg-red-200'} rounded-md px-1`}>
              {booking?.status}
            </h4>
          </div>
          <div className="flex gap-5">
            <div className="w-72">
              <Select
                onChange={(event) => setStatus(event)}
                className="bg-gray-100"
                label="Change status"
                disabled={
                  booking?.status === "cancelled" ||
                  booking?.status === "completed"
                    ? true
                    : false
                }
                name="status"
              >
                <Option value="completed">Completed</Option>
                <Option value="cancelled">Cancelled</Option>
              </Select>
            </div>
            <Button
              disabled={
                booking?.status === "cancelled" ||
                booking?.status === "completed"
                  ? true
                  : false
              }
              onClick={handleStatusChange}
              color="blue-gray"
              className="shadow-none"
              variant="gradient"
            >
              Submit
            </Button>
          </div>
        </div>
        <div className="mx-5 py-5 border-b-2 border-gray-700">
          <p className="text-xs md:text-xl font-semibold uppercase mx-1">
            Booking Date: {booking?.createdAt.split("T")[0]}
          </p>
          <p className="text-xs md:text-xl font-semibold uppercase mx-1">
            Booking Id: {booking?._id.substring(0, 10)}
          </p>
        </div>

        <div className="mx-10 my-10 pb-10">
          <div className="flex justify-between pb-5">
            <p className="md:text-xl text-sm font-semibold">Customer name : </p>
            <p className="md:text-xl text-sm capitalize"> {booking?.name}</p>
          </div>
          <div className="flex justify-between pb-5">
            <p className="md:text-xl text-sm font-semibold">Phone number : </p>
            <p className="md:text-xl text-sm"> {booking?.phoneNumber}</p>
          </div>
          <div className="flex justify-between pb-5">
            <p className="md:text-xl text-sm font-semibold">Email : </p>
            <p className="md:text-xl text-sm"> {booking?.email}</p>
          </div>
          <div className="flex justify-between pb-5">
            <p className="md:text-xl text-sm font-semibold">
              Number of people :{" "}
            </p>
            <p className="md:text-xl text-sm"> {booking?.maxPeople}</p>
          </div>
          <div className="flex justify-between pb-5">
            <p className="md:text-xl text-sm font-semibold">Check in date : </p>
            <p className="md:text-xl text-sm">
              {" "}
              {booking?.checkInDate.split("T")[0]}
            </p>
          </div>
          <div className="flex justify-between pb-5">
            <p className="md:text-xl text-sm font-semibold">
              Check out date :{" "}
            </p>
            <p className="md:text-xl text-sm">
              {" "}
              {booking?.checkOutDate.split("T")[0]}
            </p>
          </div>
          <div className="flex justify-between pb-5">
            <p className="md:text-xl text-sm font-semibold">Total price : </p>
            <p className="md:text-xl text-sm"> {booking?.price}</p>
          </div>
          <div className="flex justify-between border-t-2 border-gray-700 my-2 pt-5">
            <h4 className="font-semibold md:text-2xl">Grand total :</h4>
            <h5 className="font-semibold md:text-2xl"> ₹ {booking?.price}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnwerBookingDeails;
