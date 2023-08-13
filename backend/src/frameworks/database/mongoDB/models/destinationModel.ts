import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    photo: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    featured: {
      type: Boolean, 
      default: false
    }
  },
  { timestamps: true }
);

const Destination = mongoose.model("destination", destinationSchema);

export default Destination;
