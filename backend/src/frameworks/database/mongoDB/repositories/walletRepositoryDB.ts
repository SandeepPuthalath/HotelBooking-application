import mongoose from "mongoose";
import Wallet from "../models/walletModel";
import { WalletEntityType } from "../../../../entities/wallet";

export default function walletRepositoryDB() {
  const createWallet = async (wallet: WalletEntityType) =>
    await Wallet.create({
      user: wallet.getUsre(),
    });

  const findWallet = async (id: mongoose.Types.ObjectId) => {
    const wallet = await Wallet.findOne({ user: id })
      .populate({ path: "transactions", options: { sort: { createdAt: -1 } } })
      .exec();
    return wallet;
  };

  const updateWallet = async (
    id: string,
    amount: number,
    transactionId: mongoose.Types.ObjectId
  ) =>
    await Wallet.findOneAndUpdate(
      { user: id },
      {
        $inc: { balance: amount },
        $push: { transactions: transactionId },
      },
      { new: true }
    ).populate("transactions");

  return {
    createWallet,
    findWallet,
    updateWallet,
  };
}

export type WalletRepositoryDbType = typeof walletRepositoryDB;
