import { Fragment } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  Input,
  Textarea,
  Select,
  Option,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRef } from "react";
import { separatePhotoId } from "../../pages/MyHotel";
import { cloudName, uploadPreset } from "../../config";
import { useDispatch } from "react-redux";
import { handleAddRoom } from "../../redux/reducers/room/roomsSlice";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  price: Yup.number().required("Price is required"),
  maxPeople: Yup.number().required("Max people is required"),
  desc: Yup.string().required("Description is required"),
  photos: Yup.string().required("Photos are required"),
});


export default function AddRoomDialog({ hotelId, open, onClose }) {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");
  const fileUploadRef = useRef(null);

  const handleFileSelect = () => {
    fileUploadRef.current.click();
  };

  const handleFileUpload = async (event) => {
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
        formik.setFieldValue("photos", url_id);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      maxPeople: "",
      desc: "",
      photos: "",
    },
    validationSchema,
    onSubmit: (payloads, { setSubmitting, setErrors }) => {
      try {
        dispatch(handleAddRoom({ hotelId, roomData: payloads }));
        toast.success("Room added successfull");
        window.location.reload();
      } catch (error) {
        toast.error("Somthing went wrong")
      }
    },
  });

  return (
    <Fragment>
      <Dialog open={open} size="xxl" handler={onClose}>
        <DialogHeader>Add New Room</DialogHeader>
        <DialogBody className="h-full" divider>
          <div className="flex justify-center items-center">
            <div className="w-full flex flex-col justify-center items-center">
              <Card className="h-64 w-96 cursor-pointer overflow-hidden transition-opacity hover:opacity-90">
                <img
                  alt="nature"
                  className="h-full w-full object-cover object-center"
                  src={imageUrl ? imageUrl : "/defaults/default-image.jpg"}
                />
              </Card>
              <div>
                <div className="hidden">
                  <input
                    onChange={handleFileUpload}
                    ref={fileUploadRef}
                    id="file-upload"
                    type="file"
                    name="image"
                    variant="static"
                    label="Max people"
                  />
                </div>
                <div className="my-5">
                  <Button onClick={handleFileSelect}>upload</Button>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <div className="flex flex-col w-72 gap-2">
                <Input
                  {...formik.getFieldProps("title")}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  variant="standard"
                  label="Title"
                />
                {formik.touched.title && formik.errors.title && (
                  <Typography variant="small" color="red">
                    {formik.errors.title}
                  </Typography>
                )}
                <Input
                  {...formik.getFieldProps("price")}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  variant="standard"
                  label="Price"
                />
                {formik.touched.price && formik.errors.price && (
                  <Typography variant="small" color="red">
                    {formik.errors.price}
                  </Typography>
                )}

                <Input
                  {...formik.getFieldProps("maxPeople")}
                  error={
                    formik.touched.maxPeople && Boolean(formik.errors.maxPeople)
                  }
                  variant="standard"
                  label="Max people"
                />
                {formik.touched.maxPeople && formik.errors.maxPeople && (
                  <Typography variant="small" color="red">
                    {formik.errors.maxPeople}
                  </Typography>
                )}
                <Textarea
                  {...formik.getFieldProps("desc")}
                  error={formik.touched.desc && Boolean(formik.errors.desc)}
                  variant="standard"
                  label="description"
                />
                {formik.touched.desc && formik.errors.desc && (
                  <Typography variant="small" color="red">
                    {formik.errors.desc}
                  </Typography>
                )}
                <Input
                  className="hidden"
                  {...formik.getFieldProps("photos")}
                  error={formik.touched.photos && Boolean(formik.errors.photos)}
                  variant="standard"
                />
                {formik.touched.photos && formik.errors.photos && (
                  <Typography className="hidden" variant="small" color="red">
                    {formik.errors.photos}
                  </Typography>
                )}
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={onClose} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={formik.handleSubmit}
          >
            <span>Submit</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
