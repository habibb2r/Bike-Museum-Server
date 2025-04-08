import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const getAllUsers =catchAsync(async (req: Request, res: Response) => {
    const result = await UserServices.getAllUserFromDB();
    sendResponse(res, {
      success: true,
      message: 'All Users Retrieved successfully',
      data: result,
      statusCode: StatusCodes.OK,
    });
  });

  const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const userEmail = req.params.email;
    const result = await UserServices.getSingleUserFromDB(userEmail);
    sendResponse(res, {
      success: true,
      message: 'User Retrieved successfully',
      data: result,
      statusCode: StatusCodes.OK,
    });
  });

  export const UserController = {
    getAllUsers,
    getSingleUser,
  }