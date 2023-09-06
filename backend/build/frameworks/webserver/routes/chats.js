"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatsController_1 = __importDefault(require("../../../adapters/chatsController/chatsController"));
const messageRepository_1 = __importDefault(require("../../../application/repositories/messageRepository"));
const messageRepositoryDB_1 = __importDefault(require("../../database/mongoDB/repositories/messageRepositoryDB"));
function chatRouter() {
    const router = express_1.default.Router();
    const controller = (0, chatsController_1.default)(messageRepository_1.default, messageRepositoryDB_1.default);
    router.route("/").get(controller.handleFetchingMessages);
    return router;
}
exports.default = chatRouter;
