import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import adminAuth from "../redux/api/adminAuthApi";
import { adminLogin } from "../config";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { setToken } from "../redux/reducers/auth/admin/adminAuthSlice";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values, {setErrors, setSubmitting}) => {
    console.log(values);
    try {
      async function handleAdminLogin() {
        const respones = await adminAuth.post(adminLogin, values);
        console.log(respones)
        if (respones.error) {
          console.log("error", respones.error);
          throw new Error(respones.error?.message);
        } else {
          console.log("success", respones);
          localStorage.setItem("authTokens", JSON.stringify(respones.data?.data))
          const payload = {
            adminAuthToken: JSON.stringify(respones.data?.data),
            admin: jwtDecode(respones.data?.data?.access),
          };
          dispatch(setToken(payload));
          setTimeout(() => {
            navigate('/admin')
          }, 1000)
        }
      }
      handleAdminLogin();
    }  catch (error) {
        setErrors({ login: error.message }); // Set the error message in the form field
      } finally {
        setSubmitting(false); // Reset the submitting state
      }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md w-full mx-4 p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 mt-1"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-700"
            >
              Login
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AdminLoginPage;
