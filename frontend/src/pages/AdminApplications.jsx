import { Button, Card, Typography } from "@material-tailwind/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleFetchingApplications,
  handleRoleChangeApproving,
} from "../redux/reducers/applications/applicationReducer";
import Loading from "../components/auth/Loading";
import { toast } from "react-toastify";
// import AdminApplicationImgDialog from "../components/admin/dialogs/AdminApplicationImgDialog";

const TABLE_HEAD = ["Name", "Applicant id", "Applied date", "status", "Action"];

export default function AdminApplications() {
  const disptach = useDispatch();
  const loading = useSelector((s) => s.application.loading);
  const applications = useSelector((s) => s.application.applications);
  const error = useSelector((s) => s.application.error);

  React.useEffect(() => {
    disptach(handleFetchingApplications());
  }, [disptach]);

  const handleApprove = async (applicantId) => {
    console.log("Approved");
    await disptach(handleRoleChangeApproving(applicantId)).then((response) => {
      console.log(response);
      if (response.error) {
        console.log("got here");
        return toast.error("Somthing went wrong");
      }
      return toast.success("user has been approved");
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Card className="overflow-scroll h-full w-full">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
            {applications.map(
              (
                { _id, name, applicantId, GSTNumber, createdAt, status },
                index
              ) => {
                const isLast = index === applications.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={applicantId}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {applicantId}
                      </Typography>
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
                        color={status === "pending" ? "orange" : "green"}
                        className="font-normal capitalize"
                      >
                        {status}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Button
                        variant="filled"
                        size="sm"
                        disabled={status !== "pending"}
                        color={status === "pending" ? "green" : "gray"}
                        className="font-medium shadow-none hover:shadow-none rounded-sm"
                        onClick={() => handleApprove(_id)}
                      >
                        {status === "pending" ? "Approve" : "Approved"}
                      </Button>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
    </>
  );
}
