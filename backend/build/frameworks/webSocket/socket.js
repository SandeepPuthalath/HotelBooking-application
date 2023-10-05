"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messageRepositoryDB_1 = __importDefault(require("../database/mongoDB/repositories/messageRepositoryDB"));
const mongoose_1 = __importDefault(require("mongoose"));
const socketConfig = (io, authService) => {
    const addMessage = async (hotelId, userId, message, sender) => await (0, messageRepositoryDB_1.default)().addMessage(new mongoose_1.default.Types.ObjectId(userId), new mongoose_1.default.Types.ObjectId(hotelId), message, new mongoose_1.default.Types.ObjectId(sender));
    io.use((socket, next) => {
        if (socket.handshake.query && socket.handshake.query.token) {
            const res = authService.verifyToken(socket.handshake.query.token);
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
                console.log("got here", socket.data.userId);
                const res = await addMessage(data.hotelId, socket.data.userId, data.message, data.sender);
                socket.to(data.hotelId).emit("receive_message", res);
            }
        });
        socket.on("disconnect", () => {
            console.log("user disconnected", socket.id);
        });
    });
};
exports.default = socketConfig;
