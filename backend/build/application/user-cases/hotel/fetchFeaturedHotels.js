"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function fetchFeaturedHotels(repository) {
    const featured = await repository.featuredHotels();
    return featured;
}
exports.default = fetchFeaturedHotels;
