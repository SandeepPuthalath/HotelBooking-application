import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

const BannerCard = (probs) => {
  const { title, desc, cloudinaryImgUrl } = probs;
  return (
    <Card className="w-96">
      <CardHeader floated={false} className="">
        <img
          loading="lazy"
          src={
            cloudinaryImgUrl ? cloudinaryImgUrl : "/defaults/default-image.jpg"
          }
          className="object-contain"
          alt="banner"
        />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
         {title}
        </Typography>
        <Typography color="blue" className="font-medium" textGradient>
         {desc}
        </Typography>
      </CardBody>
    </Card>
  );
};

export default BannerCard;
