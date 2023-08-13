import expressAsyncHandler from "express-async-handler";
import { DestinationRepositoryInterface } from "../../application/repositories/destinationRepository";
import { DestinationRespositoryDbType } from "../../frameworks/database/mongoDB/repositories/destinationRespositoryDb";
import { Request, Response, NextFunction } from "express";
import addDestination from "../../application/user-cases/Destination/AddDestination";
import { HttpStatus } from "../../types/httpStatus";
import fetchAllDestinations from "../../application/user-cases/Destination/fetchAllDestinations";
import fetchFeatured from "../../application/user-cases/Destination/fetchFeatured";

export default function destinationController(
  destinationRepoInt: DestinationRepositoryInterface,
  destinationRepoImp: DestinationRespositoryDbType
) {
  const destinationRepo = destinationRepoInt(destinationRepoImp());

  const handleAddDestination = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { name, photo } = req.body;

      const data = await addDestination(name, photo, destinationRepo);

      res
        .status(HttpStatus.OK)
        .json({
          status: "success",
          message: "Destination has been add successfully",
          data: data,
        });
    }
  );

  const handleFetchAllDestinations = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await fetchAllDestinations(destinationRepo);

      res
        .status(HttpStatus.OK)
        .json({
          status: "success",
          message: "All destinations has been fetched successfully",
          data: data,
        });
    }
  );

  const handleFetchFeatured = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      
      const count : any = req.query.count;

      const data = await fetchFeatured(parseInt(count), destinationRepo);

      res.status(HttpStatus.OK).json({status:"success", message: "Featured destinations has been fetched successfully", data: data})
    }
  );

  return {
    handleAddDestination,
    handleFetchAllDestinations,
    handleFetchFeatured,
  };
}
