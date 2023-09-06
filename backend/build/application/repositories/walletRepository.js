"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function walletRepository(repository) {
    const createWallet = async (wallet) => await repository.createWallet(wallet);
    const findWallet = async (id) => await repository.findWallet(id);
    const updateWallet = async (id, amount, transactionId) => await repository.updateWallet(id, amount, transactionId);
    return {
        createWallet,
        findWallet,
        updateWallet,
    };
}
exports.default = walletRepository;
