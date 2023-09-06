"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = __importDefault(require("twilio"));
class Twilio {
    client;
    serviceSid;
    constructor(accountSid, authToken, serviceSid) {
        this.client = (0, twilio_1.default)(accountSid, authToken);
        this.serviceSid = serviceSid;
    }
    sendVerificationCode(toNumber) {
        return this.client.verify.v2.services(this.serviceSid)
            .verifications
            .create({ to: `+91${toNumber}`, channel: 'sms' });
    }
    verifyCode(toNumber, verificationCode) {
        return this.client.verify.v2.services(this.serviceSid)
            .verificationChecks
            .create({ to: `+91${toNumber}`, code: verificationCode });
    }
}
exports.default = Twilio;
