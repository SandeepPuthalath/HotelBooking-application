"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDbRepository = void 0;
const userDbRepository = (repository) => {
    const getUserByEmail = async (email) => await repository.getUserByEmail(email);
    const addUser = async (user) => await repository.addUser(user);
    const getUserByPhoneNumber = async (phoneNumber) => await repository.getUserByPhoneNumber(phoneNumber);
    const getUserById = async (id) => await repository.getUserById(id);
    const updateUserByProperty = async (id, update) => await repository.updateUserByProperty(id, update);
    const getAllUsers = async () => repository.getAllUsers();
    const changeUserRole = async (id, GSTNumber) => await repository.changeUserRole(id, GSTNumber);
    const changeProfileImg = async (id, url) => await repository.changeProfileImg(id, url);
    const countUsers = async () => await repository.countUsers();
    const fetchNewUsers = async () => await repository.fetchNewUsers();
    return {
        getUserByEmail,
        addUser,
        getUserByPhoneNumber,
        getUserById,
        updateUserByProperty,
        getAllUsers,
        changeUserRole,
        changeProfileImg,
        countUsers,
        fetchNewUsers,
    };
};
exports.userDbRepository = userDbRepository;
