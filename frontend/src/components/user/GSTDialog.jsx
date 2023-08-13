import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { handleRoleChangeApplication } from "../../redux/reducers/applications/applicationReducer";
import { toast } from "react-toastify";

const GSTDialog = ({ isOpen, onClose, name, applicantId }) => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    GSTNumber: Yup.string()
      .required("GST Number is required")
      .matches(
        /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/,
        "Invalid GST Number"
      ),
  });

  const formik = useFormik({
    initialValues: {
      gstNumber: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      // Handle form submission
      values.name = name;
      values.applicantId = applicantId;
     await dispatch(handleRoleChangeApplication(values)).then((response) => {
        console.log(response);
        if(response.errors){
          return toast.error("something went wrong")
        }
        toast.success("Application has been successfully submited")
        onClose()
      });
    },
  });

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur">
      <div className="bg-white w-96 rounded shadow-md p-6">
        <h2 className="text-xl mb-4">GST Number</h2>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            className="w-full p-2 mb-4 border rounded"
            placeholder="GST Number"
            {...formik.getFieldProps("GSTNumber")}
          />
          {formik.touched.gstNumber && formik.errors.gstNumber && (
            <div className="text-red-500 mb-2">{formik.errors.gstNumber}</div>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GSTDialog;
