import React from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AccountMenu from "../user/AccountMenu";
import LogoComp from "../logo/LogoComp";
import jwtDecode from "jwt-decode";
import { handleFetchAllDestinations } from "../../redux/reducers/admin/destination/destinationsSlice";

const UserNav = () => {
  return (
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
    </ul>
  );
};

const HotelOwnerNav = () => {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/owner" className="flex items-center">
          Dashboard
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/owner/rooms" className="flex items-center">
          My hotels
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/owner/bookings" className="flex items-center">
          Bookings
        </Link>
      </Typography>
    </ul>
  );
};

export default function Header() {
  const dispatch = useDispatch();
  const state = useSelector((s) => s);
  const navigate = useNavigate();
  const token = state.user?.data?.token;
  const decoded = token ? jwtDecode(token) : null;
  const userDetails = decoded ? JSON.parse(decoded?.payload) : null;
  const [openNav, setOpenNav] = React.useState(false);
 

  const handleLogin = () => {
    navigate("/login");
  };

  
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
    dispatch(handleFetchAllDestinations());
  }, [dispatch]);

  const navList = (
    userDetails?.role === "business" ? <HotelOwnerNav/> : <UserNav/>
  );

  return (
    <>
      <Navbar className="fixed top-0 bg-gray-50 border-none top z-50 h-max max-w-full rounded-none">
        <div className="flex items-center justify-between text-blue-gray-900">
          <LogoComp size={30} userType={"user"} />
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            {!token ? (
              <>
                <Button
                  onClick={handleLogin}
                  variant="text"
                  size="sm"
                  className="hidden lg:inline-block text-gray-900"
                >
                  <span>Login</span>
                </Button>
              </>
            ) : (
              <div className="hidden lg:inline-block">
                <AccountMenu role={userDetails?.role} />
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
          {!token ? (
            <>
              {" "}
              <Button
                onClick={handleLogin}
                variant="gradient"
                size="sm"
                fullWidth
                className="mb-2"
              >
                <span>Login</span>
              </Button>
            </>
          ) : (
            <AccountMenu />
          )}
        </Collapse>
      </Navbar>
    </>
  );
}
