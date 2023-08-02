import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { AuthServiceInterface } from "../../services/authServiceInterface";



export const adminLogin = async (email: string, password: string, services:ReturnType<AuthServiceInterface>, config: any ) =>{

    if(email !== config.ADMIN_EMAIL){
        throw new AppError("Credentials are wrong", HttpStatus.UNAUTHORIZED);
    }

    if(password !== config.ADMIN_PASSWORD){
        throw new AppError(
            "Sorry, your password was incorrect. Please double-check your password",
            HttpStatus.UNAUTHORIZED
          );
    }

    const admin = {
        email,
        admin: true
    }

    const token = services.generateToken(JSON.stringify(admin))

    return token


}