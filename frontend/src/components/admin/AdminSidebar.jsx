import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  UsersIcon,
  PowerIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { MdTravelExplore } from "react-icons/md";
import { GiTatteredBanner } from "react-icons/gi";

import { useDispatch } from "react-redux";
import { logoutAdmin } from "../../redux/reducers/auth/admin/adminAuthSlice";
import { FaHotel } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function AdminSidebar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAdmin());
  };

  return (
    <div className="w-full border-r-2">
      <div className="w-full px-5 py-4 border-b-2  border-gray-300 flex item-center justify-center md:justify-between">
        <FaHotel fontSize={30} className="text-gray-900" />
        <h1 className="text-2xl uppercase font-semibold text-gray-900 hidden md:block cursor-default">
          Book It
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center py-5">
        <ul className="w-full text-md text-gray-900 font-semibold ">
          <li className="hover:bg-gray-200 px-5 py-2">
            <Link to={`/admin`}>
              <div className="flex gap-5">
                <PresentationChartBarIcon className="h-5 w-5" />
                <span className="hidden md:block">Dashborad</span>
              </div>
            </Link>
          </li>
          <li className="hover:bg-gray-200 px-5 py-2">
            <Link to={`users`}>
              <div className="flex gap-5">
                <UsersIcon className="h-5  md:w-5" />
                <span className="hidden md:block">Users</span>
              </div>
            </Link>
          </li>
          <li className="hover:bg-gray-200 px-5 py-2">
            <Link to={`applications`}>
              <div className="flex gap-5">
                <PencilSquareIcon className="h-5  md:w-5" />
                <span className="hidden md:block">Applications</span>
              </div>
            </Link>
          </li>
          <li className="hover:bg-gray-200 px-5 py-2">
            <Link to={`Destination`}>
              <div className="flex gap-5">
                <MdTravelExplore className="h-5  md:w-5" />
                <span className="hidden md:block">Destinations</span>
              </div>
            </Link>
          </li>
          <li className="hover:bg-gray-200 px-5 py-2">
            <Link to={`banners`}>
              <div className="flex gap-5">
                <GiTatteredBanner className="h-5  md:w-5" />
                <span className="hidden md:block">Banners</span>
              </div>
            </Link>
          </li>
        </ul>
        <div className="border-t-2 text-gray-900 border-gray-300 w-full font-semibold">
          <div
            onClick={handleLogout}
            className="hover:bg-gray-200 flex gap-5 cursor-pointer px-5 py-2 mt-5"
          >
            <PowerIcon className="h-5  md:w-5" />
            <p className="hidden md:block"> Log Out</p>
          </div>
        </div>
      </div>
    </div>
    // <div className="bg-yellow-200 p-4 shadow-xl rounded-none shadow-blue-gray-900/5">
    //   <div className="flex gap-2 mb-2 p-4">
    //     <FaHotel fontSize={30} />
    //     <Typography className="hidden md:block" variant="h5" color="blue-gray">
    //       BookIt
    //     </Typography>
    //   </div>
    //   <List>
    //     <Link to="/admin">
    //       <ListItem className=" md:w-full">
    //         <ListItemPrefix>
    //          <PresentationChartBarIcon className="h-5 md:w-5" />
    //         </ListItemPrefix>
    //         <p className="hidden md:block">Dashboard</p>
    //       </ListItem>
    //     </Link>
    //     <Link to="users">
    //       <ListItem>
    //         <ListItemPrefix>
    //           <UsersIcon className="h-5  md:w-5" />
    //         </ListItemPrefix>
    //         <p className="hidden md:block"> Users</p>
    //       </ListItem>
    //     </Link>
    //     <Link to="applications">
    //       <ListItem>
    //         <ListItemPrefix>
    //           <PencilSquareIcon className="h-5  md:w-5" />
    //         </ListItemPrefix>
    //         <p className="hidden md:block">Applications</p>
    //       </ListItem>
    //     </Link>
    //     <Link to="destination">
    //       <ListItem>
    //         <ListItemPrefix>
    //           <MdTravelExplore className="h-5  md:w-5" />
    //         </ListItemPrefix>
    //         <p className="hidden md:block">Destination</p>
    //       </ListItem>
    //     </Link>
    //     <Link to="banners">
    //       <ListItem>
    //         <ListItemPrefix>
    //           <MdTravelExplore className="h-5  md:w-5" />
    //         </ListItemPrefix>
    //         <p className="hidden md:block">Banners</p>
    //       </ListItem>
    //     </Link>
    //     <ListItem onClick={handleLogout}>
    //       <ListItemPrefix>
    //         <PowerIcon className="h-5  md:w-5" />
    //       </ListItemPrefix>
    //       <p className="hidden md:block"> Log Out</p>
    //     </ListItem>
    //   </List>
    // </div>
  );
}
