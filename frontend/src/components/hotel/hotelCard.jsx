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
  ratting,
  cheapestPrice,
  photos,
}) {
  return (
    <Card className="w-[28] max-w-[28rem] flex flex-col rounded-none hover:shadow-xl justify-between">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-full shrink-0 flex justify-center rounded-none"
      >
        <img
          src={`https://res.cloudinary.com/${cloudName}/image/upload/v1689876154/BookIt_uploades/${photos[0]}.jpg`}
          alt="ui/ux review check"
          className=""
        />
      </CardHeader>
      <CardBody className="flex flex-col ">
        <Typography variant="h6" color="black" className="mb-4 uppercase">
          {name}
        </Typography>
        <div className="flex justify-between items-center">
          <Rating value={ratting} readonly />
        </div>
        <div className="flex justify-start items-center">
          <MdLocationPin color="red" />
          <Typography className="capitalize" variant="samll" color="blue-gray">
            {destination}
          </Typography>
        </div>
        <Typography variant="small" color="gray" className="mt-3 font-normal">
          {desc.substring(0, 50)}...
        </Typography>
      </CardBody>
      <CardFooter className="flex items-center justify-center">
          <Button className="shadow-none rounded-sm hover:shadow-none bg-gray-900">
            View Room
          </Button>
      </CardFooter>
    </Card>
  );
}
