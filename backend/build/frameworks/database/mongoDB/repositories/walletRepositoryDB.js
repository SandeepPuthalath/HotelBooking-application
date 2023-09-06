"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const walletModel_1 = __importDefault(require("../models/walletModel"));
function walletRepositoryDB() {
    const createWallet = async (wallet) => await walletModel_1.default.create({
        user: wallet.getUsre(),
    });
    const findWallet = async (id) => {
        const wallet = await walletModel_1.default.findOne({ user: id })
            .populate({ path: "transactions", options: { sort: { createdAt: -1 } } })
            .exec();
        return wallet;
    };
    const updateWallet = async (id, amount, transactionId) => await walletModel_1.default.findOneAndUpdate({ user: id }, {
        $inc: { balance: amount },
        $push: { transactions: transactionId },
    }, { new: true })
        .populate({ path: "transactions", options: { sort: { createdAt: -1 } } })
        .exec();
    return {
        createWallet,
        findWallet,
        updateWallet,
    };
}
exports.default = walletRepositoryDB;
