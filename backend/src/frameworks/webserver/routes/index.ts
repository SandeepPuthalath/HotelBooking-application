import { Application } from "express";
import authRouter from "./auth";
import userRouter from "./user";
import jwtTokenVerify from "../middlewares/jwtTokenVerification";
import applicationRoute from "./application";
import adminAuthRoute from "./adminAuth";
import adminRoute from "./admin";
import hotelRouter from "./hotel";
import roomRouter from "./room";
import bookingRouter from "./booking";
import destinationRouter from "./destination";

const routes = (app: Application) => {
  app.use("/api/auth", authRouter());
  app.use("/api/user", userRouter());
  app.use("/api/hotel", hotelRouter());
  app.use("/api/application", applicationRoute());
  app.use("/api/room", roomRouter());
  app.use("/api/booking",  bookingRouter());
  app.use("/api/adminAuth", adminAuthRoute());
  app.use("/api/admin", jwtTokenVerify, adminRoute());
  app.use("/api/destination", destinationRouter());

};

export default routes;
