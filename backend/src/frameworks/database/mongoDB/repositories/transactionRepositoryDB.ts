import mongoose from "mongoose";
import Transaction from "../models/transactionModel";

export default function transactionRepositoryDB() {
  const createTransaction = async (
    amount: number,
    wallet: mongoose.Types.ObjectId
  ) =>
    await Transaction.create({
      amount,
      wallet,
    });


    return{
        createTransaction,
    }
}


export type TransactionRepositoryDBType = typeof transactionRepositoryDB