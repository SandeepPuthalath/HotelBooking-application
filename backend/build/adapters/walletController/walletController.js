"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const addMoney_1 = __importDefault(require("../../application/user-cases/wallet/addMoney"));
const httpStatus_1 = require("../../types/httpStatus");
const fetchWallet_1 = __importDefault(require("../../application/user-cases/wallet/fetchWallet"));
function walletController(walletRepositoryInt, walletReposiroyImp, transactionRepoInt, transactionRepoImp) {
    const walletRepo = walletRepositoryInt(walletReposiroyImp());
    const transactionRepo = transactionRepoInt(transactionRepoImp());
    const handleAddMoney = (0, express_async_handler_1.default)(async (req, res, next) => {
        const userId = req.query?.userId;
        const amount = req.body?.amount;
        console.log(userId, amount, "in wallet controller");
        const result = await (0, addMoney_1.default)(userId, amount, walletRepo, transactionRepo);
        res.status(httpStatus_1.HttpStatus.OK).json(result);
    });
    const handleFetchingWallet = (0, express_async_handler_1.default)(async (req, res, next) => {
        const userId = req.query?.userId;
        console.log(userId, "in wallet controller");
        const result = await (0, fetchWallet_1.default)(userId, walletRepo);
        res.status(httpStatus_1.HttpStatus.OK).json(result);
    });
    return {
        handleAddMoney,
        handleFetchingWallet,
    };
}
exports.default = walletController;
