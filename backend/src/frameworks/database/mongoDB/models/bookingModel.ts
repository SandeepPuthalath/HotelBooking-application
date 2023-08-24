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
      type: mongoose.Types.ObjectId,
      trim: true,
      require: true,
      ref: "rooms"
    },
    hotelId: {
      type: mongoose.Types.ObjectId,
      trim: true,
      require: true,
      ref:"hotels"
    },
    userId:{
      type: mongoose.Types.ObjectId,
      trim: true,
      require: true,
      ref: "users"
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
    totalDays:{
      type: Number,
      require: true,
    },
    price:{
      type: Number,
      trim: true,
      require: true
    },
    paymentMethod:{
      type: String,
      trim: true,
      default: "pay_on_checkout"
    },
    paymentStatus:{
      type:String,
      trim:true,
      default:"pending"
    },
    status:{
      type:String,
      trim: true,
      default: "booked"
    }
  },
  { timestamps: true }
);


const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
