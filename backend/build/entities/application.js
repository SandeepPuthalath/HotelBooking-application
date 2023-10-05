"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function application(applicantId, name, GSTNumber) {
    return {
        getApplicantId: () => applicantId,
        getName: () => name,
        getGSTNumber: () => GSTNumber
    };
}
exports.default = application;
