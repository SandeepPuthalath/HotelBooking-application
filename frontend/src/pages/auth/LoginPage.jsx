import React from "react";
import LoginForm from "../../components/auth/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/auth/Loading";
import ErrorMessage from "../../components/auth/ErrorMessage";
import { useEffect } from "react";
import {
  resetError,
  resetSuccess,
} from "../../redux/reducers/auth/user/userAuthSlice";
import SuccessMessage from "../../components/auth/SuccessMessage";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.user?.loading);
  const error = useSelector((state) => state.user?.error);
  const success = useSelector((state) => state.user?.data?.status);
  const message = useSelector((state) => state.user?.data?.message);

  const handleErrorClose = () => {
    dispatch(resetError());
  };

  const handleSuccesClose = () => {
    dispatch(resetSuccess());
    navigate("/");
  };

  useEffect(() => {
    dispatch(resetError());
    dispatch(resetSuccess());
  }, []);
  return (
    <div className="relative flex w-screen h-screen justify-center items-center">
      <LoginForm />
      {loading && <Loading />}
      {error && (
        <ErrorMessage
          error={error}
          open={error ? true : false}
          onClose={handleErrorClose}
        />
      )}
      {success && (
        <SuccessMessage
          open={success ? true : false}
          message={message}
          onClose={handleSuccesClose}
        />
      )}
      <div className="absolute w-full flex justify-end items-center  px-2 py-2 top-0">
        <button className="font-bold text-blue-600 hover:underline uppercase" onClick={() => navigate("/admin")}>Admin login</button>
      </div>
    </div>
  );
};

export default LoginPage;
