import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Carousel,
  Dialog,
  DialogFooter,
  Input,
  Option,
  Radio,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { cloudName } from "../../config";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { handleBookingRoom } from "../../redux/reducers/booking/bookingSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PaymentDialog from "./PaymentDialog";

const today = new Date().toISOString().split("T")[0];

const isDateUnavailable = (date, unavailableDates) => {
  if (!date) {
    return false; // If date is not available, consider it as available
  }
  const dateString = new Date(date).toISOString().split("T")[0];
  return unavailableDates.includes(dateString);
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please fill in your name"),
  phoneNumber: Yup.number()
    .test("is-mobile-number", "Invalid mobile number", (value) => {
      const mobileNumberPattern = /^(\+\d{1,3}[- ]?)?\d{10}$/;
      return mobileNumberPattern.test(value);
    })
    .required("Please enter your mobile number"),
  email: Yup.string()
    .email("Please enter a valid email Address")
    .required("Email address is required"),
  address: Yup.string().required("Please enter your address"),
  maxPeople: Yup.number().required("Please select this field"),
  checkInDate: Yup.date().required("Please select check in date"),
  checkOutDate: Yup.date().required("Please select check out date"),
});

const initialValues = {
  name: "",
  phoneNumber: "",
  email: "",
  address: "",
  maxPeople: "",
  checkInDate: "",
  checkOutDate: "",
};

const BookingDialog = ({ open, setOpen, photos, ...roomInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((s) => s.bookings.loading);
  const message = useSelector((s) => s.bookings?.message);
  const applicantId = useSelector((state) => state?.user?.data?.applicantId);
  const access = useSelector((s) => s.user?.data?.token);
  const [price, setPrice] = React.useState(roomInfo?.price);
  const [paymentOpen, setPaymentOpen] = React.useState(false)
  const [bookingId, setBookingId] = React.useState('')

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (!access) {
        return navigate("/login");
      }
      values.roomId = roomInfo?._id;
      values.hotelId = roomInfo?.hoteId;
      values.price = price;
      values.userId = applicantId;
      console.log(values)
      dispatch(handleBookingRoom(values))
        .then((response) => {
          console.log("success", response);
          formik.isSubmitting = false;
          Swal.fire("Good job!", `${message}`, "success").then(() =>{
            setBookingId(response?.payload?.booking?._id)
            setPaymentOpen(true)
          })
          formik.resetForm();
          setOpen(false);
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
          Swal.fire("Error!", `${message}`, "error");
        });
    },
  });

  React.useEffect(() => {
    handlePriceChange();
  }, [formik.values.checkInDate, formik.values.checkOutDate]);

  const handlePriceChange = () => {
    if (formik.values.checkInDate && formik.values.checkOutDate) {
      console.log("got here");
      const diff =
        new Date(formik.values.checkOutDate) -
        new Date(formik.values.checkInDate);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
      const total = roomInfo?.price * days;
      setPrice(total);
    }
  };

  return (
    <>
      <Dialog
        className="overflow-y-auto"
        size="xxl"
        open={open}
        handler={() => setOpen(false)}
      >
        <div className="flex flex-col justify-center items-center m-10">
          <div className="">
            <Typography variant="h4">Booking</Typography>
          </div>
          <div className="w-full md:grid grid-cols-2 gap-2">
            <div className="md:col-span-1 grid justify-center items-center">
              <Card className="max-w-[24rem] overflow-hidden  shadow-none">
                <CardHeader shadow={false} floated={false}>
                  <Carousel>
                    {photos.map((photo) => {
                      return (
                        <img
                          src={`https://res.cloudinary.com/${cloudName}/image/upload/v1689876154/BookIt_uploades/${photo}.jpg`}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      );
                    })}
                  </Carousel>
                </CardHeader>
                <CardBody>
                  <div className="flex flex-row justify-between items-center">
                    <Typography variant="h5">{roomInfo?.title}</Typography>
                    <Typography variant="h5">₹ {roomInfo?.price}</Typography>
                  </div>
                  <Typography>{roomInfo?.desc.substring(0, 100)}</Typography>
                </CardBody>
                <CardFooter>
                  <div className="flex border-gray-500 justify-between border-t-2 pt-2">
                    <p className="text-2xl font-semibold">Total Price</p>
                    <p className="text-xl font-semibold">₹ {price}</p>
                  </div>
                </CardFooter>
              </Card>
            </div>
            <div className="md:col-span-1 pt-10">
              <div className="flex flex-col items-center justify-center gap-6">
                <div className="w-72">
                  <Input
                    {...formik.getFieldProps("name")}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    label={
                      formik.touched.name && formik.errors.name
                        ? formik.errors.name
                        : "Enter your name"
                    }
                  />
                </div>
                <div className="w-72">
                  <Input
                    type="number"
                    {...formik.getFieldProps("phoneNumber")}
                    error={
                      formik.touched.phoneNumber &&
                      Boolean(formik.errors.phoneNumber)
                    }
                    label={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                        ? formik.errors.phoneNumber
                        : "Enter your phone number"
                    }
                  />
                </div>
                <div className="w-72">
                  <Input
                    {...formik.getFieldProps("email")}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    label={
                      formik.touched.email && formik.errors.email
                        ? formik.errors.email
                        : "Enter your email"
                    }
                  />
                </div>
                <div className="w-72">
                  <Textarea
                    {...formik.getFieldProps("address")}
                    error={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                    label={
                      formik.touched.address && formik.errors.address
                        ? formik.errors.address
                        : "Enter your address"
                    }
                  />
                </div>
                <div className="w-72">
                  <Select
                    onChange={(e) => formik.setFieldValue("maxPeople", e)}
                    error={
                      formik.touched.maxPeople &&
                      Boolean(formik.errors.maxPeople)
                    }
                    label={
                      formik.touched.maxPeople && formik.errors.maxPeople
                        ? formik.errors.maxPeople
                        : "Number of people..?"
                    }
                  >
                    {Array.from(
                      { length: roomInfo.maxPeople },
                      (_, index) => index + 1
                    )?.map((value) => (
                      <Option key={value} value={value}>
                        {value}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="w-72 flex flex-col justify-between gap-2">
                  <div className="">
                    <Input
                      onChange={formik.handleChange}
                      size="md"
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
                  <div className="">
                    <Input
                      type="date"
                      {...formik.getFieldProps("checkOutDate")}
                      error={
                        formik.touched.checkOutDate &&
                        Boolean(formik.errors.checkOutDate)
                      }
                      min={formik.values.checkInDate}
                      label={
                        formik.touched.checkOutDate &&
                        formik.errors.checkOutDate
                          ? formik.errors.checkOutDate
                          : "Check out date"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-center items-center my-10 gap-2">
          <Button
            disabled={loading}
            onClick={() => setOpen(false)}
            variant="text"
            className="bg-red-100 text-red-800 rounded-sm"
          >
            Cancel
          </Button>
          <Button
            size="md"
            onClick={formik.handleSubmit}
            disabled={formik.isSubmitting}
            className="!border rounded-sm bg-gray-900 text-gray-200 shadow-none"
          >
            {loading ? "loading...." : "Book Now"}
          </Button>
        </DialogFooter>
      </Dialog>
      <PaymentDialog open={paymentOpen} setOpen={setPaymentOpen} bookingId={bookingId}/>
    </>
  );
};

export default BookingDialog;
