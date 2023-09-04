import { Server } from "socket.io";
import { AuthService } from "../services/authService";
import messageRepositoryDB from "../database/mongoDB/repositories/messageRepositoryDB";
import mongoose from "mongoose";

const socketConfig = (io: Server, authService: ReturnType<AuthService>) => {
  const addMessage = async (
    hotelId: string,
    userId: string,
    message: string,
    sender: string
  ) =>
    await messageRepositoryDB().addMessage(
      new mongoose.Types.ObjectId(userId),
      new mongoose.Types.ObjectId(hotelId),
      message,
      new mongoose.Types.ObjectId(sender)
    );

  io.use((socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
      const res: any = authService.verifyToken(
        socket.handshake.query.token as string
      );
      socket.data.userId = JSON.parse(res.payload)?._id;
      next();
    }
  }).on("connection", (socket) => {
    console.log(`user connected ${socket.id}`);
    socket.on("join_help_desk", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room:${data}`);
    });

    socket.on("send_message", async (data) => {
      if (socket.data.userId) {
        console.log("got here", socket.data.userId)
        const res = await addMessage(
          data.hotelId,
          socket.data.userId,
          data.message,
          data.sender,
        );
        socket.to(data.hotelId).emit("receive_message", res);
      }
    });

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
  });
};

export default socketConfig;
