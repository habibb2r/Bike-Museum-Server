import type { Request, Response } from "express"
import { OrderServices } from "./order.service"
import OrderValidation from "./order.validation"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { StatusCodes } from "http-status-codes"

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const order = req.body
  const orderValidator = OrderValidation.parse(order)
  const result = await OrderServices.createOrderIntoDB(orderValidator)

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Order created successfully",
    success: true,
    data: result,
  })
})

const getRevenue = catchAsync(async (req: Request, res: Response) => {
  const totalRevenue = await OrderServices.getRevenueFromDB()

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Revenue calculated successfully",
    success: true,
    data: {
      totalRevenue: totalRevenue,
    },
  })
})

export const OrderController = {
  createOrder,
  getRevenue,
}
