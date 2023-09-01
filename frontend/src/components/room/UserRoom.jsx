import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchRoomDetails } from "../../redux/reducers/room/roomDetailsSlice";
import { Typography } from "@material-tailwind/react";
import RoomImageView from "./RoomImageView";
import { resetError } from "../../redux/reducers/room/roomsSlice";
import RoomInfo from "./RoomInfo";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../auth/Loading";

const UserRoom = ({ hotelId }) => {
  const loading = useSelector((s) => s.roomDetails.loading);
  const roomData = useSelector((s) => s.roomDetails.data);
  const error = useSelector((s) => s.roomDetails.error);
  const dispatch = useDispatch();
  const { roomId } = useParams((s) => s?.roomId);



  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  React.useEffect(() => {
    dispatch(fetchRoomDetails({ hotelId, roomId }));
    dispatch(resetError());
  }, []);

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <h1>Error: {error?.message}</h1>;
  }

  return (
    <>
      <div className="relative flex py-4 justify-center items-center shadow">
        <div
          onClick={handleDelete}
          className="absolute right-10 cursor-pointer"
        >
          <FaTrash size={30} color="red" />
        </div>
        <Typography variant="h3">Room Details</Typography>
      </div>
      <div className="grid md:grid-cols-2 my-5 gap-2">
        <div className="md:col-span-1">
          <div className="flex flex-col items-center justify-center">
            <RoomImageView
              photos={roomData?.photos}
              roomId={roomData?._id}
              hotelId={hotelId}
            />
          </div>
        </div>
        <div className="md:col-span-1">
          <div className="flex justify-center items-center">
            <RoomInfo {...roomData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRoom;
