"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./frameworks/database/mongoDB/connection"));
const http_1 = __importDefault(require("http"));
const server_1 = __importDefault(require("./frameworks/webserver/server"));
const express_2 = __importDefault(require("./frameworks/webserver/express"));
const routes_1 = __importDefault(require("./frameworks/webserver/routes"));
const appError_1 = __importDefault(require("./utils/appError"));
const errorHandlingMidlleware_1 = __importDefault(require("./frameworks/webserver/middlewares/errorHandlingMidlleware"));
const socket_io_1 = require("socket.io");
const socket_1 = __importDefault(require("./frameworks/webSocket/socket"));
const authService_1 = require("./frameworks/services/authService");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
(0, socket_1.default)(io, (0, authService_1.authService)());
//connecting mongoDb
(0, connection_1.default)();
(0, express_2.default)(app);
// routes for each endpoint
(0, routes_1.default)(app);
app.use(errorHandlingMidlleware_1.default);
// catch 404 and forward to error handler
app.all("*", (req, res, next) => {
    next(new appError_1.default("Not found", 404));
});
(0, server_1.default)(server).startServer();
