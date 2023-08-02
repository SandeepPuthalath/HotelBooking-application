
import twilio from 'twilio'

class Twilio {
    client:any;
    serviceSid:string;
    constructor(accountSid: string, authToken : string, serviceSid: string){
        this.client = twilio(accountSid, authToken)
        this.serviceSid = serviceSid
    }

    sendVerificationCode(toNumber: string){
        return this.client.verify.v2.services(this.serviceSid)
        .verifications
        .create({to:`+91${toNumber}`, channel: 'sms'})
    }

    verifyCode(toNumber: string, verificationCode: string){
        return this.client.verify.v2.services(this.serviceSid)
        .verificationChecks
        .create({ to:`+91${toNumber}`, code: verificationCode });
    }
}

export default Twilio
