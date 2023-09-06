"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const wallet_1 = __importDefault(require("../../../entities/wallet"));
async function addMoney(user, amount, repository, transaction) {
    const isWallet = await repository.findWallet(new mongoose_1.default.Types.ObjectId(user));
    if (!isWallet) {
        const newWalletEntity = (0, wallet_1.default)(user);
        const newWallet = await repository.createWallet(newWalletEntity);
        const newTransaction = await transaction.createTransaction(amount, newWallet?._id);
        return await repository.updateWallet(user, amount, newTransaction?._id);
    }
    else {
        const newTransaction = await transaction.createTransaction(amount, isWallet?._id);
        return await repository.updateWallet(user, amount, newTransaction?._id);
    }
}
exports.default = addMoney;
