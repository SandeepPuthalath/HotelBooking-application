import express, { Application, NextFunction } from "express";
import connectDB from "./frameworks/database/mongoDB/connection";
import http from "http";
import serverConfig from "./frameworks/webserver/server";
import expressConfig from "./frameworks/webserver/express";
import routes from "./frameworks/webserver/routes";
import AppError from "./utils/appError";
import errorHandlingMidlleware from "./frameworks/webserver/middlewares/errorHandlingMidlleware";
import { Server } from "socket.io";
import configKeys from './config';
import socketConfig from "./frameworks/webSocket/socket";
import { authService } from "./frameworks/services/authService";

const app: Application = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors:{
    origin:configKeys.CLIENT_URL,
    methods:["GET", "POST"]
  }
})

socketConfig(io, authService());

//connecting mongoDb
connectDB();

expressConfig(app);

// routes for each endpoint
routes(app);

app.use(errorHandlingMidlleware);

// catch 404 and forward to error handler
app.all("*", (req, res, next: NextFunction) => {
  next(new AppError("Not found", 404));
});

serverConfig(server).startServer();
