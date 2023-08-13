import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersData } from "../redux/reducers/UsersView/usersViewSlice";
import { useNavigate } from "react-router-dom";
import { cloudName } from "../config";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Business",
    value: "business",
  },
  {
    label: "Normal",
    value: "normal",
  },
];

const TABLE_HEAD = ["User", "Account type", "Created", "updatedAt", ""];

function filterUsers(search, users) {
  const filteredData = users.filter((user) =>
    user?.firstName
      .concat(" ", user?.lastName)
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  return filteredData;
}

export default function AdminUsersView() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const usersDatas = useSelector((s) => s.usersView?.data);
  const loading = useSelector((s) => s.usersView?.loading);
  const error = useSelector((s) => s.usersView?.error);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    dispatch(fetchUsersData());
    setFilteredUsers(usersDatas);
  }, [dispatch]);

  if (loading) {
    return <h1>Loading.......</h1>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleSearch = (e) => {
    const data = filterUsers(e.target.value, usersDatas);
    setFilteredUsers(data);
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              User list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all Users
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) =>(
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(
              (
                {
                  _id,
                  firstName,
                  lastName,
                  email,
                  phoneNumber,
                  GSTNumber,
                  role,
                  createdAt,
                  updatedAt,
                  photo,
                },
                index
              ) => {
                const isLast = index === usersDatas.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={
                            photo ? `https://res.cloudinary.com/${cloudName}/image/upload/v1689876154/BookIt_uploades/${photo[0]}.jpg` : "/defaults/default-person-80.png"
                          }
                          alt={firstName + " " + lastName}
                          size="sm"
                        />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {firstName + " " + lastName}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {role.toUpperCase()}
                        </Typography>
                        {GSTNumber && (
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {GSTNumber}
                          </Typography>
                        )}
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {createdAt}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {updatedAt}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton onClick={() => navigate(`/admin/user/${_id}`)} variant="text" color="blue-gray">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" color="blue-gray" size="sm">
            Previous
          </Button>
          <Button variant="outlined" color="blue-gray" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
