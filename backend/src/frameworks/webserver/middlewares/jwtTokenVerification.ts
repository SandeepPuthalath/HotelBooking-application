import { NextFunction, Request, Response } from "express";
import AppError from "../../../utils/appError";
import { HttpStatus } from '../../../types/httpStatus';

import { authService } from '../../services/authService';
import { authServiceInterface } from '../../../application/services/authServiceInterface';

const authServiceMiddleware = authServiceInterface(authService());


export default function jwtTokenVerification (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let token: string | null = '';
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token){
      throw new AppError('Token not found', HttpStatus.UNAUTHORIZED);
    }
    try {
      const { payload }: any = authServiceMiddleware.verifyToken(token);
  
      next();
    } catch (err) {
      throw new AppError('UnAuthorized User', HttpStatus.UNAUTHORIZED);
    }
  };
  