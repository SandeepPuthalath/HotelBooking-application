import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfile,
  updateUserProfile,
} from "../redux/reducers/thunks/userThunks";
import GSTDialog from "../components/user/GSTDialog";
import ProfilePageSkeleton from "../components/Shimmers/ProfilePageSkeleton";
import { IoAdd } from "react-icons/io5";
import {handleImageUpload} from "../redux/reducers/imageUpload/imageUploadSlice"
import { handleUpdateProfileImage } from "../redux/reducers/user/userSlice";
import { Spinner } from "@material-tailwind/react";

const ProfilePage = () => {
  const state = useSelector((state) => state);
  const name = state.userProfile?.data?.firstName
  const userId = state?.user?.data?.applicantId;
  const uploading = useSelector(s => s.uploadImg.loading);
  const loading = useSelector(s => s.userProfile?.loading);
  const [avatar, setAvatar] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const dispatch = useDispatch();

  // Simulating profile data fetch from the backend
  useEffect(() => {
    // Replace this with your actual data fetching logic
    const fetchProfileData = async () => {
      try {
        // Simulating API call delay
        const { payload } = await dispatch(getUserProfile(userId));
        // Example response from the backend
        const response = {
          firstName: payload?.firstName,
          lastName: payload?.lastName,
          email: payload?.email,
          phoneNumber: payload?.phoneNumber,
          accountType: payload?.role,
        };
        console.log(response)
        setAvatar(payload?.pic)
        setProfileData(response);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleUpload = (event) => {
    // File upload logic
    setAvatar(URL.createObjectURL(event.target.files[0]));
    dispatch(handleImageUpload(event.target.files[0])).then((response) =>{
      const {secure_url} = response.payload;
      dispatch(handleUpdateProfileImage({userId, secure_url}))

    });
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
      const updates = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
      };
      dispatch(updateUserProfile({ userId, updates: updates }));
    },
  });

  // Load fetched profile data into form fields
  useEffect(() => {
    if (profileData) {
      formik.setValues(profileData);
    }
  }, [profileData]);

  // Render loading state if profile data is being fetched
  if (!profileData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ProfilePageSkeleton />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <section className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-48 h-48 relative">
            <div
              className="w-full h-full relative bg-gray-300 rounded-full flex items-center justify-center overflow-hidden"
              style={{
                backgroundImage: `url(${
                  avatar || profileData?.pic || "/defaults/blank-profile.png"
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {uploading && (
                <div className="absolute bg-opacity-10 backdrop-filter backdrop-blur-sm w-full h-full flex justify-center items-center">
                  <Spinner className="h-8 w-8" />
                </div>
              )}
            </div>

            <label
              htmlFor="avatarUpload"
              className="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-700 focus:outline-none cursor-pointer"
            >
              <IoAdd size={16} />
            </label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="avatarUpload"
              onChange={handleUpload}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="text-gray-600">
            Account Type: {profileData.accountType}
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none ml-4"
          >
            Change Role
          </button>
        </div>
      </section>
      <section className="mb-8">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="First Name"
              {...formik.getFieldProps("firstName")}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-red-500 mt-1">{formik.errors.firstName}</div>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Last Name"
              {...formik.getFieldProps("lastName")}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="text-red-500 mt-1">{formik.errors.lastName}</div>
            )}
          </div>
          <div className="mb-4">
            <input
              type="email"
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 mt-1">{formik.errors.email}</div>
            )}
          </div>
          <div className="mb-4">
            <input
              type="tel"
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Phone Number"
              {...formik.getFieldProps("phoneNumber")}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <div className="text-red-500 mt-1">
                {formik.errors.phoneNumber}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
          >
            Save
          </button>
        </form>
      </section>
      <GSTDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        name={name}
        applicantId={userId}
      />
    </div>
  );
};

export default ProfilePage;
