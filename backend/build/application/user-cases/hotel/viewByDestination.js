"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function viewByDestination(destination, repository) {
    const data = await repository.findByDestination(destination);
    return data;
}
exports.default = viewByDestination;
