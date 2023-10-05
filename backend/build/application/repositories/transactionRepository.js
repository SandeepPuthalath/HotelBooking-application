"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function transactionRepository(repository) {
    const createTransaction = async (amount, wallet) => await repository.createTransaction(amount, wallet);
    return {
        createTransaction
    };
}
exports.default = transactionRepository;
