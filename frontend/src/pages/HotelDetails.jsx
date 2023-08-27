import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { viewHotelDetails } from "../redux/reducers/hotel/hotelThunk";
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
import RatingDialog from "../components/rating/RatingDialog";
import Loading from "../components/auth/Loading";
import ReviewDialog from "../components/review/ReviewDialog";
import { handleFetchingReview } from "../redux/reducers/user/reviewReducer";

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
  const hotelLoading = useSelector((s) => s.HotelDetails?.loading);
  const roomsLoading = useSelector((s) => s.rooms?.loading);
  const rooms = useSelector((s) => s.rooms?.data);
  const userId = useSelector((s) => s.user?.data?.applicantId);
  const { id } = useParams();
  const hotel = useSelector((state) => state?.hotelDetails?.data);
  const hotelId = useSelector((s) => s.hotelDetails.data?._id);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = React.useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(handleRoomSearch(values))
        .then((response) => {
          console.log("success", response);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  });

  function handleReviewOpen() {
    setReviewDialogOpen(true);
  }

  useEffect(() => {
    try {
      dispatch(viewHotelDetails(id));
      dispatch(fetchAllRooms(id));
      dispatch(handleFetchingReview(hotelId)).then((response) => {
        console.log("reviews", response);
      });
    } catch (error) {
      throw new Error(error);
    }
  }, [dispatch]);

  if (hotelLoading || roomsLoading) {
    return <Loading />;
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
                  <MdLocationPin size={20} className="text-red-900" />
                  <span className="font-semibold">{hotel?.destination}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-1 justify-center items-center">
                  <Rating
                    unratedColor="amber"
                    ratedColor="amber"
                    onClick={() => setOpen(true)}
                    value={hotel?.totalRating}
                    readonly
                  />
                  <span className="font-semibold">{hotel?.totalRating}.0</span>
                </div>
              </div>
              <div className="flex gap-1">
                <p>To see customer reviews</p>
                <span
                  onClick={handleReviewOpen}
                  className="text-blue-800 cursor-pointer"
                >
                  click here
                </span>
              </div>
            </div>
          </div>
          {/* room listing grid */}
          <div className="md:col-span-4 px-5 py-5">
            <div className="flex flex-col gap-5">
              {rooms?.map((room) => (
                <Room key={room?._id} {...room} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <RatingDialog
        open={open}
        setOpen={setOpen}
        hotelId={hotel?._id}
        userId={userId}
      />
      <ReviewDialog open={reviewDialogOpen} setOpen={setReviewDialogOpen} />
    </>
  );
};

export default HotelDetails;
