import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../auth/Loading";
import {
  handleBannerDeleteing,
  handleBannerDetailsUpdate,
  handleBannerImageChange,
  handleFetchingBannerDetails,
} from "../../../redux/reducers/admin/AdminBannerReducer";
import Swal from "sweetalert2";
import { handleImageUpload } from "../../../redux/reducers/imageUpload/imageUploadSlice";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PreviewImage from "../../preview/PreviewImage";
import { Spinner } from "@material-tailwind/react";

export function DefaultSpinner() {
  return (
    <div className="absolute flex justify-center inset-0 bg-gray-400 bg-opacity-50  backdrop-filter backdrop-blur-0 items-center w-full h-full">
      <Spinner className="h-10 w-10" />
    </div>
  );
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("please fill this field"),
  desc: Yup.string().required("please fill this field"),
});
const imageValidationSchema = Yup.object().shape({
  changedImage: Yup.mixed()
    .required("Please choose an image")
    .test(
      "FILE_TYPE",
      "Invalid file type! please choose jpg",
      (value) => value && ["image/jpeg", "image/png"].includes(value.type)
    ),
});

const BannerDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bannerId } = useParams();
  const loading = useSelector((s) => s.adminBanner?.loading);
  const uploading = useSelector((s) => s.uploadImg.loading);
  const message = useSelector((s) => s.adminBanner?.message);
  const banner = useSelector((s) => s.adminBanner?.banner);
  const fileInputRef = React.useRef();
  const [edit, setEdit] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const payload = {
        bannerId: banner?._id,
        updates: values,
      };
      dispatch(handleBannerDetailsUpdate(payload)).then((response) => {
        if (response?.errors) {
          return Swal.fire("Error!", response?.errors?.message, "error");
        }
        return Swal.fire("Success!", response.payload?.message, "success");
      });
    },
  });

  const image = useFormik({
    initialValues: {
      changedImage: "",
    },
    validationSchema: imageValidationSchema,
    onSubmit: (values) => {
      handleImgUpload(values?.changedImage);
    },
  });

  React.useEffect(() => {
    dispatch(handleFetchingBannerDetails(bannerId));
    formik.setFieldValue("title", banner?.title);
    formik.setFieldValue("desc", banner?.desc);
  }, [dispatch]);

  const handleImgChoose = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = () => {
    const file = fileInputRef.current.files[0];
    image.setFieldValue("changedImage", file);
  };

  const handleDelete = () => {
    console.log("delete");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      width: "28rem",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(handleBannerDeleteing(banner?._id)).then(async (response) => {
          if (response?.errors) {
            return Swal.fire("Error!", response?.errors?.message, "error");
          }
          return Swal.fire(
            "Success!",
            response.payload?.message,
            "success"
          ).then((response) => {
            navigate(-1);
          });
        });
      }
    });
  };

  const handleImgUpload = (file) => {
    Swal.fire({
      title: "Do you wish to Confirm?",
      text: "You won't be able to revert this!",
      width: "28rem",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(handleImageUpload(file)).then((response) => {
          if (response?.errors) {
            return Swal.fire("Error!", response?.errors?.message, "error");
          }
          if (!file) {
            return Swal.fire(
              "Error",
              "Please change the existing image",
              "error"
            );
          }
          const secure_url = response.payload?.secure_url;
          const payload = {
            bannerId: banner?._id,
            cloudinaryImgUrl: secure_url,
          };

          dispatch(handleBannerImageChange(payload)).then((response) => {
            if (response?.errors) {
              return Swal.fire("Error!", response?.errors?.message, "error");
            }
            image.resetForm();
            return Swal.fire("Success!", response.payload?.message, "success").then(() => window.location.reload());
          });
        });
      }
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full min-h-screen py-5 px-5">
      <div className="relative min-h-[28rem] flex flex-col bg-gray-50 shadow-lg rounded-md border-2">
        <div className="flex justify-center items-center">
          <h3 className="text-xl my-5 uppercase font-semibold">
            Update banner
          </h3>
        </div>
        <div
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 text-blue-700"
        >
          <BiArrowBack size={25} />
        </div>
        <div
          onClick={handleDelete}
          className="absolute top-5 right-5 text-blue-700"
        >
          <MdDelete color="red" size={25} />
        </div>
        <div className="grid md:grid-cols-2">
          <div className="md:col-span-1">
            <div className="w-full px-2 py-2">
              <div className="relative">
                {uploading && <DefaultSpinner />}
                {image.errors.changedImage && (
                  <span className="text-red-600">
                    {image.errors.changedImage}
                  </span>
                )}
                {image.values.changedImage ? (
                  <PreviewImage file={image.values.changedImage} />
                ) : (
                  <img
                    src={banner?.cloudinaryImgUrl}
                    className="border-2 rounded-md"
                    alt=""
                  />
                )}
              </div>
              <div className="flex gap-2 py-2">
                <input
                  ref={fileInputRef}
                  onChange={handleInputChange}
                  type="file"
                  hidden
                />
                <button
                  onClick={handleImgChoose}
                  className="font-bold uppercase bg-gray-200 border-2 border-gray-200 shadow-md rounded-sm text-blue-900 px-4 py-2"
                >
                  choose
                </button>
                <button
                  onClick={image.handleSubmit}
                  className=" bg-gray-900 font-bold uppercase border-1 shadow-md rounded-sm text-gray-100 px-4 py-2"
                >
                  upload
                </button>
              </div>
            </div>
          </div>
          <div className="md:col-span-1">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col px-10 py-10 gap-5">
                <Input
                  disabled={!edit}
                  {...formik.getFieldProps("title")}
                  variant="standard"
                  label="Banner title"
                />
                <Textarea
                  disabled={!edit}
                  {...formik.getFieldProps("desc")}
                  variant="standard"
                  label="Banner description"
                />
                <div className="mt-5 flex justify-end gap-3">
                  <Button
                    onClick={() => setEdit((s) => !s)}
                    variant="text"
                    color={edit ? "red" : "blue"}
                  >
                    {edit ? "cancel" : "edit"}
                  </Button>
                  <Button type="submit">Save</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerDetails;
