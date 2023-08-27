import { Dialog, Rating, Spinner, Textarea } from "@material-tailwind/react";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { handleReviewingHotel } from "../../redux/reducers/user/reviewReducer";
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  star: Yup.number().required("Please select star rating"),
  message: Yup.string().required("Please enter the review"),
});

const CustomerReviewCard = ({ postedBy, message, star, createdAt }) => {
  return (
    <div className="border border-gray-800 min-h-[5rem] max-h-[5rem] rounded-md shadow-md">
      <div className="flex flex-col px-2 py-2">
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center gap-1">
            <BsPersonCircle className="text-gray-600" size={25} />
            <h4 className="text-gray-800 font-semibold">
              {postedBy?.firstName.concat(" ", postedBy?.lastName)}
            </h4>
          </div>
          <div>
            <Rating
              unratedColor="amber"
              ratedColor="amber"
              value={star}
              readonly
            />
          </div>
        </div>
        <div>
          <p className="text-gray-900">{message}</p>
        </div>
      </div>
    </div>
  );
};

const ReviewDialog = ({ open, setOpen }) => {
  const access = useSelector((s) => s.user?.data?.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postedBy = useSelector((s) => s.user.data?.applicantId);
  const loading = useSelector((s) => s.review.loading);
  const reviews = useSelector((s) => s.review.reviews);
  const hotelId = useSelector((s) => s.hotelDetails.data?._id);
  const formik = useFormik({
    initialValues: {
      star: "",
      message: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if(!access) return navigate("/login")
      dispatch(handleReviewingHotel({ postedBy, ...values, id: hotelId })).then(
        (response) => {
          toast.success(response.payload?.message)
          formik.resetForm();
        }
      );
    },
  });

  return (
    <Dialog handler={() => setOpen(false)} size="md" open={open}>
      <div className="px-2 py-2">
        <div className="border-2 flex flex-col gap-1 border-gray-400 rounded-md max-h-[48vh] min-h-[48vh] overflow-y-auto px-1 py-1">
          {loading ? (
            <div className="relative w-full h-[45vh]  flex justify-center items-center">
              <Spinner className="h-12 w-12" />
            </div>
          ) : (
            reviews?.map((review) => <CustomerReviewCard {...review} />)
          )}
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="min-h-[20vh]">
            <div className="flex justify-center items-center">
              <span className="text-gray-700">Add rating & review</span>
            </div>
            <div className="w-full py-1">
              <div className="absolute flex justify-center items-center gap-2 w-full ">
                {formik.errors.star && (
                  <span className="text-xs  text-red-900">
                    {formik.errors.star}
                  </span>
                )}
                {formik.errors.message && (
                  <span className="text-xs  text-red-900">
                    {formik.errors.message}
                  </span>
                )}
              </div>
            </div>
            <div className="pt-1 pl-1">
              <div className="flex items-center gap-2">
                <span className="text-gray-700">Give star rating</span>
                <Rating
                  value={formik.values.star || 0}
                  onChange={(e) => formik.setFieldValue("star", e)}
                  unratedColor="amber"
                  ratedColor="amber"
                />
              </div>
            </div>
            <div className="py-1">
              <div className="">
                <Textarea
                  onChange={formik.handleChange}
                  value={formik.values.message}
                  name="message"
                  variant="outlined"
                  label="Please enter your review"
                />
              </div>
              <div className="flex justify-center flex-col gap-2">
                <button
                  type="submit"
                  className="w-full bg-gray-900 uppercase text-gray-50 py-2 font-semibold rounded-md border-2 border-gray-900 hover:bg-gray-50 hover:text-gray-900"
                >
                  submit review
                </button>
                <button
                  onClick={() => setOpen(false)}
                  type="button"
                  className="w-full bg-red-900 uppercase text-red-50 py-2 font-semibold rounded-md border-2 border-red-900 hover:bg-red-50 hover:text-red-900"
                >
                  cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default ReviewDialog;
