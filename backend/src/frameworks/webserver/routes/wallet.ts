import express from "express";
import walletController from "../../../adapters/walletController/walletController";
import walletRepository from "../../../application/repositories/walletRepository";
import walletRepositoryDB from "../../database/mongoDB/repositories/walletRepositoryDB";
import transactionRepository from "../../../application/repositories/transactionRepository";
import transactionRepositoryDB from "../../database/mongoDB/repositories/transactionRepositoryDB";

export default function walletRouter() {
  const router = express.Router();
  const controller = walletController(
    walletRepository,
    walletRepositoryDB,
    transactionRepository,
    transactionRepositoryDB
  );

  router
    .route("/")
    .post(controller.handleAddMoney)
    .get(controller.handleFetchingWallet);

  return router;
}
