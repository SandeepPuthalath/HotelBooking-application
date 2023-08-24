import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import BannerCard from "./bannerCard";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../auth/Loading";
import { handleFetchingAllBanners } from "../../../redux/reducers/admin/AdminBannerReducer";

const BannerList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((s) => s.adminBanner?.loading);
  const message = useSelector((s) => s.adminBanner?.message);
  const banners = useSelector((s) => s.adminBanner?.banners);

  React.useEffect(() => {
    dispatch(handleFetchingAllBanners());
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mx-2 my-2 md:mx-5 md:my-5">
        <Typography variant="h4">Banner Management</Typography>
        <Button
          onClick={() => navigate("add-banner")}
          size="sm"
          className="shadow-none hover:shadow-none"
        >
          Add Banner
        </Button>
      </div>
      <section className="parent-section grid md:grid-cols-2 gap-y-5">
        {banners?.map((banner) => (
          <Link  key={banner?._id}  to={`${banner?._id}`}><BannerCard {...banner} /></Link> 
        ))}
      </section>
    </div>
  );
};

export default BannerList;
