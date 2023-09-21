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
import Loading from "../components/auth/Loading"
import { removeSearchValue, setSearchValue } from "../redux/reducers/destination/destinationReducer";

const HotelCard = React.lazy(() => import( "../components/hotel/hotelCard"))  

export default function Hotels() {
  const loading = useSelector(s => s.hotels?.loading)
  const hotels = useSelector(s => s.hotels?.data)
  const dispatch = useDispatch();
  const destination = useSelector((s) => s.destinations.search);
  const destinations = useSelector(s => s.allDestinations?.data)

  useEffect(() => {
    if(destination){
      dispatch(handleDestinationSearch(destination));
    } else {
      dispatch(viewAllHotels());
    }

    return () => dispatch(removeSearchValue())
  }, []);

  const handleSetSearchValue = (e) => {
    dispatch(setSearchValue(e));
  };

  const handleSearch = () => {
    console.log(destination)
    dispatch(handleDestinationSearch(destination))
  };

  if (loading) return <Loading/>;

  return (
    <section className="">
      <div className="flex justify-center gap-2 py-5">
        <div className="">
          <Select
            onChange={handleSetSearchValue}
            label="Select a destination"
            name="destination"
          >
            {destinations.map((destination) => (
              <Option key={destination?._id} value={destination?.name}>
                {destination?.name}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <Button
            size="md"
            onClick={handleSearch}
            className="shadow-none rounded-sm bg-gray-900 text-gray-100"
          >
            Search
          </Button>
        </div>
      </div>
      <div className="mt-10 ">
        <div className="flex justify-center">
          <Typography variant="h3" className="uppercase font-semibold">
            Hotels
          </Typography>
        </div>
      </div>
      <div className="px-10 py-10 min-h-screen">
        <div className="grid md:grid-cols-3 items-center justify-center gap-5">
          {hotels.map((hotel) => (
            <Link to={"/hotel/" + hotel._id} key={hotel?._id}>
              <HotelCard {...hotel} />
            </Link>
          ))}
          {/* <div className="md:col-span-2 max-h-[61vh] overflow-y-scroll no-scrollbar">
            <div className="flex flex-col gap-5"></div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
