import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/auth/Loading";
import ErrorMessage from "../../components/auth/ErrorMessage";
import { useEffect } from "react";
import SuccessMessage from "../../components/auth/SuccessMessage";
import SignupForm from "../../components/auth/SignupForm";
import {
  resetSignupError,
  resetSuccesMessage,
} from "../../redux/reducers/auth/user/userSignupSlice";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((s) => s.signup?.loading);
  const successMessage = useSelector((s) => s.signup?.successMessage);
  const error = useSelector((s) => s.signup?.error);

  const handleErrorClose = () => {
    dispatch(resetSignupError());
  };

  const handleSuccesClose = () => {
    setTimeout(() => {
      navigate("/login");
    }, 2000);
    dispatch(resetSuccesMessage());
  };

  useEffect(() => {
    dispatch(resetSuccesMessage());
    dispatch(resetSignupError());
  }, []);

  return (
    <div className="relative flex w-screen h-screen justify-center items-center">
      <SignupForm />
      {loading && <Loading />}
      {error && (
        <ErrorMessage
          error={error}
          open={error ? true : false}
          onClose={handleErrorClose}
        />
      )}
      {successMessage && (
        <SuccessMessage
          open={successMessage ? true : false}
          message={SuccessMessage}
          onClose={handleSuccesClose}
        />
      )}
    </div>
  );
};

export default SignupPage;
