import { Request, Response } from "express";
import { Order } from "../Order/order.model";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

export const successPayment = async (req: Request, res: Response) => {
    await Order.findOneAndUpdate(
      { transactionId: req.params.tran_id },
      { status: 'paid' },
      { new: true },
    );
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Successfully created Product',
      data: this,
    });
  };