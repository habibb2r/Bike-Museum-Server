import type mongoose from 'mongoose';
import type { Model } from 'mongoose';

export type TOrder = {
  user?: mongoose.Types.ObjectId | string;
  product: mongoose.Types.ObjectId | string;
  transactionId: number
  email: string;
  totalPrice: number;
  address: string;
  phone: number;
  estimatedDeliveryDate?: Date;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
};

export type OrderModel = Model<TOrder>;