import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="flex bg-gray-100">
      <AdminSidebar />
      <div className="flex flex-col w-full h-screen">
      <AdminNavbar/>
        <div className="p-4 overflow-auto">{<Outlet />}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
