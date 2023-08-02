import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchRoomDetails } from "../../redux/reducers/room/roomDetailsSlice";
import { Typography } from "@material-tailwind/react";
import RoomImageView from "./RoomImageView";
import { resetError } from "../../redux/reducers/room/roomsSlice";
import RoomInfo from "./RoomInfo";
import { FaTrash } from "react-icons/fa";
import { AlertMessage } from "../alerts/AlertMessage";

const UserRoom = ({ hotelId }) => {
  const loading = useSelector((s) => s.roomDetails.loading);
  const roomData = useSelector((s) => s.roomDetails.data);
  const error = useSelector((s) => s.roomDetails.error);
  const dispatch = useDispatch();
  const { roomId } = useParams((s) => s?.roomId);
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const handleOpen = () => {
    setOpen((s) => !s);
  };

  const handleIsDeleting = (status) => {
    setIsDelete(status);
  };

  const handleDelete = () => {
    if (!isDelete) {
      return;
    }
  };

  React.useEffect(() => {
    dispatch(fetchRoomDetails({ hotelId, roomId }));
    dispatch(resetError());
  }, []);

  if (loading) {
    return <h1>Loading.......</h1>;
  }

  if (error) {
    return <h1>Error: {error?.message}</h1>;
  }

  return (
    <>
      <div className="relative flex py-4 justify-center items-center shadow">
        <div
          onClick={() => {
            handleOpen();
            handleDelete();
          }}
          className="absolute right-10 cursor-pointer"
        >
          <FaTrash size={30} color="red" />
        </div>
        <Typography variant="h3">Room Details</Typography>
      </div>
      <div className="flex items-center justify-center my-5 gap-2">
        <div className="flex flex-col w-1/2 items-center justify-center">
          <RoomImageView
            photos={roomData?.photos}
            roomId={roomData?._id}
            hotelId={hotelId}
          />
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <RoomInfo {...roomData} />
        </div>
      </div>
      <AlertMessage open={open} onClose={handleOpen} hotelId={hotelId} roomId={roomId}/>
    </>
  );
};

export default UserRoom;
