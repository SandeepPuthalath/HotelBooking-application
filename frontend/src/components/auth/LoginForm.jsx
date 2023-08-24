import React from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/reducers/auth/user/userThunks";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user?.loading);



  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (payloads) => {
      dispatch(userLogin(payloads))
      formik.resetForm()
    },
  });
  return (
    <>
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign in
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to login.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="Email"
            {...formik.getFieldProps("email")}
            error={formik.touched.email && Boolean(formik.errors.email)}
          />
          {formik.touched.email && formik.errors.email && (
            <Typography variant="small" color="red">
              {formik.errors.email}
            </Typography>
          )}
          <Input
            type="password"
            size="lg"
            label="Password"
            {...formik.getFieldProps("password")}
            error={formik.touched.password && Boolean(formik.errors.password)}
          />
          {formik.touched.password && formik.errors.password && (
            <Typography variant="small" color="red">
              {formik.errors.password}
            </Typography>
          )}
        </div>
        <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree the
              <Link
                href="#"
                className="font-medium transition-colors hover:text-blue-500"
              >
                &nbsp;Terms and Conditions
              </Link>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button
          className="mt-6"
          onClick={formik.handleSubmit}
          disabled={loading}
          fullWidth
        >
          Login
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Link to="/signup" className="font-medium text-blue-500 transition-colors hover:text-blue-700">
            Sign up
          </Link>
        </Typography>
      </form>
    </Card>
    </>
  );
}
