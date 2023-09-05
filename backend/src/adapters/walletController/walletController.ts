import expressAsyncHandler from "express-async-handler";
import { TransactionRepository } from "../../application/repositories/transactionRepository";
import { WalletRepositoryType } from "../../application/repositories/walletRepository";
import { TransactionRepositoryDBType } from "../../frameworks/database/mongoDB/repositories/transactionRepositoryDB";
import { WalletRepositoryDbType } from "../../frameworks/database/mongoDB/repositories/walletRepositoryDB";
import { NextFunction, Request, Response } from "express";
import addMoney from "../../application/user-cases/wallet/addMoney";
import { HttpStatus } from "../../types/httpStatus";
import fetchWallet from "../../application/user-cases/wallet/fetchWallet";



export default function walletController(
    walletRepositoryInt: WalletRepositoryType,
    walletReposiroyImp: WalletRepositoryDbType,
    transactionRepoInt: TransactionRepository,
    transactionRepoImp: TransactionRepositoryDBType,
){

    const walletRepo = walletRepositoryInt(walletReposiroyImp());
    const transactionRepo = transactionRepoInt(transactionRepoImp());

    const handleAddMoney = expressAsyncHandler(async (req:Request, res: Response, next:NextFunction) =>{
        const userId = req.query?.userId as string;
        const amount = req.body?.amount
        console.log(userId, amount, "in wallet controller");
        const result = await addMoney(userId, amount, walletRepo, transactionRepo);
        res.status(HttpStatus.OK).json(result)
    })

    const handleFetchingWallet = expressAsyncHandler(
      async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.query?.userId as string;
        console.log(userId, "in wallet controller");
        const result = await fetchWallet(
          userId,
          walletRepo,
        );
        res.status(HttpStatus.OK).json(result);
      }
    );

    return {
        handleAddMoney,
        handleFetchingWallet,
    }

}