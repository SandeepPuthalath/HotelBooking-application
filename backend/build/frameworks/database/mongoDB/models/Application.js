"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const applicationSchema = new mongoose_1.Schema({
    status: {
        type: String,
        trim: true,
        default: "pending",
    },
    applicantId: {
        type: String,
        trim: true,
        require: true,
    },
    name: {
        type: String,
        trim: true,
    },
    GSTNumber: {
        type: String,
        trim: true,
        require: true,
    },
}, { timestamps: true });
const Application = (0, mongoose_1.model)("application", applicationSchema);
exports.default = Application;
