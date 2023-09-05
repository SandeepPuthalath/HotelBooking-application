import mongoose from "mongoose";

export default function wallet(
    user: string,
){
    return{
        getUsre: ():mongoose.Types.ObjectId => new mongoose.Types.ObjectId(user)
    }
}


export type WalletEntityType = ReturnType<typeof wallet>