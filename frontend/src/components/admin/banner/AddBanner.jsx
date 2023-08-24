import { Card, Typography } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import { GrFormPreviousLink } from "react-icons/gr";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { handleImageUpload } from "../../../redux/reducers/imageUpload/imageUploadSlice";
import { handleCreateBanner } from "../../../redux/reducers/admin/AdminBannerReducer";
import Loading from "../../../components/auth/Loading";
import Swal from "sweetalert2";
import PreviewImage from "../../preview/PreviewImage";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("please fill this field"),
  desc: Yup.string().required("please fill this field"),
  cloudinaryImgUrl: Yup.mixed()
    .required("please select a image")
    .test(
      "FILE_TYPE",
      "Invalid file type! please choose jpg",
      (value) => value && ["image/jpeg", "image/png"].includes(value.type)
    ),
});

const AddBanner = () => {
  const dispatch = useDispatch();
  const loading = useSelector((s) => s.adminBanner?.loading);
  const [uploading, setUploading] = React.useState(false);
  const fileInputRef = React.useRef(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      cloudinaryImgUrl: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (values?.cloudinaryImgUrl) {
        console.log(values);
        setUploading(true);
        dispatch(handleImageUpload(values?.cloudinaryImgUrl)).then(
          (response) => {
            setUploading(false);
            values.cloudinaryImgUrl = response?.payload?.secure_url;
            dispatch(handleCreateBanner(values)).then(async (response) => {
              if (response?.errors) {
                return Swal.fire("Error!", response?.payload?.message, "error");
              }
              return Swal.fire(
                "Banner added!",
                response?.payload?.message,
                "success"
              ).then(() => formik.resetForm());
            });
          }
        );
      }
    },
  });



  if (loading || uploading) {
    return <Loading />;
  }

  return (
    <div>
      <Card className="p-5">
        <div className="relative flex justify-center items-center mb-5">
          <Typography variant="h4">Add banner</Typography>
          <Link to="/admin/banners" className="absolute left-0 text-blue-600">
            <GrFormPreviousLink size={30} />
          </Link>
        </div>
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <div className="px-5 py-5">
              {formik.values.cloudinaryImgUrl && <PreviewImage file={formik.values.cloudinaryImgUrl} /> }
                {!formik.values.cloudinaryImgUrl && <img src="/defaults/default-image.jpg" alt="" />}
            </div>
          </div>
          <div className="col-span-1">
            <form onSubmit={formik.handleSubmit}>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  {...formik.getFieldProps("title")}
                  onBlur={formik.handleBlur}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Banner Title
                </label>
                {formik.touched.title && formik.errors.title && (
                  <span className="text-red-600">{formik.errors.title}</span>
                )}
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <textarea
                  {...formik.getFieldProps("desc")}
                  onBlur={formik.handleBlur}
                  type="text"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Description
                </label>
                {formik.touched.desc && formik.errors.desc && (
                  <span className="text-red-600">{formik.errors.desc}</span>
                )}
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="file"
                  onChange={(e => formik.setFieldValue("cloudinaryImgUrl", e.target.files[0]))}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Choose a image
                </label>
                {formik.touched.cloudinaryImgUrl &&
                  formik.errors.cloudinaryImgUrl && (
                    <span className="text-red-600">
                      {formik.errors.cloudinaryImgUrl}
                    </span>
                  )}
              </div>

              <button
                disabled={loading || uploading ? true : false}
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {loading || uploading ? "loading..." : "submit"}
              </button>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AddBanner;
