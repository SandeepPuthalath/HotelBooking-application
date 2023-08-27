import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Rating,
  Button,
} from "@material-tailwind/react";
import { cloudName } from "../../config";
import { MdLocationPin } from "react-icons/md";

export default function HotelCard({
  _id,
  name,
  address,
  destination,
  distance,
  desc,
  rating,
  cheapestPrice,
  photos,
}) {
  return (
    <Card className="max-w-[28rem] flex flex-col rounded-md hover:shadow-gray-600 hover:shadow-lg justify-between">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-full shrink-0 flex justify-center rounded-none"
      >
        <img
          src={`https://res.cloudinary.com/${cloudName}/image/upload/v1689876154/BookIt_uploades/${photos[0]}.jpg`}
          alt="ui/ux review check"
          className="rounded-md"
        />
      </CardHeader>
      <CardBody className="flex flex-col">
        <Typography variant="h6" color="black" className="mb-4 uppercase">
          {name}
        </Typography>
        <div className="flex justify-between items-center">
          <Rating value={rating} readonly/>
        </div>
        <div className="flex justify-start items-center">
          <MdLocationPin color="red" />
          <Typography className="capitalize" variant="small" color="blue-gray">
            {destination}
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
}
