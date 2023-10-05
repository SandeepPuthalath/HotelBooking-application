"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function banner(title, desc, cloudinaryImgUrl) {
    return {
        getTitle: () => title,
        getDesc: () => desc,
        getCloudinaryImgUrl: () => cloudinaryImgUrl,
    };
}
exports.default = banner;
