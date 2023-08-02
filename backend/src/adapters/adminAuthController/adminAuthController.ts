import { NextFunction, Request, Response } from "express"
import { AuthService} from "../../frameworks/services/authService"
import configKeys from "../../config"
import { adminLogin } from "../../application/user-cases/auth/adminAuth"
import { AuthServiceInterface } from "../../application/services/authServiceInterface"
import { HttpStatus } from "../../types/httpStatus"

export default function adminAuthController(
    authServiceInterface: AuthServiceInterface,
    authServiceImpl: AuthService,
){
    
    const services = authServiceInterface(authServiceImpl());

    const handleAdminLogin = async (req: Request, res: Response, next: NextFunction) => {
        const {email, password} = req.body

        const token = await adminLogin(
            email,
            password,
            services,
            configKeys
        )

        res.status(HttpStatus.OK).json({status: 'success', message: 'Admin has been logged in succesfull', data:{access : token, refresh: ""}})
    }





    return {
        handleAdminLogin
    }

}