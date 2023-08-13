import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  addMyHotel,
  fetchMyHotelDetails,
} from "../redux/reducers/hotel/myHotelSlice";
import { FaHotel } from "react-icons/fa";
import { Rating } from "@material-tailwind/react";
import UserRooms from "../components/room/UserRooms";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "../util/ErrorBundary";
import Loading from "../components/auth/Loading";

const cloudName = "da88acifi";
const uploadPreset = "BookIt_uploades";

export const separatePhotoId = (url) => {
  const parts = url.split("/");

  const desiredString = parts[parts.length - 1];

  const result = desiredString.replace(".jpg", "");

  return result;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Hotel Name is required"),
  address: Yup.string().required("Address is required"),
  destination: Yup.string().required("Destination is required"),
  distance: Yup.string().required("Distance is required"),
  desc: Yup.string().required("Description is required"),
  cheapestPrice: Yup.number().required("Cheapest Price is required"),
  photos: Yup.string(),
});

const MyHotel = () => {
  const loading = useSelector((s) => s.myHotel?.loading);
  const error = useSelector((s) => s.myHotel?.error);
  const myHotelData = useSelector((s) => s.myHotel?.data);
  const applicantId = useSelector((s) => s.user?.data?.applicantId);
  const destinaitons = useSelector(s => s.allDestinations?.data)
  const dispatch = useDispatch();

  const [imageUrl, setImageUrl] = useState("");
  const [urlId, setUrlId] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchMyHotelDetails(applicantId));
  }, [dispatch]);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (values, { resetForm }) => {
    // Handle form submission here
    values["photos"] = urlId;
    console.log(values);
    const payload = {
      userId: applicantId,
      hotel: values,
    };
    dispatch(addMyHotel(payload));

    // Reset the form after submission
    resetForm();
  };
  const handleUpload = (event) => {
    const file = event.target.files[0];

    // Create a new FormData object
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    // Perform the image upload using the Cloudinary Upload API
    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.secure_url);
        const url_id = separatePhotoId(data.secure_url);
        setUrlId(url_id);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  if(loading){
    return <Loading/>
  }

  return (
    <>
      {!myHotelData ? (
        <div className="p-6">
          <Card>
            <CardBody>
              <Typography variant="h3" className="m-2">
                My Hotel
              </Typography>
              <div className="flex justify-between items-center">
                <div className="w-1/2">
                  <img
                    className="h-96 w-full object-contain"
                    onClick={handleIconClick}
                    src={imageUrl ? imageUrl : "/defaults/default-image.jpg"}
                    alt="img-blur-shadow"
                  />
                  <div className="flex justify-center items-center">
                    <Button
                      onClick={handleIconClick}
                      variant="gradient"
                      className="flex items-center m-2 gap-3"
                    >
                      <CloudArrowUpIcon strokeWidth={2} className="h-5 w-5" />{" "}
                      Upload Files
                    </Button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleUpload}
                    className="hidden"
                    name="image"
                    id="file-input"
                  />
                </div>
                <div className="w-1/2 flex justify-center items-center">
                  <div className="flex flex-col w-72">
                    <div className="ml-2">
                      <Typography variant="h4">Hotel Details</Typography>{" "}
                    </div>
                    <Formik
                      initialValues={{
                        name: "",
                        address: "",
                        destination: "",
                        distance: "",
                        desc: "",
                        cheapestPrice: "",
                        photos: "",
                      }}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      <Form>
                        <div className="m-3">
                          <Field name="name">
                            {({ field }) => (
                              <>
                                <Input
                                  variant="standard"
                                  label="Hotel Name"
                                  {...field}
                                />
                                <ErrorMessage
                                  name="name"
                                  component="div"
                                  className="text-red-500"
                                />
                              </>
                            )}
                          </Field>
                        </div>
                        <div className="m-3">
                          <Field name="destination">
                            {({ field }) => (
                              <>
                                <label htmlFor="type">Destination</label>
                                <select
                                  {...field}
                                  id="destination"
                                  className="w-full p-2 border"
                                >
                                  <option value="">Select a type</option>
                                  {destinaitons.map(destination => <option key={destination?._id} value={destination?.name}>{destination?.name}</option>)}
                                  {/* Add more options as needed */}
                                </select>
                                <ErrorMessage
                                  name="destination"
                                  component="div"
                                  className="text-red-500"
                                />
                              </>
                            )}
                          </Field>
                        </div>

                        <div className="m-3">
                          <Field name="address">
                            {({ field }) => (
                              <>
                                <Input
                                  variant="standard"
                                  label="Address"
                                  {...field}
                                />
                                <ErrorMessage
                                  name="address"
                                  component="div"
                                  className="text-red-500"
                                />
                              </>
                            )}
                          </Field>
                        </div>
                        <div className="m-3">
                          <Field name="distance">
                            {({ field }) => (
                              <>
                                <Input
                                  variant="standard"
                                  label="Distance"
                                  {...field}
                                />
                                <ErrorMessage
                                  name="distance"
                                  component="div"
                                  className="text-red-500"
                                />
                              </>
                            )}
                          </Field>
                        </div>
                        <div className="m-3">
                          <Field name="desc">
                            {({ field }) => (
                              <>
                                <Input
                                  variant="standard"
                                  label="Description"
                                  {...field}
                                />
                                <ErrorMessage
                                  name="desc"
                                  component="div"
                                  className="text-red-500"
                                />
                              </>
                            )}
                          </Field>
                        </div>
                        <div className="m-3">
                          <Field name="cheapestPrice">
                            {({ field }) => (
                              <>
                                <Input
                                  variant="standard"
                                  label="Cheapest Price"
                                  {...field}
                                />
                                <ErrorMessage
                                  name="cheapestPrice"
                                  component="div"
                                  className="text-red-500"
                                />
                              </>
                            )}
                          </Field>
                        </div>
                        <div className="m-3">
                          <Field name="photos">
                            {({ field, form }) => (
                              <>
                                <input
                                  type="text"
                                  label="Photos"
                                  {...field}
                                  onChange={(e) => {
                                    // Use setFieldValue to update the 'photos' field value
                                    form.setFieldValue(
                                      "photos",
                                      e.target.value
                                    );
                                  }}
                                />
                                <ErrorMessage
                                  name="photos"
                                  component="div"
                                  className="text-red-500"
                                />
                              </>
                            )}
                          </Field>
                        </div>
                        <div className="p-2">
                          <Button color="blue" type="submit">
                            Add Hotel
                          </Button>
                        </div>
                      </Form>
                    </Formik>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      ) : (
        <div className="w-full relative">
          <figure className="relative h-80 w-full">
            <img
              className="h-full w-full"
              src={`https://res.cloudinary.com/${cloudName}/image/upload/v1689876154/BookIt_uploades/${myHotelData?.photos[0]}.jpg`}
              alt=""
            />
            <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <FaHotel fontSize={30} />
                  <Typography variant="h4">{myHotelData?.name}</Typography>
                </div>
                <div className="flex items-center">
                  <Typography>{myHotelData?.address}</Typography>
                </div>
                <div className="flex gap-2 items-center">
                  <Typography>Type: {myHotelData?.type}</Typography>
                  <Typography>Distance :{myHotelData?.distance}</Typography>
                </div>
                <div className="flex items-center">
                  <Typography>Rating: </Typography>
                  <Rating value={myHotelData?.Rating} readonly />
                </div>
              </div>
              <div className="flex w-1/2">
                <Typography variant="paragraph">
                  {myHotelData?.desc.substring(0, 150)}
                </Typography>
              </div>
            </figcaption>
          </figure>
          <ErrorBoundary fallback={<h1>somthing went wrong</h1>}>
            {<Outlet />}
          </ErrorBoundary>
        </div>
      )}
    </>
  );
};

export default MyHotel;

// https://res.cloudinary.com/da88acifi/image/upload/v1689876154/BookIt_uploades/qcehomucb6vsiyesvcp7.jpg

// https://res.cloudinary.com/da88acifi/image/upload/da88acifi/BookIt_uploades/qcehomucb6vsiyesvcp7.jpg
