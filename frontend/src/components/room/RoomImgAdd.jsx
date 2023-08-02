import React, { useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { FaUpload } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { cloudName, uploadPreset } from "../../config";
import { separatePhotoId } from "../../pages/MyHotel";
import { Spinner } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { handleAddRoomImage } from "../../redux/reducers/room/roomDetailsSlice";

export function RoomImgAdd({ open, onClose, roomId, hotelId }) {

  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState("");
  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleImgUpload = async () => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    // Perform the image upload using the Cloudinary Upload API
    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.secure_url);
        const imgId = separatePhotoId(data.secure_url);
        setImageUrl(imgId);
        dispatch(handleAddRoomImage({ hotelId, roomId, imgId }));
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  return (
    <>
      <Dialog
        className="relative flex-col items-center justify-center"
        open={open}
        handler={onClose}
      >
        <div
          onClick={onClose}
          className="absolute right-0 top-0 cursor-pointer"
        >
          <AiOutlineCloseCircle color="black" size={30} />
        </div>
        <DialogHeader className="flex justify-center items-center">
          Add an Image
        </DialogHeader>
        <DialogBody className="mx-6 my-2 border flex justify-center items-center rounded-md">
          {!file ? (
            <div className="flex py-40 justify-center item-center">
              <FaUpload
                onClick={handleFileSelect}
                className="cursor-pointer"
                size={50}
              />
              <input
                onChange={handleChange}
                className="hidden"
                ref={fileInputRef}
                id="file-upload"
                type="file"
                name="image"
                variant="static"
                label="Max people"
              />
            </div>
          ) : (
            <div className="">
              <img
                className="h-96 w-full object-contain"
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "/defaults/default-image.jpg"
                }
                alt="img-blur-shadow"
              />
            </div>
          )}
        </DialogBody>
        <DialogFooter className="flex justify-center items-center">
          <Button
            className="border-none"
            variant="gradient"
            color="green"
            onClick={handleImgUpload}
          >
            <span className="flex gap-2">
              <FaUpload />
              Upload
            </span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
