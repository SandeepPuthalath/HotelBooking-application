import React from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../auth/Loading";
import { handleFetchAllDestinations } from "../../../redux/reducers/admin/destination/destinationsSlice";
import { cloudName } from "../../../config";
import AdminApplicationImgDialog from "../dialogs/AdminApplicationImgDialog";

const TABLE_HEAD = ["Name", "Created at", "Updated at", "Actions"];

export function DestinationTable() {
  const dispatch = useDispatch();
  const loading = useSelector((s) => s.allDestinations.loading);
  const data = useSelector((s) => s.allDestinations.data);
  const error = useSelector((s) => s.allDestinations.error);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null)

  React.useEffect(() => {
    dispatch(handleFetchAllDestinations());
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Card className="rounded-none shadow-none">
        <CardBody className="px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
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
              {data.map(({ _id, name, photo, createdAt, updatedAt }, index) => {
                const isLast = index === data.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div
                        className="flex items-center gap-3  cursor-pointer"
                        onClick={() =>{ 
                          setSelected({_id, name, photo})
                          setOpen(true)
                        }}
                      >
                        <Avatar
                          src={
                            photo
                              ? `https://res.cloudinary.com/${cloudName}/image/upload/v1689876154/BookIt_uploades/${photo}.jpg`
                              : "/defaults/default-image-80.png"
                          }
                          alt={name}
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-cover p-1  hover:border-gray-900"
                        />
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {createdAt.split("T")[0]}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {updatedAt.split("T")[0]}
                      </Typography>
                    </td>
                    {/* <td className={classes}>
                      <div className="w-max">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={status}
                          color={
                            status === "paid"
                              ? "green"
                              : status === "pending"
                              ? "amber"
                              : "red"
                          }
                        />
                      </div>
                    </td> */}
                    {/* <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                          <Avatar
                            src={
                              account === "visa"
                                ? "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png"
                                : "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png"
                            }
                            size="sm"
                            alt={account}
                            variant="square"
                            className="h-full w-full object-contain p-1"
                          />
                        </div>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal capitalize"
                          >
                            {account.split("-").join(" ")} {accountNumber}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {expiry}
                          </Typography>
                        </div>
                      </div>
                    </td> */}
                    <td className={classes}>
                      <Tooltip content="Edit destination">
                        <IconButton variant="text" color="blue-gray">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button variant="outlined" color="blue-gray" size="sm">
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <IconButton variant="outlined" color="blue-gray" size="sm">
              1
            </IconButton>
            <IconButton variant="text" color="blue-gray" size="sm">
              2
            </IconButton>
            <IconButton variant="text" color="blue-gray" size="sm">
              3
            </IconButton>
            <IconButton variant="text" color="blue-gray" size="sm">
              ...
            </IconButton>
            <IconButton variant="text" color="blue-gray" size="sm">
              8
            </IconButton>
            <IconButton variant="text" color="blue-gray" size="sm">
              9
            </IconButton>
            <IconButton variant="text" color="blue-gray" size="sm">
              10
            </IconButton>
          </div>
          <Button variant="outlined" color="blue-gray" size="sm">
            Next
          </Button>
        </CardFooter>
      </Card>
      <AdminApplicationImgDialog open={open} setOpen={setOpen} {...selected}/>
    </>
  );
}
