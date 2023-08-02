import { Button, Dialog, Typography } from "@material-tailwind/react";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

export function AlertMessage({ open, onClose, hotelId, roomId}) {


  const handleDelete = () =>{
    console.log("deleted", hotelId, roomId)
  }
  return (
    <>
      <Dialog handler={onClose} size="xs" open={open}>
        <div className="relative h-40 mx-2 my-2 flex items-center justify-center">
          <div onClick={onClose} className="absolute right-0 top-0 cursor-pointer">
            <AiOutlineClose size={30} />
          </div>
          <div className="flex flex-col mx-4 my-4">
            <div className="my-6">
              <Typography variant="h5">
                Do you want to Delete this Room? Please Confirm.
              </Typography>
            </div>
            <div className="flex flex-row justify-end gap-2">
              <Button onClick={handleDelete} size="sm" className="shadow-none bg-red-700">Delete</Button>
              <Button onClick={onClose} size="sm" className="shadow-none bg-blue-700">Cancel</Button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
