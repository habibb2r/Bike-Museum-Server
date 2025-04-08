import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const getData = req.body;
    const userData ={
      ...getData,
      isBlocked:false,
      isActive:true,
      role:'customer',
      photoURL:"https://res.cloudinary.com/dairs3nkn/image/upload/v1744097456/habibb2r/zuoz1s1iqhzf8t0ioylo.jpg"
  
    }
    
    const result = await AuthServices.createUserIntoDB(userData);
    sendResponse(res, {
      success: true,
      message: 'User created successfully',
      data: {
        name: result.name,
        email: result.email,
      },
      statusCode: StatusCodes.ACCEPTED,
    });
  });

  export const AuthController = {
    createUser,
  };
  