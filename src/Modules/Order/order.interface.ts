import mongoose, { Model } from 'mongoose';

export type TOrder = {
  email: string;
  product: mongoose.Types.ObjectId | string;
  quantity: number;
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type OrderModel = Model<TOrder>;
