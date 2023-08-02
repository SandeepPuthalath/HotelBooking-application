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
// import routes from './frameworks/webserver/routes';
// import connection from './frameworks/database/redis/connection';
// import errorHandlingMidlleware from './frameworks/webserver/middlewares/errorHandlingMiddleware';
// import AppError from './utils/appError';
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
//connecting mongoDb
(0, connection_1.default)();
(0, express_2.default)(app);
// routes for each endpoint
// routes(app);
// app.use(errorHandlingMidlleware);
// catch 404 and forward to error handler
// app.all('*', (req, res, next: NextFunction) => {
//   next(new AppError('Not found', 404));
// });
(0, server_1.default)(server).startServer();
// export type RedisClient = typeof redisClient;
