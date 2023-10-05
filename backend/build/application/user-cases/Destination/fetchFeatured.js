"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function fetchFeatured(count, respository) {
    const data = await respository.getFeaturedDestinations(count);
    return data;
}
exports.default = fetchFeatured;
