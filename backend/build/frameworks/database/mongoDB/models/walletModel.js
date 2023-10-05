"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const WalletSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Types.ObjectId,
        require: true,
        ref: "User",
    },
    balance: {
        type: Number,
        default: 0,
    },
    transactions: [{ type: mongoose_1.default.Types.ObjectId, ref: "transaction" }],
}, { timestamps: true });
const Wallet = mongoose_1.default.model("wallet", WalletSchema);
exports.default = Wallet;
