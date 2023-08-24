import { Dialog, Radio } from "@material-tailwind/react";
import React from "react";
import { BsStripe } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { handlePayment } from "../../redux/reducers/booking/bookingSlice";

const validationSchema = Yup.object().shape({
  paymentMethod: Yup.string().required("please choose a payment option"),
});

const PaymentDialog = ({open, setOpen, bookingId}) => {
    const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      paymentMethod: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values, bookingId);
      dispatch(handlePayment({...values, bookingId})).then((response) =>{
        console.log("payment url", response)
        const {url} = response?.payload;
        window.location = url
      }).catch((error) =>{

      })
    },
  });

  return (
    <Dialog size="sm" open={open}>
      <div>
        <div className="flex justify-center items-center py-5 border-b-2">
          <h4 className="text-xl uppercase font-bold text-gray-900">
            select a payment option
          </h4>
        </div>
        <div className="relative">
          {formik.touched.paymentMethod && formik.errors.paymentMethod && (
            <div className="absolute w-full flex justify-center items-center">
              <span className="text-red-700">
                {formik.errors.paymentMethod}
              </span>
            </div>
          )}
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col min-h-[10rem] px-10 py-10 gap-5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <BsStripe className="text-indigo-500" size={40} />
                <h6 className="text-lg font-semibold">Pay using Stripe</h6>
              </div>
              <Radio
                value="stripe"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="paymentMehtod"
                name="paymentMethod"
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <FaRupeeSign className="text-green-500" size={40} />
                <h6 className="text-lg font-semibold">Pay on checkout</h6>
              </div>
              <Radio
                value="pay_on_checkout"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="paymentMehtod"
                name="paymentMethod"
              />
            </div>
          </div>

          <div className="flex justify-end px-10 border-t-2 py-5">
            <div className="flex gap-2">
              <button onClick={() => setOpen(false)} className="text-md font-semibold uppercase bg-red-50 rounded-sm text-red-800 px-6 py-2">
                cancel
              </button>
              <button
                type="submit"
                className="text-md font-semibold uppercase bg-gray-900 rounded-sm text-gray-300 px-3 py-2"
              >
                Pay now
              </button>
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default PaymentDialog;
