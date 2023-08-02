import { useDispatch } from "react-redux";
import HotelCard from "../components/hotel/hotelCard";
import { useEffect, useState } from "react";
import { viewAllHotels } from "../redux/reducers/hotel/hotelThunk";
import { Link } from "react-router-dom";
import HotelGridSkeleton from "../components/Shimmers/HotelGridSkeleton";
import {
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";

const FilterHotels = (search, hotels) => {
  const filteredData = hotels.filter((hotel) =>
    hotel?.address.toLowerCase().includes(search.toLowerCase())
  );

  return filteredData;
};

export default function Hotels() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredHotels, setFilteredHotels] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 10 seconds

    const fetchAllHotels = async () => {
      try {
        const { payload } = await dispatch(viewAllHotels());

        setHotels(payload?.data?.data);
        setFilteredHotels(payload?.data?.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllHotels();

    return () => clearTimeout(timer);
  }, []);

  const handleSetSearchValue = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    const data = FilterHotels(search, hotels);
    setFilteredHotels(data);
  };

  if (isLoading) return <HotelGridSkeleton />;

  return (
    <>
      <div className="flex bg-gray-900 p-8 gap-2">
        <div className="w-72">
          <Input onChange={handleSetSearchValue} label="Search Destination"/>
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
        {filteredHotels.map((hotel) => (
          <Link to={"/hotel/" + hotel._id} key={hotel._id}>
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
