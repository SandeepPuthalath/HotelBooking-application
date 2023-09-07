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
const path_1 = __importDefault(require("path"));
const expressConfig = (app) => {
    app.use(express_1.default.json());
    const _dirname = path_1.default.join("");
    const buildPath = path_1.default.join(_dirname, "../frontend/build");
    app.use(express_1.default.static(buildPath));
    app.use(body_parser_1.default.json({ limit: "10mb" }));
    app.use(body_parser_1.default.urlencoded({ limit: "10mb", extended: true }));
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, helmet_1.default)({ xssFilter: true }));
    app.use((0, morgan_1.default)("dev"));
    // Set up CORS headers
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
        next();
    });
    const corsOptions = {
        origin: '*',
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
        exposedHeaders: [
            'Cross-Origin-Opener-Policy',
            'Cross-Origin-Resource-Policy',
            'Access-Control-Allow-Origin'
        ],
    };
    app.use((0, cors_1.default)(corsOptions));
};
exports.default = expressConfig;
