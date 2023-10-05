"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TransactionSchema = new mongoose_1.default.Schema({
    wallet: {
        type: mongoose_1.default.Types.ObjectId,
        require: true,
        ref: "wallet",
    },
    amount: {
        type: Number,
        require: true,
    },
}, { timestamps: true });
const Transaction = mongoose_1.default.model("transaction", TransactionSchema);
exports.default = Transaction;
