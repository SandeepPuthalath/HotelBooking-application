import { Typography } from "@material-tailwind/react";
import DestinationCard from "../components/destination/DestinationCard";
import HomeCarousel from "../components/carousel/HomeCarousel";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeaturedDestinations } from "../redux/reducers/destination/destinationReducer";
import Loading from "../components/auth/Loading";
import TopHotels from "../components/homepage/TopHotels";

export default function Home() {
  const dispatch = useDispatch();
  const loading = useSelector((s) => s.destinations.loading);
  const featured = useSelector((s) => s.destinations.featured);

  useEffect(() => {
    dispatch(fetchFeaturedDestinations(4));
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className=" mx-5 my-10">
      <section className="grid grid-cols-1">
        <HomeCarousel />
      </section>
      <section className="flex flex-col mt-20">
        <div className="flex item-center justify-center py-5">
          <Typography variant="h4" className="uppercase">Top Destinations</Typography>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {featured?.map((destination) => (
            <DestinationCard key={destination?._id} {...destination} />
          ))}
        </div>
      </section>
      <section className="mt-20">
        <TopHotels/>
      </section>
    </main>
  );
}
