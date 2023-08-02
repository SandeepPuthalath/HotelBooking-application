import { Typography } from "@material-tailwind/react";
import React from "react";
import { FaHotel } from "react-icons/fa";
import { Link } from "react-router-dom";

const LogoComp = ({ size, userType }) => {
  return (
    <Link to={userType === "user"? "/": "/admin"}>
      <div className="flex justify-center items-center gap-2 cursor-pointer">
        <FaHotel size={size} />
        <Typography variant="h4">BookIt</Typography>
      </div>
    </Link>
  );
};

export default LogoComp;
