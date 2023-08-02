"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const expressConfig = (app) => {
    app.use(express_1.default.json());
    app.use(body_parser_1.default.json({ limit: '10mb' }));
    app.use(body_parser_1.default.urlencoded({ limit: '10mb', extended: true }));
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, helmet_1.default)({ xssFilter: true }));
    app.use((0, morgan_1.default)('dev'));
    app.use((0, cors_1.default)({
        origin: 'http://localhost:5173',
        methods: 'GET POST PUT PATCH DELETE',
        credentials: true,
    }));
};
exports.default = expressConfig;
