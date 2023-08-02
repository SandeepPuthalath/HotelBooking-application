import { Card, Typography } from "@material-tailwind/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../../../redux/reducers/thunks/userThunks";

const AdminUserView = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const loading = useSelector(s => s.userProfile?.loading);
  const userDetails = useSelector(s => s.userProfile?.data);
  const error = useSelector(s => s.userProfile?.error);

  React.useEffect(() => {
    dispatch(getUserProfile(userId));
  }, []);

  if(loading){
    return (
      <div className='h-screen w-screen flex justify-center items-center'>
        <Typography variant="h3">Loading......</Typography>
      </div>
    )
  }


  if(error){
    <div className='h-screen w-screen flex justify-center items-center'>
        <Typography variant="h3">Somthing Went wrong</Typography>
      </div>
  }

  return (
    <div className="grid md:grid-cols-2 items-center justify-center w-full h-full rounded-sm bg-gray-100 shadow-md">
      <div className="md:col-span-1">
        <div className="flex flex-col m-10 justify-center items-center">
          <img
            className="h-72 w-72 rounded-full object-cover object-center g"
            src="/defaults/blank-profile.png"
            alt="Profile-pic"
          />
        </div>
      </div>
      <div className="md:col-span-1">
        <div className="flex flex-col items-center justify-center gap-4 text-gray-800">
          <div className="flex gap-1">
            <Typography variant="h5">First name : </Typography>
            <Typography className="capitalize" variant="h5">
              {userDetails?.firstName}
            </Typography>
          </div>
          <div className="flex gap-1">
            <Typography variant="h5">Last name : </Typography>
            <Typography className="capitalize" variant="h5">
               {userDetails?.lastName}
            </Typography>
          </div>
          <div className=" flex gap-1">
            <Typography variant="h5">Email :</Typography>
            <Typography className="capitalize" variant="h5">
               {userDetails?.email}
            </Typography>
          </div>
          <div className="flex gap-1">
            <Typography variant="h5">Phone number : </Typography>
            <Typography className="capitalize" variant="h5">
               {userDetails?.phoneNumber}
            </Typography>
          </div>
          <div className="flex gap-1">
            <Typography variant="h5">Account Type : </Typography>
            <Typography className="capitalize" variant="h5">
               {userDetails?.role}
            </Typography>
          </div>
          <div className="flex gap-1">
            <Typography variant="h5">Created at : </Typography>
            <Typography className="capitalize" variant="h5">
               {userDetails?.createdAt}
            </Typography>
          </div>
          <div className="flex gap-1">
            <Typography variant="h5">Updated at : </Typography>
            <Typography className="capitalize" variant="h5">
               {userDetails?.updatedAt}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserView;
