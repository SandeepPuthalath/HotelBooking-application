import { Routes, Route, Navigate } from "react-router-dom";
import UserRouter from "./user/userRouter";
import { lazy } from "react";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import OwnerRouter from "./owner/OwnerRouter";
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const AdminRouter = lazy(() => import("./admin/AdminRouter"));
const SignupPage = lazy(() => import("../pages/auth/SignupPage"))

export default function MainRouter() {
  const token = useSelector((state) => state.user?.data?.token);
  return (
    <Routes>
      <Route
        path="/login"
        element={
            !token ? (
                <Suspense>
                 <LoginPage />
                </Suspense>
              ) : (
                <Navigate to="/" />
              )
        }
      />
      <Route
        path="/signup"
        element={
            !token ? (
                <Suspense>
                 <SignupPage/>
                </Suspense>
              ) : (
                <Navigate to="/" />
              )
        }
      />
      <Route path="/*" element={<UserRouter />} />
      <Route
        path="/owner/*"
        element={
          <Suspense>
            <OwnerRouter />
          </Suspense>
        }
      />
      <Route
        path="/admin/*"
        element={
          <Suspense>
            <AdminRouter />
          </Suspense>
        }
      />
    </Routes>
  );
}
