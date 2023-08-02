import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
    },
    phoneNumber: {
      type: Number,
      trim: true,
      require: true,
    },
    email: {
      type: String,
      trim: true,
      require: true,
    },
    address: {
      type: String,
      trim: true,
      require: true,
    },
    roomId: {
      type: String,
      trim: true,
      require: true,
    },
    hotelId: {
      type: String,
      trim: true,
      require: true,
    },
    userId:{
      type: String,
      trim: true,
      require: true,
    },
    maxPeople: {
      type: Number,
      trim: true,
      require: true,
    },
    checkInDate: {
      type: Date,
      trim: true,
      require: true,
    },
    checkOutDate:{
      type: Date,
      trim: true,
      require: true,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
