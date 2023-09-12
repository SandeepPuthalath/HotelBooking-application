import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Avatar,
  IconButton,
  Typography,
  Input,
  Tooltip,
} from "@material-tailwind/react";
import { cloudName } from "../../../config";
import { FaUpload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { handleImageUpload } from "../../../redux/reducers/imageUpload/imageUploadSlice";
import Loading from "../../auth/Loading";
import { separatePhotoId } from "../../../pages/MyHotel";
import { PencilIcon } from "@heroicons/react/24/solid";
import { AiOutlineClose } from "react-icons/ai";

export default function AdminApplicationImgDialog({
  open,
  setOpen,
  photo,
  _id,
  name,
}) {
  const disptach = useDispatch();
  const imgLoading = useSelector((s) => s.uploadImg.loading);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [imgUrl, setImgUrl] = React.useState("");
  const fileSelectRef = React.useRef(null);
  const [edit, setEdit] = React.useState(false);

  const handleFileSelect = () => fileSelectRef.current.click();

  const handleOpen = () => setOpen((cur) => !cur);
  const handleIsFavorite = () => setIsFavorite((cur) => !cur);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setImgUrl(URL.createObjectURL(file));
  };

  const handleChangeDestinationImg = () => {
    if (!file) {
      return setOpen(false);
    }
    disptach(handleImageUpload(file)).then((response) => {
      console.log(response);
      const urlId = separatePhotoId(response?.payload?.secure_url);
      console.log(urlId);
    });
  };

  return (
    <>
      <Dialog className="relative" size="lg" open={open} handler={handleOpen}>
        {imgLoading && <Loading />}
        <DialogHeader className="justify-between">
          <div className="flex items-center gap-3">
            <Avatar
              size="sm"
              variant="circular"
              alt="tania andrew"
              src={
                photo
                  ? `https://res.cloudinary.com/${cloudName}/image/upload/v1689876154/BookIt_uploades/${photo}.jpg`
                  : "/defaults/default-image.jpg"
              }
            />
            <div className="-mt-px flex justify-center items-center gap-2">
              {!edit ? (
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {name}
                </Typography>
              ) : (
                <Input value={name} variant="outlined" label="name" />
              )}
              {edit && <Button size="sm">save</Button>}
              <IconButton
                onClick={() => setEdit((s) => !s)}
                variant="text"
                color="blue-gray"
              >
                {!edit ? (
                  <PencilIcon className="h-4 w-4" />
                ) : (
                  <AiOutlineClose
                    color="red"
                    className="bg-red-100 rounded-full p-1"
                    size={20}
                  />
                )}
              </IconButton>
            </div>
          </div>
          <div className="flex items-center gap-2"></div>
        </DialogHeader>
        <DialogBody divider={true} className="p-0">
          <img
            alt="nature"
            className="h-[28rem] w-full object-cover object-center"
            src={
              imgUrl
                ? imgUrl
                : photo
                ? `https://res.cloudinary.com/${cloudName}/image/upload/v1689876154/BookIt_uploades/${photo}.jpg`
                : "/defaults/default-image.jpg"
            }
          />
        </DialogBody>
        <DialogFooter className="justify-between">
          <Button
            size="sm"
            variant="outlined"
            color="blue-gray"
            className="flex items-center gap-3"
            onClick={() => {
              handleFileSelect();
              handleIsFavorite();
            }}
          >
            Choose
          </Button>
          <Button
            size="sm"
            variant="outlined"
            color="blue-gray"
            className="flex items-center gap-3"
            onClick={handleChangeDestinationImg}
          >
            <FaUpload size={20} />
            Upload
          </Button>
          <input
            onChange={handleImageChange}
            className="hidden"
            ref={fileSelectRef}
            name="image"
            type="file"
          />
        </DialogFooter>
      </Dialog>
    </>
  );
}
