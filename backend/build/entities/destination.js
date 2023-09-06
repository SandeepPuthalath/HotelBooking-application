"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function destination(name, photo) {
    return {
        getName: () => name,
        getPhoto: () => photo,
    };
}
exports.default = destination;
