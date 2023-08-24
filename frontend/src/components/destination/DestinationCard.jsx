import React from "react";
import { cloudName } from "../../config";
import { useNavigate } from "react-router-dom";

const DestinationCard = ({_id, name, photo}) => {
  const navigate = useNavigate()

  return ( 
    <div onClick={() => navigate('/hotels')} className="relative hover:shadow-md hover:shadow-gray-600 cursor-pointer">
      <img
      loading="lazy"
        className="h-full max-w-full rounded-sm"
        src={
          photo
            ? `https://res.cloudinary.com/${cloudName}/image/upload/v1689876154/BookIt_uploades/${photo}.jpg`
            : "/defaults/default-image-80.png"
        }
        alt=""
      />
      <div className="absolute w-full h-full flex justify-center items-center bg-blue-gray-black top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 text-center">
        <span className="uppercase text-sm sm:text-2xl font-bold  shadow-lg text-gray-300">{name}</span>
      </div>
    </div>
  );
};

export default DestinationCard;
