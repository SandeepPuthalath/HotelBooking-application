import React from "react";
import { Outlet } from "react-router-dom";

const AdminBannerManagement = () => {
  return (
    <div className="">
     {<Outlet/>}
    </div>
  );
};

export default AdminBannerManagement;
