"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDbRepository = void 0;
const userDbRepository = (repository) => {
    const getUserByEmail = async (email) => await repository.getUserByEmail(email);
    const addUser = async (user) => await repository.addUser(user);
    return {
        getUserByEmail,
        addUser,
    };
};
exports.userDbRepository = userDbRepository;
