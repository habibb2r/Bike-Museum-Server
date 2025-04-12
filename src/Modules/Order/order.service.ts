/* eslint-disable @typescript-eslint/no-unused-vars */
import type { TOrder } from './order.interface';
import { Order } from './order.model';
import AppError from '../../ErrorHandlers/AppError';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import { Product } from '../Products/products.model';

const createOrder = async (payload: TOrder) => {
  const OrderedProduct = await Product.findById(payload.product);

  if (!OrderedProduct) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found');
  }

  if (OrderedProduct.quantity < 1) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Product is out of stock');
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const today = new Date();
    const estimatedDeliveryDate = new Date(today.setDate(today.getDate() + 3));

    payload.totalPrice = OrderedProduct.price;
    payload.estimatedDeliveryDate = estimatedDeliveryDate;

    const result = await Order.create([payload], { session });

    const newQty = OrderedProduct.quantity - 1;

    await Product.findByIdAndUpdate(
      OrderedProduct._id,
      {
        quantity: newQty,
        inStock: newQty > 0,
      },
      { new: true, session },
    );

    await session.commitTransaction();
    session.endSession();

    return result[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getOrders = async () => {
  const result = await Order.find().populate('product').populate('user')
  return result;
};

const getSingleOrder = async (ProductId: string) => {
  const result = await Product.findById(ProductId);
  return result;
};

const deleteOrder = async (orderId: string) => {
  const deleteSingleProduct = await Product.findOneAndUpdate(
    { id: orderId },
    { isDeleted: true },
    { new: true },
  );
  return deleteSingleProduct;
};

const getRevenueFromDB = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: { $toDouble: '$totalPrice' } },
      },
    },
  ]);
  const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;
  return totalRevenue;
};

export const OrderServices = {
  createOrder,
  getOrders,
  getSingleOrder,
  deleteOrder,
  getRevenueFromDB,
};
