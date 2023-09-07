import express, { Application, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import path from "path";
import configKeys from "../../config";

const expressConfig = (app: Application) => {
  app.use(express.json());
  const _dirname = path.join("");
  const buildPath = path.join(_dirname, "../frontend/build")
  app.use(express.static(buildPath))
  app.use(bodyParser.json({ limit: "10mb" }));
  app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet({ xssFilter: true }));
  app.use(morgan("dev"));

  // Set up CORS headers
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    next();
  });

  const corsOptions = {
    origin: configKeys.CLIENT_URL,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    exposedHeaders: [
      "Cross-Origin-Opener-Policy",
      "Cross-Origin-Resource-Policy",
      "Access-Control-Allow-Origin",
    ],
  };

  app.use(cors(corsOptions));


};

export default expressConfig;
