import { Button, Input, Typography } from "@material-tailwind/react";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRooms } from "../../redux/reducers/room/roomsSlice";
import RoomCard from "./RoomCard";
import AddRoomDialog from "./AddRoomDialog";

const filterRooms = (search, rooms) => {
  return rooms.filter((room) =>
    room?.title.toLowerCase().includes(search.toLowerCase())
  );
};

const UserRooms = ({ hotelId }) => {
  const dispatch = useDispatch();
  const loading = useSelector((s) => s.rooms?.loading);
  const roomsData = useSelector((s) => s.rooms?.data);
  const error = useSelector((s) => s.rooms?.error);
  const [filteredRooms, setFilteredRooms] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchAllRooms(hotelId));
    setFilteredRooms(roomsData);
  }, [dispatch]);

  const handleSearch = (event) => {
    const search = event.target.value;
    const filteredData = filterRooms(search, roomsData);
    setFilteredRooms(filteredData);
  };

  const handleOpen = () => setOpen((s) => !s);

  if (loading) {
    return <h1>Loading.....</h1>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center ">
        <div className="w-full shadow-md">
          <div className="flex items-center justify-center py-5">
            <Typography variant="h3">Available Rooms</Typography>
          </div>
          <div className="w-full flex justify-between items-center ">
            {" "}
            <div className="w-72 py-10 pl-10">
              <Input
                onChange={handleSearch}
                label="Search"
                icon={<FaSearch />}
              />
            </div>
            <Button onClick={handleOpen} className="my-10 mr-10">
              Add Room
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 my-10">
          {filteredRooms.map((room) => (
            <RoomCard key={room?._id} {...room} />
          ))}
        </div>
      </div>
      <AddRoomDialog hotelId={hotelId} open={open} onClose={handleOpen} />
    </>
  );
};

export default UserRooms;
