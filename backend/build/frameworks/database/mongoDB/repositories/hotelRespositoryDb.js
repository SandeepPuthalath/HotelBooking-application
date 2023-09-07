"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hotelModel_1 = __importDefault(require("../models/hotelModel"));
function hotelRepositoryDb() {
    const create = async (hotelEntity) => {
        const newHotel = new hotelModel_1.default({
            name: hotelEntity.name(),
            address: hotelEntity.address(),
            destination: hotelEntity.destination(),
            distance: hotelEntity.distance(),
            desc: hotelEntity.desc(),
            cheapestPrice: hotelEntity.cheapestPrice(),
            userId: hotelEntity.userId(),
            photos: hotelEntity.photos(),
        });
        newHotel.save();
        return newHotel;
    };
    const update = async (id, updates) => {
        const updatedHotel = await hotelModel_1.default.findByIdAndUpdate(id, updates, {
            new: true,
        });
        return updatedHotel;
    };
    const remove = async (id) => await hotelModel_1.default.deleteOne({ _id: id });
    const view = async (id) => await hotelModel_1.default.findById(id);
    const viewAll = async () => await hotelModel_1.default.find();
    const userHotel = async (userId) => await hotelModel_1.default.findOne({ userId });
    const findByDestination = async (destination) => await hotelModel_1.default.find({ destination });
    const rateHotel = async (star, hotelId, userId) => await hotelModel_1.default.findByIdAndUpdate(hotelId, {
        $push: {
            ratings: {
                star: star,
                postedby: userId,
            },
        },
    }, { new: true });
    const updateRating = async (star, alreadyRated) => hotelModel_1.default.updateOne({
        ratings: { $elemMatch: alreadyRated },
    }, { $set: { "ratings.$.star": star } }, { new: true });
    const updateTotalRating = async (totalRating, hotelId) => await hotelModel_1.default.findByIdAndUpdate(hotelId, { $set: { totalRating: totalRating } }, { new: true });
    const countHotels = async () => await hotelModel_1.default.countDocuments();
    return {
        create,
        update,
        remove,
        view,
        viewAll,
        userHotel,
        findByDestination,
        rateHotel,
        updateRating,
        updateTotalRating,
        countHotels,
    };
}
exports.default = hotelRepositoryDb;
