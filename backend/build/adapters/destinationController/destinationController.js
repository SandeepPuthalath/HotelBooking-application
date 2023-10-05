"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const AddDestination_1 = __importDefault(require("../../application/user-cases/Destination/AddDestination"));
const httpStatus_1 = require("../../types/httpStatus");
const fetchAllDestinations_1 = __importDefault(require("../../application/user-cases/Destination/fetchAllDestinations"));
const fetchFeatured_1 = __importDefault(require("../../application/user-cases/Destination/fetchFeatured"));
function destinationController(destinationRepoInt, destinationRepoImp) {
    const destinationRepo = destinationRepoInt(destinationRepoImp());
    const handleAddDestination = (0, express_async_handler_1.default)(async (req, res, next) => {
        const { name, photo } = req.body;
        const data = await (0, AddDestination_1.default)(name, photo, destinationRepo);
        res
            .status(httpStatus_1.HttpStatus.OK)
            .json({
            status: "success",
            message: "Destination has been add successfully",
            data: data,
        });
    });
    const handleFetchAllDestinations = (0, express_async_handler_1.default)(async (req, res, next) => {
        const data = await (0, fetchAllDestinations_1.default)(destinationRepo);
        res
            .status(httpStatus_1.HttpStatus.OK)
            .json({
            status: "success",
            message: "All destinations has been fetched successfully",
            data: data,
        });
    });
    const handleFetchFeatured = (0, express_async_handler_1.default)(async (req, res, next) => {
        const count = req.query.count;
        const data = await (0, fetchFeatured_1.default)(parseInt(count), destinationRepo);
        res.status(httpStatus_1.HttpStatus.OK).json({ status: "success", message: "Featured destinations has been fetched successfully", data: data });
    });
    return {
        handleAddDestination,
        handleFetchAllDestinations,
        handleFetchFeatured,
    };
}
exports.default = destinationController;
