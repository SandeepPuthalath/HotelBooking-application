import mongoose from "mongoose";
import { TransactionRepositoryDBType } from "../../frameworks/database/mongoDB/repositories/transactionRepositoryDB";
import { type } from "os";

export default function transactionRepository(
  repository: ReturnType<TransactionRepositoryDBType>
) {
  const createTransaction = async (
    amount: number,
    wallet: mongoose.Types.ObjectId
  ) => await repository.createTransaction(amount, wallet);

  return {
    createTransaction
  }
}


export type TransactionRepository = typeof transactionRepository

