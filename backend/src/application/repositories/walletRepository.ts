import mongoose from "mongoose";
import wallet, { WalletEntityType } from "../../entities/wallet";
import { WalletRepositoryDbType } from "../../frameworks/database/mongoDB/repositories/walletRepositoryDB";


export default function walletRepository(repository: ReturnType<WalletRepositoryDbType>){


    const createWallet = async (wallet:WalletEntityType) => await repository.createWallet(wallet);

    const findWallet = async (id: mongoose.Types.ObjectId) => await repository.findWallet(id);

    const updateWallet = async (id: string, amount:number, transactionId: mongoose.Types.ObjectId) =>
        await repository.updateWallet(id, amount, transactionId);

    return{
        createWallet,
        findWallet,
        updateWallet,
    }
}


export type WalletRepositoryType = typeof walletRepository