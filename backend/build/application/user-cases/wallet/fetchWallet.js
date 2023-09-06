"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function fetchWallet(user, repository) {
    const wallet = await repository.findWallet(new mongoose_1.default.Types.ObjectId(user));
    return wallet ? wallet : {};
}
exports.default = fetchWallet;
