"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function fetchAllDestinations(destinationResp) {
    const data = await destinationResp.getAllDestinations();
    return data;
}
exports.default = fetchAllDestinations;
