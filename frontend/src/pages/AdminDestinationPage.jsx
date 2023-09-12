import React from "react";
import { DestinationTable } from "../components/admin/destinationManagement/DestinationTable";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Input } from "@material-tailwind/react";
import Loading from "../components/auth/Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  handleImageUpload,
  resetImgUploadState,
} from "../redux/reducers/imageUpload/imageUploadSlice";
import { separatePhotoId } from "./MyHotel";
import {
  handleAddDestination,
  resetState,
} from "../redux/reducers/admin/destination/destinationSlice";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Pleace enter a name"),
  photo: Yup.mixed()
    .required("Choose an image")
    // .test(
    //   "FILE_TYPE",
    //   "Invalid file type! please choose jpg",
    //   (value) => value && ["image/jpeg", "image/png"].includes(value.type)
    // ),
});

const AdminDestinationPage = () => {
  const dispatch = useDispatch();
  const uploadLoading = useSelector((s) => s.uploadImg.loading);
  const [imgUrl, setImgUrl] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [isAdd, setIsAdd] = React.useState(false);

  React.useEffect(() => {
    dispatch(resetImgUploadState());
    return () => dispatch(resetState());
  }, [dispatch]);
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const url = URL.createObjectURL(file);
    formik.setFieldValue("photo", url);
    setImgUrl(url);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      photo: "",
    },
    validationSchema,
    onSubmit: async (payload) => {
      dispatch(handleImageUpload(file)).then(async (response) => {
        payload.photo = separatePhotoId(response?.payload?.secure_url);
        dispatch(handleAddDestination(payload));
      });
    },
  });

  const handleChange = () => {
    setIsAdd((s) => !s);
    formik.resetForm();
    setFile(null);
    setImgUrl("");
  };

  return (
    <div className="px-1 py-1">
      <div className="flex flex-col bg-white">
        <div className="flex justify-center items-center py-2">
          <h3 className="font-bold uppercase text-2xl text-gray-900">
            Destinations
          </h3>
        </div>
        <div className="grid gap-2">
          {isAdd ? (
            <div className="">
              <div className="grid md:grid-cols-2 ">
                <div className=" relative md:col-span-1   border-gray-200 flex justify-center items-center">
                  <figure className="relative px-2 py-2">
                    {uploadLoading && <Loading />}
                    <img
                      loading="lazy"
                      className="md:min-h-[15rem] w-72 md:max-h-[15rem] shadow-sm shadow-gray-500  rounded-md object-cover object-center"
                      src={
                        imgUrl && !formik.errors.photo
                          ? imgUrl
                          : "/defaults/default-image.jpg"
                      }
                      alt="destinatiom img"
                    />
                  </figure>
                  {formik.errors.photo && (
                    <span className="absolute top-5 text-red-500">
                      {formik.errors.photo}
                    </span>
                  )}
                </div>
                <div className="md:col-span-1 px-10 py-10 md:px-5 md:py-5">
                  <div className="flex flex-col gap-5 justify-center items-center">
                    <div className="w-full text-center text-gray-900 text-md font-semibold uppercase">
                      Add Destination form
                    </div>
                    <Input
                      {...formik.getFieldProps("name")}
                      error={Boolean(formik.errors.name)}
                      label={
                        formik.errors.name
                          ? "Please enter the name"
                          : "Enter destination name"
                      }
                    />
                    <Input
                      onChange={handleFileSelect}
                      error={
                        formik.touched.photo && Boolean(formik.errors.photo)
                      }
                      label={
                        formik.errors.name
                          ? "Please choose and image"
                          : "Enter destination name"
                      }
                      type="file"
                    />
                    <div className="w-full flex justify-end items-center gap-2">
                      <button
                        className="bg-red-50 text-red-700 text-sm font-bold uppercase px-3 py-2 rounded-sm"
                        onClick={handleChange}
                      >
                        cancel
                      </button>
                      <button
                        onClick={formik.handleSubmit}
                        className="bg-gray-900 text-gray-50 text-sm font-bold uppercase px-3 py-2 rounded-sm"
                      >
                        submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-end items-center px-5">
              <button
                onClick={handleChange}
                className="px-3 py-2 bg-blue-700 text-xs text-gray-50 font-semibold uppercase rounded-sm my-1 shadow-md"
              >
                Add Destination
              </button>
            </div>
          )}
          <div className="px-2">
            <DestinationTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDestinationPage;
