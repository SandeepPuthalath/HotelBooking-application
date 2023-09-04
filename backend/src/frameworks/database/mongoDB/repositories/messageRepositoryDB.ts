import mongoose from "mongoose";
import Message from "../models/MessageModel";

export default function messageRepositoryDB() {
  const addMessage = async (
    user: mongoose.Types.ObjectId,
    hotel: mongoose.Types.ObjectId,
    message: string,
    sender: mongoose.Types.ObjectId,
  ) => (await Message.create({
    user,
    hotel,
    message,
    sender,
  })).populate('user',["firstName", "lastName",]);

  const getMessages = async (hotelId: mongoose.Types.ObjectId) =>
    await Message.find({ hotel: hotelId })
      .populate("user", "_id firstName lastName")
      .sort({ sendTime: 1 });

  return {
    addMessage,
    getMessages
  };
}

export type MessageRepositoryDBType = typeof messageRepositoryDB;
