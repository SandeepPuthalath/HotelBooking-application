import mongoose, { mongo } from "mongoose";
import { WalletRepositoryDbType } from "../../../frameworks/database/mongoDB/repositories/walletRepositoryDB";
import wallet from "../../../entities/wallet";
import { TransactionRepositoryDBType } from "../../../frameworks/database/mongoDB/repositories/transactionRepositoryDB";

export default async function addMoney(
  user: string,
  amount: number,
  repository: ReturnType<WalletRepositoryDbType>,
  transaction: ReturnType<TransactionRepositoryDBType>
) {
  const isWallet = await repository.findWallet(new mongoose.Types.ObjectId(user));
  if (!isWallet) {
    const newWalletEntity = wallet(user);
    const newWallet = await repository.createWallet(newWalletEntity);
    const newTransaction = await transaction.createTransaction(
      amount,
      newWallet?._id
    );
    return await repository.updateWallet(user, amount, newTransaction?._id);
  } else {
    const newTransaction = await transaction.createTransaction(
      amount,
      isWallet?._id
    );
    return await repository.updateWallet(user, amount, newTransaction?._id);
  }
}
