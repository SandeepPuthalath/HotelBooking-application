import { NextFunction, Request, Response } from "express";
import { hotelRepositoryInterface } from "../../application/repositories/hotelRepository";
import { hotelRepositoryDbInterface } from "../../frameworks/database/mongoDB/repositories/hotelRespositoryDb";
import asyncHandler from "express-async-handler";
import addHotel from "../../application/user-cases/hotel/add";
import updateHotel from "../../application/user-cases/hotel/update";
import viewHotel from "../../application/user-cases/hotel/view";
import viewAllHotel from "../../application/user-cases/hotel/viewAll";
import removeHotel from "../../application/user-cases/hotel/remove";
import { HttpStatus } from "../../types/httpStatus";
import mongoose from "mongoose";
import getUserHotel from "../../application/user-cases/hotel/getUserHotel";

export default function hotelController(
  hotelRepositoryDb: hotelRepositoryInterface,
  hotelRepositoryDbImpl: hotelRepositoryDbInterface
) {
  const repository = hotelRepositoryDb(hotelRepositoryDbImpl());

  const handleAddHotel = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const hotelData = req.body;
      const userId = req.params?.userId;

      const data: any = await addHotel(userId, hotelData, repository);

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "Hotel added successfully",
        data: data,
      });
    }
  );

  const handleUpdateHotel = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const updates = req.body;
      const { id } = req.params;

      const data = await updateHotel(
        new mongoose.Types.ObjectId(id),
        updates,
        repository
      );

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "Hotel has been updated successfully",
        data: data,
      });
    }
  );

  const handleDeleteHotel = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      await removeHotel(new mongoose.Types.ObjectId(id), repository);

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "Hotel has been removed successfully",
      });
    }
  );

  const handleViewHotel = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const data = await viewHotel(new mongoose.Types.ObjectId(id), repository);

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "Hotel details has been fetched successfully",
        data: data,
      });
    }
  );

  const handleViewAllHotels = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await viewAllHotel(repository);

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "All hotels has been fetched successfully",
        data: data,
      });
    }
  );

  const handleGetMyHotelDetails = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      console.log(req.params);
      const userId = req.params?.userId;
      const data = await getUserHotel(
        new mongoose.Types.ObjectId(userId),
        repository
      );
      console.log(data);

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "User hotel has been fetched successfully",
        data: data,
      });
    }
  );

  return {
    handleAddHotel,
    handleUpdateHotel,
    handleDeleteHotel,
    handleViewHotel,
    handleViewAllHotels,
    handleGetMyHotelDetails,
  };
}
