import { Button, Carousel, Typography } from "@material-tailwind/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleBannersFetching } from "../../redux/reducers/banner/bannerReducer";

export default function HomeCarousel() {
  const dispatch = useDispatch();
  const loading = useSelector((s) => s.banner.loading);
  const banners = useSelector((s) => s.banner.banners);
  const error = useSelector((s) => s.banner.error);

  React.useEffect(() => {
    dispatch(handleBannersFetching());
  }, []);

  const CarouselCard = ({ cloudinaryImgUrl, title, desc }) => {
    return (
      <div className="relative h-full w-full">
        <img
          src={cloudinaryImgUrl}
          alt="image1"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl uppercase"
            >
              {title}
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              {desc}
            </Typography>
            <div className="flex justify-center gap-2">
              <Button size="lg" className="rounded-sm" color="white">
                Explore
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Carousel className="rounded-xl h-96">
      {banners.map((banner) => (
        <CarouselCard key={banner?._id} {...banner} />
      ))}
    </Carousel>
  );
}
