import type { Request, Response } from 'express';
import { OrderServices } from './order.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.createOrder(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Order created successfully',
    success: true,
    data: result,
  });
});


const getOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getOrders();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully fetched orders",
    data: result,
  });
});

const getUserOrdersByUserId = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.body;

  const result = await OrderServices.getOrdersByUserId(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully fetched user's orders",
    success: true,
    data: result,
  });
});


const getSingleOrder = catchAsync(async (req, res) => {
  const id = req.params.productId;
  const result = await OrderServices.getSingleOrder(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully fetched single Order",
    data: result,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const id = req.query.ProductId as string;
  const result = await OrderServices.deleteOrder(id);
  res.status(200).json({ success: true, data: result });
});


const getRevenue = catchAsync(async (req: Request, res: Response) => {
  const totalRevenue = await OrderServices.getRevenueFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Revenue calculated successfully',
    success: true,
    data: {
      totalRevenue: totalRevenue,
    },
  });
});

export const OrderController = {
  createOrder,
  getOrders,
  deleteOrder,
  getSingleOrder,
  getRevenue,
  getUserOrdersByUserId,

};