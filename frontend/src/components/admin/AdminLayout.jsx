import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="grid grid-cols-12  bg-white">
      <div className="h-screen col-span-2 flex justify-center md:col-span-3">
        <AdminSidebar />
      </div>
      <div className="col-span-10 md:col-span-9">
        <div className="grid">
          <AdminNavbar />
          <div className="p-4 h-[36rem] bg-gray-300 overflow-auto">{<Outlet />}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
