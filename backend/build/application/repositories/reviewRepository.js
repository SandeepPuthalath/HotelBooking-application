"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function reviewRepository(repository) {
    const getHotelReview = async (id) => await repository.getHotelReview(id);
    const getReview = async (id) => await repository.getReview(id);
    const createReview = async (reviewEntity) => await repository.createReview(reviewEntity);
    const addReview = async (star, message, postedBy, id) => await repository.addReview(star, message, postedBy, id);
    const updateReview = async (star, message, alreadyReviewed) => repository.updateReview(star, message, alreadyReviewed);
    return {
        createReview,
        addReview,
        getHotelReview,
        updateReview,
        getReview,
    };
}
exports.default = reviewRepository;
