import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  price: Yup.number().required("Price is required"),
  type: Yup.string().required("Room Type is required"),
  maxPeople: Yup.number().required("Max people is required"),
  desc: Yup.string().required("Description is required"),
});

const options = [
  { value: "single", text: "Single Rooms" },
  { value: "double", text: "Double Rooms" },
  { value: "twin", text: "Twin Rooms" },
];

const RoomInfo = ({ title, price, type, maxPeople, desc }) => {

    const [edit, setEdit] = React.useState(true);

    const handleEdit = () => setEdit(s => !s)

  const formik = useFormik({
    initialValues: {
      title: title,
      price: price,
      type: type,
      maxPeople: maxPeople,
      desc: desc,
    },
    validationSchema,
    onSubmit: (payloads, { setSubmitting, setErrors }) => {
      try {
        console.log(payloads);
        // dispatch(handleAddRoom({ hotelId, roomData: payloads }));
        // toast.success("Room added successfull");
      } catch (error) {
        toast.error("Somthing went wrong");
      }
    },
  });
  return (
    <div className="flex w-72 flex-col gap-6">
      <Input
        {...formik.getFieldProps("title")}
        error={formik.touched.title && Boolean(formik.errors.title)}
        variant="standard"
        label="Title"
        disabled={edit}
      />
      {formik.touched.title && formik.errors.title && (
        <Typography variant="small" color="red">
          {formik.errors.title}
        </Typography>
      )}
      <Input
        {...formik.getFieldProps("price")}
        error={formik.touched.price && Boolean(formik.errors.price)}
        variant="standard"
        label="Price"
        disabled={edit}
      />
      {formik.touched.price && formik.errors.price && (
        <Typography variant="small" color="red">
          {formik.errors.price}
        </Typography>
      )}
      <Select
        onChange={(e) => {
          formik.setFieldValue("type", e);
        }}
        error={formik.touched.type && Boolean(formik.errors.type)}
        variant="standard"
        label="Room Type"
        disabled={edit}
      >
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.text}
          </Option>
        ))}
      </Select>
      {formik.touched.type && formik.errors.type && (
        <Typography variant="small" color="red">
          {formik.errors.type}
        </Typography>
      )}

      <Input
        {...formik.getFieldProps("maxPeople")}
        error={formik.touched.maxPeople && Boolean(formik.errors.maxPeople)}
        variant="standard"
        label="Max people"
        disabled={edit}
      />
      {formik.touched.maxPeople && formik.errors.maxPeople && (
        <Typography variant="small" color="red">
          {formik.errors.maxPeople}
        </Typography>
      )}
      <Textarea
        {...formik.getFieldProps("desc")}
        error={formik.touched.desc && Boolean(formik.errors.desc)}
        variant="standard"
        label="description"
        disabled={edit}
      />
      {formik.touched.desc && formik.errors.desc && (
        <Typography variant="small" color="red">
          {formik.errors.desc}
        </Typography>
      )}
      <div className="flex justify-center items-center gap-3">
        <Button variant="text" color={edit? "blue" : "red"} onClick={handleEdit}>
          {
            !edit ? <span>Cancel</span> : <span>Edit</span>
          }
        </Button>
        <Button variant="gradient" color="green" onClick={formik.handleSubmit} disabled={edit}>
          <span>Save</span>
        </Button>
      </div>
    </div>
  );
};

export default RoomInfo;
