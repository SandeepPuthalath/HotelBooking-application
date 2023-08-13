import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { viewAllHotels } from "../redux/reducers/hotel/hotelThunk";
import { Link } from "react-router-dom";
import HotelGridSkeleton from "../components/Shimmers/HotelGridSkeleton";
import {
  Button,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { handleDestinationSearch } from "../redux/reducers/hotel/hotelSlice";

const HotelCard = React.lazy(() => import( "../components/hotel/hotelCard"))  

export default function Hotels() {
  const loading = useSelector(s => s.hotels?.loading)
  const hotels = useSelector(s => s.hotels?.data)
  const dispatch = useDispatch();
  const [destination, setDestination] = useState("");
  const destinations = useSelector(s => s.allDestinations?.data)


  useEffect(() => {
    dispatch(viewAllHotels());
  }, []);

  const handleSetSearchValue = (e) => {
    setDestination(e);
  };

  const handleSearch = () => {
    dispatch(handleDestinationSearch(destination))
  };

  if (loading) return <HotelGridSkeleton />;

  return (
    <>
      <div className="flex bg-gray-900 p-8 gap-2">
        <div className="w-72">
          <Select onChange={handleSetSearchValue} label="Select a destination" name="destination">
           { destinations.map(destination => <Option key={destination?.key} value={destination?.name}>{destination?.name}</Option>)}
          </Select>
        </div>
        <div>
          <Button onClick={handleSearch} className="shadow-none bg-gray-300 text-gray-700">Search</Button>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center mt-4">
        <Typography variant="h3">
          Hotels
        </Typography>
      </div>
      <div className="grid md:grid-cols-3 gap-8 items-center justify-center p-20">
        {hotels.map((hotel) => (
          <Link to={"/hotel/" + hotel._id} key={hotel?._id}>
            <HotelCard {...hotel} />
          </Link>
        ))}
        <div className="md:col-span-2 max-h-[61vh] overflow-y-scroll no-scrollbar">
          <div className="flex flex-col gap-5"></div>
        </div>
      </div>
    </>
  );
}
