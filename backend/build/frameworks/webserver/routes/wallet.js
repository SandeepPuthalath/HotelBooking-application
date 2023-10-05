"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const walletController_1 = __importDefault(require("../../../adapters/walletController/walletController"));
const walletRepository_1 = __importDefault(require("../../../application/repositories/walletRepository"));
const walletRepositoryDB_1 = __importDefault(require("../../database/mongoDB/repositories/walletRepositoryDB"));
const transactionRepository_1 = __importDefault(require("../../../application/repositories/transactionRepository"));
const transactionRepositoryDB_1 = __importDefault(require("../../database/mongoDB/repositories/transactionRepositoryDB"));
function walletRouter() {
    const router = express_1.default.Router();
    const controller = (0, walletController_1.default)(walletRepository_1.default, walletRepositoryDB_1.default, transactionRepository_1.default, transactionRepositoryDB_1.default);
    router
        .route("/")
        .post(controller.handleAddMoney)
        .get(controller.handleFetchingWallet);
    return router;
}
exports.default = walletRouter;
