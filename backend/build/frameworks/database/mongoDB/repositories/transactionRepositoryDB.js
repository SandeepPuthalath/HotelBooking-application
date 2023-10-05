"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transactionModel_1 = __importDefault(require("../models/transactionModel"));
function transactionRepositoryDB() {
    const createTransaction = async (amount, wallet) => await transactionModel_1.default.create({
        amount,
        wallet,
    });
    return {
        createTransaction,
    };
}
exports.default = transactionRepositoryDB;
