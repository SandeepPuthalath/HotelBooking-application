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
import { userSignup } from "../../redux/reducers/auth/user/userSignupSlice";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string(),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.number()
    .test("is-mobile-number", "Invalid mobile number", (value) => {
      const mobileNumberPattern = /^(\+\d{1,3}[- ]?)?\d{10}$/;
      return mobileNumberPattern.test(value);
    })
    .required("Mobile number is required"),
  password: Yup.string().test(
    "is-strong-password",
    "Password must be strong",
    (value) => {
      // Define your strong password criteria here
      const strongPasswordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return strongPasswordPattern.test(value);
    }
  ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

export default function SignupForm() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.signup?.loading);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (payloads) => {
      dispatch(userSignup(payloads));
      formik.resetForm();
    },
  });

  return (
    <div className="flex flex-row justify-center items-center">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              label="First name"
              size="lg"
              type="text"
              {...formik.getFieldProps("firstName")}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <Typography variant="small" color="red">
                {formik.errors.firstName}
              </Typography>
            )}
            <Input
              label="Last name"
              size="lg"
              type="text"
              {...formik.getFieldProps("lastName")}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <Typography variant="small" color="red">
                {formik.errors.lastName}
              </Typography>
            )}
            <Input
              label="Email"
              size="lg"
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
            {formik.touched.email && formik.errors.email && (
              <Typography variant="small" color="red">
                {formik.errors.email}
              </Typography>
            )}
            <Input
              label="Phone number"
              size="lg"
              {...formik.getFieldProps("phoneNumber")}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <Typography variant="small" color="red">
                {formik.errors.phoneNumber}
              </Typography>
            )}
            <Input
              label="Password"
              size="lg"
              type="password"
              {...formik.getFieldProps("password")}
              error={formik.touched.password && Boolean(formik.errors.password)}
            />
            {formik.touched.password && formik.errors.password && (
              <Typography variant="small" color="red">
                {formik.errors.password}
              </Typography>
            )}
            <Input
              label="Confirm password"
              size="lg"
              type="password"
              {...formik.getFieldProps("confirmPassword")}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <Typography variant="small" color="red">
                  {formik.errors.confirmPassword}
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
                <Link className="font-medium transition-colors hover:text-blue-500">
                  &nbsp;Terms and Conditions
                </Link>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button
            onClick={formik.handleSubmit}
            disabled={loading}
            className="mt-6"
            fullWidth
          >
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
