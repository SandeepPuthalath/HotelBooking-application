
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
  PencilSquareIcon
} from "@heroicons/react/24/solid";
import {MdTravelExplore} from "react-icons/md"

 
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../../redux/reducers/auth/admin/adminAuthSlice";
import { FaHotel } from "react-icons/fa"
import { Link } from "react-router-dom";




  export default function AdminSidebar() {

    const dispatch = useDispatch()

    const handleLogout = () =>{
        dispatch(logoutAdmin())
    }

    return (
      <Card className="h-[calc(100vh-2rem)] w-64 max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="flex gap-2 mb-2 p-4">
        <FaHotel fontSize={30}/>
        <Typography variant="h5" color="blue-gray">
         BookIt
        </Typography>
      </div>
      <List>
        <Link to="/admin">
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        </Link>
        <Link to="users">
        <ListItem>
          <ListItemPrefix>
            <UsersIcon className="h-5 w-5" />
          </ListItemPrefix>
          Users
        </ListItem>
        </Link>
        <Link to="applications">
        <ListItem>
          <ListItemPrefix>
            <PencilSquareIcon className="h-5 w-5" />
          </ListItemPrefix>
          Applications
        </ListItem>
        </Link>
        <Link to="destination">
        <ListItem>
          <ListItemPrefix>
            <MdTravelExplore className="h-5 w-5" />
          </ListItemPrefix>
          Destination
        </ListItem>
        </Link>
        <Link to="banners">
        <ListItem>
          <ListItemPrefix>
            <MdTravelExplore className="h-5 w-5" />
          </ListItemPrefix>
          Banners
        </ListItem>
        </Link>
        {/* <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem> */}
        {/* <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem> */}
        {/* <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem> */}
        <ListItem onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
    );
  }