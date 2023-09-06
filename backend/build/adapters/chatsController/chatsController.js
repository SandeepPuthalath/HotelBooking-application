"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const fetchChats_1 = __importDefault(require("../../application/user-cases/chat/fetchChats"));
const httpStatus_1 = require("../../types/httpStatus");
function chatsController(messageRepository, messageRepositoryDB) {
    const repository = messageRepository(messageRepositoryDB());
    const handleFetchingMessages = (0, express_async_handler_1.default)(async (req, res, next) => {
        const hotelId = req.query.hotelId;
        const messages = await (0, fetchChats_1.default)(hotelId, repository);
        res.status(httpStatus_1.HttpStatus.OK).json(messages);
    });
    return {
        handleFetchingMessages,
    };
}
exports.default = chatsController;
