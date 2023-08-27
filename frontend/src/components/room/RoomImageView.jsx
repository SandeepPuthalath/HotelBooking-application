import { Typography } from "@material-tailwind/react";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { RoomImgAdd } from "./RoomImgAdd";
import { cloudName } from "../../config";


const RoomImageView = ({ photos, roomId, hotelId }) => {
  const [selected, setSelected] = React.useState(0);
  const [open, setOpen] = React.useState(false)

  const handleOpen = () =>{
    setOpen(s => !s);
  }

  return (
    <>
      <div className="mx-2 my-2">
        <figure>
         { photos && <img
            loading="lazy"
            className="h-96 w-full rounded-lg object-cover object-center"
            src={`https://res.cloudinary.com/${cloudName}/image/upload/v1689876154/BookIt_uploades/${photos[selected]}.jpg`}
            alt=""
          />}
          <Typography
            as="small"
            variant="small"
            className="mt-2 text-center font-normal"
          >
            image {selected}
          </Typography>
        </figure>
        <div className="flex flex-row overflow-x-auto h-52  justify-center items-center gap-2 my-2">
          {photos?.map((photo, index) => {
            return (
              <img
                key={index}
                onClick={() => {
                  setSelected(index);
                }}
                className={`rounded-lg object-cover object-center cursor-pointer ${
                  selected === index ? "w-48 h-36" : "w-40 h-28"
                }`}
                src={`https://res.cloudinary.com/${cloudName}/image/upload/v1689876154/BookIt_uploades/${photo}.jpg`}
                alt=""
              />
            );
          })}
          <div
            onClick={handleOpen}
            className="flex justify-center cursor-pointer items-center px-20 h-28 rounded-lg border border-gray-400 bg-gray-300"
          >
            <FaPlus color="gray" />
          </div>
        </div>
      </div>
      <RoomImgAdd open={open} onClose={handleOpen} roomId={roomId} hotelId={hotelId}/>
    </>
  );
};

export default RoomImageView;
