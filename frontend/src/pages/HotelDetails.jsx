import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { viewHotelDetails } from "../redux/reducers/hotel/hotelThunk";
import HotelDetailsSkeleton from "../components/Shimmers/HotelDetailsSkeleton";
import { HotelDetailsCard } from "../components/hotel/HotelDetailsCard";
import {
  fetchAllRooms,
  handleRoomSearch,
} from "../redux/reducers/room/roomsSlice";
import Room from "../components/room/Room";
import { Button, Input, Rating, Typography } from "@material-tailwind/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { cloudName } from "../config";
import { MdLocationPin } from "react-icons/md";

const today = new Date().toISOString().split("T")[0];
const validationSchema = Yup.object().shape({
  checkInDate: Yup.date().required("Please enter check in date"),
  checkOutDate: Yup.date().required("Please enter check out date"),
});

const initialValues = {
  checkInDate: "",
  checkOutDate: "",
};

const HotelDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const loading = useSelector((s) => s.rooms?.loading);
  const roomsData = useSelector((s) => s.rooms?.data);
  const error = useSelector((s) => s.rooms?.error);
  const { id } = useParams();
  const HotelDetails = useSelector((state) => state?.HotelDetails);
  const [hotel, setHotel] = useState({});
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("search", values);
      dispatch(handleRoomSearch(values))
        .then((response) => {
          console.log("success", response);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 10 seconds
    async function fetchHotelDetails() {
      try {
        const { payload } = await dispatch(viewHotelDetails(id));
        setHotel(payload?.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchHotelDetails();
    dispatch(fetchAllRooms(id));
    return () => clearTimeout(timer);
  }, [dispatch]);

  if (isLoading) {
    return <HotelDetailsSkeleton />;
  }

  return (
    <>
      <section className="">
        {/* search areaa */}
        <div className="w-full py-2">
          <div className="flex justify-center items-center my-2">
            <h1 className="text-md font-semibold uppercase">Search</h1>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 md:flex-row">
            <div className="w-72">
              <Input
                type="date"
                {...formik.getFieldProps("checkInDate")}
                error={
                  formik.touched.checkInDate &&
                  Boolean(formik.errors.checkInDate)
                }
                min={today}
                label={
                  formik.touched.checkInDate && formik.errors.checkInDate
                    ? formik.errors.checkInDate
                    : "Check in date"
                }
              />
            </div>
            <div className="w-72">
              <Input
                type="date"
                {...formik.getFieldProps("checkOutDate")}
                error={
                  formik.touched.checkOutDate &&
                  Boolean(formik.errors.checkOutDate)
                }
                min={today}
                label={
                  formik.touched.checkOutDate && formik.errors.checkOutDate
                    ? formik.errors.checkOutDate
                    : "Check out date"
                }
              />
            </div>
            <div>
              <Button
                className="bg-gray-900 text-gray-100 rounded-sm hover:shadow-none"
                onClick={formik.handleSubmit}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-6 gap-5">
          {/* hotel details side */}
          <div className="md:col-span-2 px-5 py-5">
            <div className="">
              <div>
                <img
                  src={`https://res.cloudinary.com/${cloudName}/image/upload/v1689876154/BookIt_uploades/${hotel?.photos[0]}.jpg`}
                  alt="ui/ux review check"
                  className="object-cover rounded-md"
                />
              </div>
              <div>
                <h3 className="text-3xl font-semibold">{hotel?.name}</h3>
                <div className="flex">
                <MdLocationPin size={20} className="text-red-900"/>
                 <span>{hotel?.destination}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <Rating value={hotel?.rating} readonly />
                <Link to="/" className="text-blue-800">
                  review
                </Link>
              </div>
            </div>
          </div>
          {/* room listing grid */}
          <div className="md:col-span-4 px-5 py-5">
            <div className="flex flex-col gap-5">
              {roomsData?.map((room) => (
                <Room key={room?._id} {...room} />
              ))}
            </div>
          </div>
        </div>
        {/* <div className="grid md:grid-cols-3 gap-4 px-40 justify-center items-center">
          <div className="md:col-span-1">
            <div className="flex">
              <HotelDetailsCard {...hotel} />
            </div>
          </div>
          <div className="md:col-span-2 mt-3 max-h-[61vh] overflow-y-scroll no-scrollbar">
            <div className="flex flex-col gap-5">
              {roomsData?.map((room) => (
                <Room key={room?._id} {...room} />
              ))}
            </div>
          </div>
        </div> */}
      </section>
      <div className="flex flex-col justify-center items-center p-5">
        {/* <div>
          <Typography className="m-0" variant="h5">
            Search
          </Typography>
        </div>
        <div className="flex flex-row justify-center items-center p-2 gap-2">
          <div className="w-72">
            <Input
              type="date"
              {...formik.getFieldProps("checkInDate")}
              error={
                formik.touched.checkInDate && Boolean(formik.errors.checkInDate)
              }
              min={today}
              label={
                formik.touched.checkInDate && formik.errors.checkInDate
                  ? formik.errors.checkInDate
                  : "Check in date"
              }
            />
          </div>
          <div className="w-72">
            <Input
              type="date"
              {...formik.getFieldProps("checkOutDate")}
              error={
                formik.touched.checkOutDate &&
                Boolean(formik.errors.checkOutDate)
              }
              min={today}
              label={
                formik.touched.checkOutDate && formik.errors.checkOutDate
                  ? formik.errors.checkOutDate
                  : "Check out date"
              }
            />
          </div>
          <div>
            <Button onClick={formik.handleSubmit}>Search</Button>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default HotelDetails;
