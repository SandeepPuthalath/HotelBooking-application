import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/reducers/auth/user/userThunks";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function LoginDialog({ open, onClose, signupOpen }) {
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (payloads, { setSubmitting, setErrors }) => {
      try {
        async function handleLogin() {
          const respones = dispatch(userLogin(payloads));

          if (respones.error) {
            throw new Error(respones.error?.message);
          } else {
            toast.success('Login successfull')
            onClose()
          }
        }

        await handleLogin();
      } catch (error) {
        setErrors({ login: error.message }); // Set the error message in the form field
      } finally {
        setSubmitting(false); // Reset the submitting state
      }
    },
  });

  return (
    <React.Fragment>
      <Dialog
        size="xs"
        open={open}
        handler={onClose}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Typography  color="red" >{formik.errors?.login}</Typography>
            <Input
              label="Email"
              size="lg"
              {...formik.getFieldProps("email")}
              error={formik.touched.email && formik.errors.email}
            />
            {formik.touched.email && formik.errors.email && (
              <Typography variant="small" color="red">
                {formik.errors.email}
              </Typography>
            )}
            <Input
              label="Password"
              size="lg"
              type="password"
              {...formik.getFieldProps("password")}
              error={formik.touched.password && formik.errors.password}
            />
            {formik.touched.password && formik.errors.password && (
              <Typography variant="small" color="red">
                {formik.errors.password}
              </Typography>
            )}
            <div className="-ml-2.5">
              <Checkbox label="Remember Me"/>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              fullWidth
              disabled={formik.isSubmitting}
              onClick={formik.handleSubmit}
            >
              {formik.isSubmitting ? "Loading..." : "Sign In"}
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Typography
                onClick={signupOpen}
                variant="small"
                color="blue"
                className="ml-1 font-bold cursor-pointer"
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </React.Fragment>
  );
}
