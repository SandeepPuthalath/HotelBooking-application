import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    hoteId: {
      type: String,
      trim: true,
      require: true,
    },
    title: {
      type: String,
      trim: true,
      require: true,
    },
    price: {
      type: Number,
      trim: true,
      require: true,
    },
    maxPeople: {
      type: Number,
      trim: true,
      require: true,
    },
    photos: {
      type: [String],
    },
    type: {
      type: String,
      trim: true,
    },
    desc: {
      type: String,
      trim: true,
      require: true,
    },
    unavailbleDates: { type: [Date] },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", RoomSchema);

export default Room;
