"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function userEntity(firstName, lastName, email, phoneNumber, password) {
    return {
        getFirstName: () => firstName,
        getLastName: () => lastName,
        getEmail: () => email,
        getPhoneNumber: () => parseInt(phoneNumber),
        getPassword: () => password
    };
}
exports.default = userEntity;
