import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { cloudName } from "../../config";
   
  export default function RoomCard({photos, _id, title, price, type, desc, maxPeople, roomNumbers}) {
    return (
      <Card className="flex-row w-full max-w-[68rem]">
        <CardHeader shadow={false} floated={false} className="w-2/5 shrink-0 m-0 rounded-r-none">
          <img 
            src={`https://res.cloudinary.com/${cloudName}/image/upload/v1689876154/BookIt_uploades/${photos[0]}.jpg`}
            alt="" 
            className="w-full h-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h6" color="blue" className="uppercase mb-4">{type}</Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
           {title}
          </Typography>
          <Typography color="gray" className="font-normal mb-8">
            {desc}
          </Typography>
          <NavLink to={'room/'+_id} className="inline-block">
            <Button variant="text" className="flex items-center gap-2">
               View
              <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
            </Button>
          </NavLink>
        </CardBody>
      </Card>
    );
  }