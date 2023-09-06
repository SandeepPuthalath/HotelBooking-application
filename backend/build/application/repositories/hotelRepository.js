"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hotelRepository(repository) {
    const create = async (hotelEntity) => await repository.create(hotelEntity);
    const update = async (id, updates) => await repository.update(id, updates);
    const remove = async (id) => await repository.remove(id);
    const view = async (id) => await repository.view(id);
    const viewAll = async () => await repository.viewAll();
    const userHotel = async (userId) => await repository.userHotel(userId);
    const findByDestination = async (destination) => await repository.findByDestination(destination);
    const rateHotel = async (star, hotelId, userId) => await repository.rateHotel(star, hotelId, userId);
    const updateRating = async (star, alreadyRated) => await repository.updateRating(star, alreadyRated);
    const updateTotalRating = async (totalRating, hotelId) => await repository.updateTotalRating(totalRating, hotelId);
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
    };
}
exports.default = hotelRepository;
