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

const routes = (app: Application) => {
  app.use("/api/auth", authRouter());
  app.use("/api/user", userRouter());
  app.use("/api/hotel", hotelRouter());
  app.use("/api/application", jwtTokenVerify, applicationRoute());
  app.use("/api/adminAuth", adminAuthRoute());
  app.use("/api/room", roomRouter());
  app.use("/api/admin", jwtTokenVerify, adminRoute());
  app.use("/api/booking",  bookingRouter());
};

export default routes;
