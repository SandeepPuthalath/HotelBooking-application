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

RoomSchema.pre("save", async function(next){
  const currentDate = new Date();
  this.unavailbleDates =this.unavailbleDates.filter(date => date >= currentDate);
  next()
})

const Room = mongoose.model("Room", RoomSchema);


export default Room;



