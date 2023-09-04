import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import configKeys from "../../config";
import Twilio from "../../utils/twilio";
import jwtDecode from "jwt-decode";

const twilio = new Twilio(
  configKeys.TWILIO_ACCOUNT_SID,
  configKeys.TWILIO_AUTH_TOKEN,
  configKeys.TWILIO_SERVICE_SID
);

export const authService = () => {
  const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    return password;
  };

  const comparePassword = (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
  };

  const generateToken = (payload: string) => {
    const token = jwt.sign({ payload }, configKeys.JWT_SECRET, {
      expiresIn: "5d",
    });
    return token;
  };

  const verifyToken = (token: string) => {

    return jwt.verify(token, configKeys.JWT_SECRET);
  };

  const generateOTP = async (phoneNumber: string) => {
    const otpStatus = await twilio
      .sendVerificationCode(phoneNumber)
      .then((verfication: any) => verfication?.status)
      .catch((error: Error) => console.log(error));

    return otpStatus;
  };

  const verifyOTP = async (phoneNumber: string, otp: string) => {
    const verfication = await twilio
      .verifyCode(phoneNumber, otp)
      .then((verificationCheck: any) => verificationCheck?.status)
      .catch((error: Error) => console.log(error))
    
    return verfication
  };


  const verifyAdmin = (token: string) =>{
    const decode: any = jwtDecode(token)
    const result = JSON.parse(decode?.payload)
    if(!result?.admin){
      return false
    }
    return jwt.verify(token, configKeys.JWT_SECRET);
  }

  return {
    encryptPassword,
    comparePassword,
    generateToken,
    verifyToken,
    generateOTP,
    verifyOTP,
    verifyAdmin,
  };
};

export type AuthService = typeof authService;

export type AuthServiceReturn = ReturnType<AuthService>;
