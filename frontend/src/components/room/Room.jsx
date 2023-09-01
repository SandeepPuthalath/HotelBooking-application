import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { cloudName } from "../../config";
import BookingDialog from "../../components/booking/BookingDialog";
import React from "react";
import PaymentDialog from "../booking/PaymentDialog";

export default function Room(props) {
  const [open, setOpen] = React.useState(false)
  const {_id, title, price, maxPeople, desc, photos, checkInDate, checkOutDate } = props

  return (
    <>
      <Card className="w-full max-w-[48rem] flex flex-row rounded-none hover:shadow-xl justify-between">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-2/5 shrink-0 flex rounded-none"
        >
          <img
            src={`https://res.cloudinary.com/${cloudName}/image/upload/v1689876154/BookIt_uploades/${photos[0]}.jpg`}
            alt="ui/ux review check"
            className=""
          />
        </CardHeader>
        <CardBody className="flex flex-col">
          <Typography variant="h6" color="black" className="mb-4 uppercase">
            {title}
          </Typography>
          <Typography variant="lead" color="gray" className="mt-3 font-normal">
            {desc.substring(0, 20)}...
          </Typography>
        </CardBody>
        <CardFooter className="flex items-center justify-center">
          <Button onClick={() => setOpen(true)} className="shadow-none rounded-sm hover:shadow-none bg-gray-900">
            Book Now
          </Button>
        </CardFooter>
      </Card>
      <BookingDialog open={open} {...props} setOpen={setOpen} checkInDate={checkInDate} checkOutDate={checkOutDate}/>
      <PaymentDialog/>
    </>
  );
}
