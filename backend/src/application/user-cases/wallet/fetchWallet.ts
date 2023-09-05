import mongoose from "mongoose";
import { WalletRepositoryDbType } from "../../../frameworks/database/mongoDB/repositories/walletRepositoryDB";

export default async function fetchWallet(user: string, repository: ReturnType<WalletRepositoryDbType>){
    
    const wallet = await repository.findWallet(new mongoose.Types.ObjectId(user));

    return wallet? wallet : {};
}