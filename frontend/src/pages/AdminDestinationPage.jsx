import React from "react";
import { DestinationTable } from "../components/admin/destinationManagement/DestinationTable";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Input, Typography } from "@material-tailwind/react";
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
  photo: Yup.string().required("Choose an image"),
});

const AdminDestinationPage = () => {
  const dispatch = useDispatch();
  const uploadLoading = useSelector((s) => s.uploadImg.loading);
  // const uploadData = useSelector((s) => s.uploadImg.data);
  // const uploadError = useSelector((s) => s.uploadImg.error);
  const [imgUrl, setImgUrl] = React.useState("");
  const [file, setFile] = React.useState(null);
  

  React.useEffect(() => {
    dispatch(resetImgUploadState());
    return () => dispatch(resetState());
  }, [dispatch]);
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const url = URL.createObjectURL(file);
    setImgUrl(url);
    formik.setFieldValue("photo", url);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      photo: "",
    },
    validationSchema,
    onSubmit: async (payload) => {
      dispatch(handleImageUpload(file)).then(async (response) => {
        console.log(response);
        payload.photo = separatePhotoId(response?.payload?.secure_url);
        dispatch(handleAddDestination(payload));
      });
    },
  });

  return (
    <div>
      <div className="bg-white flex flex-row justify-center items-center shadow-md ">
        <div className="grid md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="flex flex-col gap-2"> 
              <div className="m-2">
                <Typography variant="h5">Add destination</Typography>
              </div>
              <div>
                <figure className="relative">
                  {uploadLoading && <Loading />}
                  <img
                    className="h-96 w-full rounded-lg object-cover object-center"
                    src={imgUrl ? imgUrl : "/defaults/default-image.jpg"}
                    alt="destinatiom img"
                  />
                  {/* <Typography
                    as="caption"
                    variant="small"
                    className="mt-2 text-center font-normal"
                  >
                    Image caption
                  </Typography> */}

                  <div className="flex w-full justify-center items-center my-2">
                    {/* <Button
                      size="sm"
                      className="shadow-none rounded-sm bg-gray-900 text-gray-100"
                      Clis
                    >
                      Choose img
                    </Button> */}
                  </div>
                </figure>
                <div className="flex flex-col gap-3 justify-center items-center hover:shadow-none">
                  <div className="w-72">
                    <Input
                      {...formik.getFieldProps("name")}
                      error={Boolean(formik.errors.name)}
                      label={
                        formik.errors.name
                          ? "Please enter the name"
                          : "Enter destination name"
                      }
                    />
                  </div>
                  <div className="w-72">
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
                  </div>
                  <div className="">
                    <Button
                      size="sm"
                      className="shadow-none bg-gray-900 rounded-sm hover:shadow-none"
                      onClick={formik.handleSubmit}
                    >
                      submit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <DestinationTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDestinationPage;
