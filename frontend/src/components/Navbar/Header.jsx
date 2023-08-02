import React from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountMenu from "../user/AccountMenu";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoComp from "../logo/LogoComp";
import jwtDecode from "jwt-decode";

export default function Header() {
  const state = useSelector((s) => s);
  const navigate = useNavigate()
  const token = state.user?.data?.token;
  const decoded = token ?jwtDecode(token): null
  const userDetails = decoded?JSON.parse(decoded?.payload): null
  const [openNav, setOpenNav] = React.useState(false);
  // const [openLogin, setOpenLogin] = React.useState(false);
  // const [openSignup, setOpenSignup] = React.useState(false);

  const handleLogin = () => {
    navigate("/login");
  };

  // const handleSignupDialog = () => {
  //   setOpenSignup((s) => !s);
  // };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/" className="flex items-center">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/hotels" className="flex items-center">
          Hotels
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/bookings" className="flex items-center">
          Booking
        </Link>
      </Typography>
      {/* <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/" className="flex items-center">
          Blocks
        </Link>
      </Typography> */}
    </ul>
  );

  return (
    <>
      <Navbar className="sticky bg-blue-gray-300-300 border-none top z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <LogoComp size={30} userType={"user"}/>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            {!token ? (
              <>
                <Button
                  onClick={handleLogin}
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block"
                >
                  <span>Login</span>
                </Button>
              </>
            ) : (
              <div className="hidden lg:inline-block">
                <AccountMenu role={userDetails?.role}/>
              </div>
            )}
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
        {!token?<> <Button
            onClick={handleLogin}
            variant="gradient"
            size="sm"
            fullWidth
            className="mb-2"
          >
            <span>Login</span>
          </Button>
          </>:
            <AccountMenu/>
          }
        </Collapse>
      </Navbar>
      {/* <LoginDialog
        open={openLogin}
        onClose={handleLoginDialog}
        signupOpen={handleSignupDialog}
      /> */}
      {/* <SignupDialog
        open={openSignup}
        onClose={handleSignupDialog}
        loginOpen={handleLoginDialog}
      /> */}
      <ToastContainer />
    </>
  );
}
