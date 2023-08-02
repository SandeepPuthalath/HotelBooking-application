import { Card } from "@material-tailwind/react";
import React from "react";
import { cloudName } from "../../config";

const RoomImgGroup = ({ photos }) => {
  return (
    <div className="flex flex-row overflow-x-auto gap-2">
      <div className="flex min-w-full"> {/* Ensure this container has a fixed width */}
        {[1,2,3,4,5,6,7,8,9,10].map((photo, index) => (
            <img
              src={`https://res.cloudinary.com/${cloudName}/image/upload/v1689876154/BookIt_uploades/${photos[0]}.jpg`}
              alt=""
              className="h-full w-full object-cover"
            />
        ))}
      </div>
    </div>
  );
};

export default RoomImgGroup;
