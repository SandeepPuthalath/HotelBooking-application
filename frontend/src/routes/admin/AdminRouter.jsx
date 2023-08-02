import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminLoginPage from "../../pages/AdminLoginPage";
import AdminDashboard from "../../pages/AdminDashboard";
import AdminLayout from "../../components/admin/AdminLayout";
const AdminUserView = lazy(() => import("../../components/admin/userManagement/AdminUserView"))
const AdminUsersView = lazy(() => import("../../pages/AdminUsersView"));
const AdminApplications = lazy(() => import("../../pages/AdminApplications"));

const AdminRouter = () => {
  const token = useSelector((s) => JSON.parse(s.admin?.adminAuthToken));
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            !token?.access ? <AdminLoginPage /> : <Navigate to="/admin" />
          }
        />
        <Route path="/" element={<AdminLayout />}>
          <Route
            index={true}
            element={
              token?.access ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/admin/login" />
              )
            }
          />
          <Route
            path="users"
            element={
              token?.access ? (
                <Suspense>
                  <AdminUsersView />
                </Suspense>
              ) : (
                <Navigate to="/admin/login" />
              )
            }
          />
          <Route
            path="applications"
            element={
              <Suspense>
                <AdminApplications />
              </Suspense>
            }
          />
           <Route
            path="user/:userId"
            element={
              <Suspense>
                <AdminUserView/>
              </Suspense>
            }
          />
          <Route path="*" element={<h1>404 page not found</h1>} />
        </Route>
      </Routes>
    </>
  );
};

export default AdminRouter;
