"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const configKeys = {
    PORT: process.env.PORT,
    MONGO_DB_URL: process.env.DATABASE,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_CLOUD_ID: process.env.GOOGLE_CLOUD_ID,
    GOOGLE_KEY_SECRET: process.env.GOOGLE_KEY_SECRET,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_SERVICE_SID: process.env.TWILIO_SERVICE_SID,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    STRIPE_PRIVET_KEY: process.env.STRIPE_PRIVET_KEY,
    CLIENT_URL: process.env.CLIENT_URL,
    ENVIORNMENT: process.env.ENVIORNMENT,
};
exports.default = configKeys;
