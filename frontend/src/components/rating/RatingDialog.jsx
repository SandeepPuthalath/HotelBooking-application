import { Dialog, Rating } from "@material-tailwind/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleRating } from "../../redux/reducers/hotel/hotelDetailsSlice";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RatingDialog = ({ open, setOpen, hotelId, userId }) => {
  const access = useSelector((s) => s.user?.data?.token);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [star, setStar] = React.useState(0);
  function handleChange(rate) {
    setStar(rate);
  }

  function handleSubmit() {
    if(!access) return navigate("/login")
    dispatch(handleRating({ star, userId, hotelId })).then((response) => {
      console.log(response);
      setOpen(false);
      toast.success(response.payload?.message);
    })
  }
  return (
    <Dialog size="xs" open={open} handler={() => setOpen(false)}>
      <div className="px-10 py-10">
        <div className="pb-2 flex justify-center items-center uppercase font-semibold">
          <h3>Rate user experience</h3>
        </div>
        <div className="flex justify-center items-center">
          <Rating
            unratedColor="amber"
            ratedColor="amber"
            onChange={handleChange}
            value={star}
          />
        </div>
        <div className="flex justify-center items-center gap-2 mt-5 ">
          <button
            onClick={handleSubmit}
            className="border-2 uppercase font-semibold border-light-green-900 text-light-green-900 rounded-sm hover:bg-light-green-900 hover:text-light-green-50 px-4 py-1"
          >
            submit
          </button>
          <button
            onClick={() => setOpen(false)}
            className="uppercase font-semibold border-2 border-red-900 text-red-900 hover:bg-red-900 hover:text-red-50 rounded-sm px-4 py-1"
          >
            cancel
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default RatingDialog;
