"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        trim: true,
        maxlength: 32,
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: 32,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please add a valid email'],
    },
    phoneNumber: {
        type: Number,
        maxlength: 10,
    },
    password: {
        type: String,
        trim: true,
    },
    // confirmationToken: {
    //   type: String,
    //   required: true,
    // },
    // confirmed: {
    //   type: Boolean,
    //   default: false,
    // },
}, { timestamps: true });
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
