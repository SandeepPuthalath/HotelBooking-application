import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchingTopHotels } from "../../redux/reducers/hotel/hotelSlice";
import HotelCard from "../../components/hotel/hotelCard"
import { Link, useNavigate } from "react-router-dom";



const TopHotels = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const topHotels = useSelector((s) => s.hotels.featured);
  React.useEffect(() => {
    dispatch(handleFetchingTopHotels());
  }, [dispatch]);
  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center">
        <h4 className="text-2xl uppercase my-5 font-semibold">Top hotels</h4>
      </div>
      <div className="grid md:grid-cols-4 py-2 gap-2">
        {topHotels?.map((hotel) => (
          <Link to={"/hotel/" + hotel._id} key={hotel?._id}>
            <HotelCard {...hotel} />
          </Link>
        ))}
      </div>
      <div className="mx-auto py-2">
        <button onClick={() => navigate("/hotels")} className="px-3 py-1  rounded block border-2 border-gray-500 focus:border-gray-900  text-gray-900 font-semibold">View all</button>
      </div>
    </div>
  );
};

export default TopHotels;
