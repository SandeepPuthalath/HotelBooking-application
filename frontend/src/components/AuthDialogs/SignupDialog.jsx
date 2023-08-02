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

export default function SignupDialog({ open, onClose, loginOpen }) {
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
              Sign up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="First name" size="lg" />
            <Input label="Last name" size="lg" />
            <Input label="Email" size="lg" />
            <Input label="Phone number" size="lg" />
            <Input label="Password" size="lg" />
            <Input label="Confirm password" size="lg" />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth>
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Typography
                onClick={loginOpen}
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
