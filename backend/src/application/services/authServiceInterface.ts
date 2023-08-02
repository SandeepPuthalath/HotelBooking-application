import { AuthServiceReturn } from '../../frameworks/services/authService';

export const authServiceInterface = (service: AuthServiceReturn) => {
  const encryptPassword = (password: string) =>
    service.encryptPassword(password);

  const comparePassword = (password: string, hashedPassword: string) =>
    service.comparePassword(password, hashedPassword);

  const verifyPassword = (token: string) => service.verifyToken(token);

  const generateToken = (payload: string) => service.generateToken(payload);

  const verifyToken = (payload: string) => service.verifyToken(payload);

  const generateOTP = (phoneNumber : string) => service.generateOTP(phoneNumber);

  const verifyOTP = (phoneNumber: string, otp: string) => service.verifyOTP(phoneNumber, otp)

  const verifyAdmin = (token: string) => service.verifyAdmin(token)


  return {
    encryptPassword,
    comparePassword,
    verifyPassword,
    generateToken,
    verifyToken,
    generateOTP,
    verifyOTP,
    verifyAdmin
  };
};

export type AuthServiceInterface = typeof authServiceInterface;
