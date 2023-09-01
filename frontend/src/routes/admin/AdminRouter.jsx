import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminLoginPage from "../../pages/AdminLoginPage";
import AdminDashboard from "../../pages/AdminDashboard";
import AdminLayout from "../../components/admin/AdminLayout";
const AddBanner = lazy(() => import("../../components/admin/banner/AddBanner"));
const BannerList = lazy(() =>
  import("../../components/admin/banner/BannerList")
);
const BannerDetails = React.lazy(() => import("../../components/admin/banner/BannerDetails"))
const AdminBannerManagement = lazy(() =>
  import("../../pages/AdminBannerManagement")
);
const AdminDestinationPage = lazy(() =>
  import("../../pages/AdminDestinationPage")
);
const AdminUserView = lazy(() =>
  import("../../components/admin/userManagement/AdminUserView")
);
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
                <AdminUserView />
              </Suspense>
            }
          />
          <Route
            path="destination"
            element={
              token?.access ? (
                <Suspense>
                  <AdminDestinationPage />
                </Suspense>
              ) : (
                <Navigate to="/admin/login" />
              )
            }
          />
          <Route
            path="banners"
            element={
              token?.access ? (
                <Suspense>
                  <AdminBannerManagement />
                </Suspense>
              ) : (
                <Navigate to="/admin/login" />
              )
            }
          >
            <Route
              index={true}
              element={
                token?.access ? (
                  <Suspense>
                    <BannerList />
                  </Suspense>
                ) : (
                  <Navigate to="/admin/login" />
                )
              }
            />
             <Route
              path=":bannerId"
              element={
                token?.access ? (
                  <Suspense>
                    <BannerDetails/>
                  </Suspense>
                ) : (
                  <Navigate to="/admin/login" />
                )
              }
            />
            <Route
              path="add-banner"
              element={
                token?.access ? (
                  <Suspense>
                    <AddBanner />
                  </Suspense>
                ) : (
                  <Navigate to="/admin/login" />
                )
              }
            />
          </Route>
          <Route path="*" element={<h1>404 page not found</h1>} />
        </Route>
      </Routes>
    </>
  );
};

export default AdminRouter;
