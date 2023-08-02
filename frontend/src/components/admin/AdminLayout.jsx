import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="flex flex-row bg-gray-100 h-screen w-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-col w-full">
      <AdminNavbar/>
        <div className="p-4 bg-blue-gray-400 h-full">{<Outlet />}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
